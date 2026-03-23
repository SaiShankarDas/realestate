"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function EmiCalculator({ defaultPrice = 28400000 }) {
  const [price, setPrice] = useState(defaultPrice)
  const [downPayment, setDownPayment] = useState(defaultPrice * 0.2)
  const [interest, setInterest] = useState(8.5)
  const [tenure, setTenure] = useState(20)

  const loanAmount = price - downPayment;
  const monthlyRate = (interest / 100) / 12;
  const numPayments = tenure * 12;

  // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = loanAmount > 0 && monthlyRate > 0
    ? Math.round(loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments) / (Math.pow(1 + monthlyRate, numPayments) - 1))
    : 0;

  const formatCurrency = (val: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);

  return (
    <Card className="border-border bg-background shadow-sm">
      <CardContent className="p-6">
        <h3 className="font-bold text-lg mb-6 text-foreground">EMI Calculator</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Property Price (₹)</label>
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="font-medium" />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Down Payment (₹)</label>
              <Input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="font-medium" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Interest (%)</label>
                <Input type="number" step="0.1" value={interest} onChange={(e) => setInterest(Number(e.target.value))} className="font-medium" />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Tenure (Yrs)</label>
                <Input type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="font-medium" />
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-primary-100">
            <p className="text-sm text-primary-900 font-medium mb-2">Estimated Monthly EMI</p>
            <p className="text-3xl font-bold text-primary-900 mb-4">{formatCurrency(emi)}</p>
            <Button className="w-full bg-primary-900 text-white hover:bg-primary-800 font-semibold shadow-sm">Apply for Home Loan</Button>
            <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-wider">*Calculation is for illustrative purposes only.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
