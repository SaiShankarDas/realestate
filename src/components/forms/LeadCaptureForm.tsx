"use client"

import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export function LeadCaptureForm({ propertyName = "General Enquiry", compact = false }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    budget: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Send data to webhook (n8n-ready placeholder)
      await fetch("https://n8n-webhook-placeholder.com/lead", {
        method: "POST",
        mode: "no-cors", // Allow sending to dummy endpoint without CORS error
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, propertyName, source: "Website Lead Form" }),
      })

      // Simulate Trigger WhatsApp alert locally (in production this would be handled by n8n or direct API)
      const whatsappMessage = `Hi, I'm interested in a property: ${propertyName}. Name: ${formData.name}, Budget: ${formData.budget}`
      console.log("WhatsApp Webhook Triggered with message: ", whatsappMessage)
      
      setSuccess(true)
      setFormData({ name: "", phone: "", budget: "" })
      
      // Reset success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting lead:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="bg-primary-900 text-white border-primary-800 shadow-xl overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-700/50 rounded-full blur-2xl -mr-10 -mt-10" />
      <CardContent className={`relative z-10 ${compact ? "p-5" : "p-6"}`}>
        <h3 className="font-bold text-lg mb-1">Instant Callback</h3>
        <p className="text-primary-100/80 text-xs mb-5">Our Mumbai experts respond in <strong className="text-white">5 mins</strong></p>
        
        {success ? (
          <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-center">
            <p className="text-green-100 font-medium text-sm">Request received successfully!</p>
            <p className="text-green-200/80 text-xs mt-1">Our agent will call you shortly.</p>
          </div>
        ) : (
          <form className="space-y-3" onSubmit={handleSubmit}>
            <Input 
              required
              placeholder="Full Name" 
              className="bg-primary-800/80 border-primary-700 text-white placeholder:text-white/60 h-11 shadow-inner" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <Input 
              required
              type="tel"
              placeholder="Phone Number (+91)" 
              className="bg-primary-800/80 border-primary-700 text-white placeholder:text-white/60 h-11 shadow-inner" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
            <Select 
              required
              className="bg-primary-800/80 border-primary-700 text-white h-11 shadow-inner"
              value={formData.budget}
              onChange={(e) => setFormData({...formData, budget: e.target.value})}
            >
              <option value="" disabled className="text-muted-foreground">Select Budget Range</option>
              <option value="1cr-2cr" className="text-foreground">Budget: ₹1 Cr - ₹2 Cr</option>
              <option value="2cr-4cr" className="text-foreground">Budget: ₹2.4 Cr - ₹4.1 Cr</option>
              <option value="4cr+" className="text-foreground">Budget: Above ₹4 Cr</option>
            </Select>
            <Button 
              type="submit" 
              disabled={loading}
              className="w-full bg-accent text-white hover:bg-accent/90 font-semibold mt-4 h-11 shadow-lg shadow-accent/20"
            >
              {loading ? "Submitting..." : "Request Details"}
            </Button>
            <p className="text-[9px] text-center text-primary-200/50 mt-2">By submitting you agree to complete RERA verification check.</p>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
