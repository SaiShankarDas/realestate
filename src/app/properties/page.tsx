"use client"

import React, { useState, useEffect, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm"
import { Search, MapPin, Grid, List as ListIcon, Phone, SlidersHorizontal, ArrowRight, Heart, Bath, Move } from "lucide-react"
import { MOCK_PROPERTIES, Property, MOCK_LOCATIONS } from "@/lib/data"
import { cn } from "@/lib/utils"

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

function PropertiesContent() {
  const searchParams = useSearchParams()
  const initialLocation = searchParams.get("location") || ""
  const initialBudget = searchParams.get("budget") || ""
  const initialBhk = searchParams.get("bhk") || ""
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES)
  
  // Filter States
  const [locFilter, setLocFilter] = useState(initialLocation)
  const [budgetFilter, setBudgetFilter] = useState(initialBudget)
  const [bhkFilter, setBhkFilter] = useState(initialBhk)

  useEffect(() => {
    let filtered = [...MOCK_PROPERTIES]
    if (locFilter) {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(locFilter.toLowerCase()))
    }
    if (budgetFilter) {
      // Very basic budget filtering logic for mock matching
      if (budgetFilter === "1cr-2cr") filtered = filtered.filter(p => p.price.value >= 10000000 && p.price.value <= 20000000)
      if (budgetFilter === "2cr-5cr") filtered = filtered.filter(p => p.price.value > 20000000 && p.price.value <= 50000000)
      if (budgetFilter === "5cr+") filtered = filtered.filter(p => p.price.value > 50000000)
    }
    if (bhkFilter && bhkFilter !== "") {
      const bhkVal = parseInt(bhkFilter)
      if (!isNaN(bhkVal)) {
        filtered = filtered.filter(p => p.bhk.includes(bhkVal))
      }
    }
    setProperties(filtered)
  }, [locFilter, budgetFilter, bhkFilter])

  return (
    <div className="bg-muted/30 min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap">
          <Link href="/" className="hover:text-primary-900 transition-colors">Home</Link>
          <ArrowRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground font-medium">Properties in Mumbai</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 space-y-6">
            <Card className="border-border shadow-sm sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                  <SlidersHorizontal className="h-5 w-5 text-primary-900" />
                  <h2 className="font-bold text-xl text-foreground">Refine Search</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Budget Range</label>
                    <Select className="h-11 border-border/60" value={budgetFilter} onChange={(e) => setBudgetFilter(e.target.value)}>
                      <option value="">Any Budget</option>
                      <option value="1cr-2cr">₹1 Cr - ₹2 Cr</option>
                      <option value="2cr-5cr">₹2 Cr - ₹5 Cr</option>
                      <option value="5cr+">₹5 Cr +</option>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Bedrooms (BHK)</label>
                    <div className="flex flex-wrap gap-2">
                      {["1", "2", "3", "4+"].map((bhkVal) => (
                        <button 
                          key={bhkVal} 
                          onClick={() => setBhkFilter(bhkFilter === bhkVal ? "" : bhkVal)}
                          className={cn(
                            "px-4 py-2 text-sm font-bold rounded-lg border transition-all duration-200", 
                            bhkFilter === bhkVal 
                              ? 'bg-primary-900 text-white border-primary-900 shadow-md transform scale-105' 
                              : 'bg-background border-border text-foreground hover:bg-muted hover:border-primary-300'
                          )}
                        >
                          {bhkVal} BHK
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-[18px] w-[18px] text-muted-foreground" />
                      <select 
                        className="w-full h-11 pl-10 pr-4 rounded-md bg-transparent border border-border/60 text-sm focus:ring-2 focus:ring-primary-900 outline-none transition-all appearance-none cursor-pointer"
                        value={locFilter}
                        onChange={(e) => setLocFilter(e.target.value)}
                      >
                        <option value="">Any Location</option>
                        {MOCK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="sticky top-[550px]">
              <LeadCaptureForm propertyName="General Listing Enquiry" />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Main Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-5 rounded-2xl border border-border/40 shadow-sm">
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">Properties for Sale in Mumbai</h1>
                <p className="text-muted-foreground mt-1 font-medium bg-primary-50 text-primary-900 inline-block px-3 py-1 rounded-md text-sm">{properties.length} results found</p>
              </div>
              
              <div className="flex items-center gap-3 self-end md:self-auto w-full md:w-auto">
                <Select className="flex-1 md:w-[200px] h-11 border-border/60 bg-muted/20 font-medium">
                  <option>Sort by: Latest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </Select>
                <div className="flex bg-muted rounded-lg p-1 border border-border/30">
                  <button 
                    onClick={() => setViewMode("grid")}
                    className={cn("p-2 rounded-md transition-all", viewMode === "grid" ? "bg-white text-primary-900 shadow-sm" : "text-muted-foreground hover:text-foreground")}
                  >
                    <Grid className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => setViewMode("list")}
                    className={cn("p-2 rounded-md transition-all", viewMode === "list" ? "bg-white text-primary-900 shadow-sm" : "text-muted-foreground hover:text-foreground")}
                  >
                    <ListIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Properties List */}
            {properties.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl border border-dashed border-border p-16 text-center shadow-sm"
              >
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-bold text-foreground mb-2">No properties matched your criteria</h3>
                <p className="text-muted-foreground font-medium">Try adjusting your filters, or broadening your search location.</p>
                <Button onClick={() => {setLocFilter(""); setBudgetFilter(""); setBhkFilter("");}} className="mt-6 bg-primary-900 hover:bg-primary-800 h-12 px-8 font-bold">Clear All Filters</Button>
              </motion.div>
            ) : (
              <motion.div 
                layout 
                className={cn(
                  "grid gap-6",
                  viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-2" : "grid-cols-1"
                )}
              >
                <AnimatePresence>
                  {properties.map((property) => (
                    <motion.div 
                      key={property.id}
                      layout
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, scale: 0.9 }}
                      variants={itemVariants}
                    >
                      <Card className={cn(
                        "group overflow-hidden border-border/60 transition-all duration-300 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 bg-background",
                        viewMode === "list" ? "flex flex-col sm:flex-row h-auto sm:h-64" : "flex flex-col h-full"
                      )}>
                        <div className={cn(
                          "relative overflow-hidden border-border/50 flex-shrink-0",
                          viewMode === "list" ? "w-full sm:w-[280px] h-48 sm:h-full border-b sm:border-b-0 sm:border-r" : "h-64 border-b"
                        )}>
                          <Image 
                            src={property.images[0]} 
                            alt={property.name} 
                            fill 
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out" 
                          />
                          <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                            {property.status === "New Launch" && <Badge className="bg-primary-900 text-white border-0 shadow-lg backdrop-blur bg-opacity-90 px-3 py-1 font-bold tracking-wide">NEW LAUNCH</Badge>}
                            {property.status === "Ready to Move" && <Badge className="bg-emerald-600 text-white border-0 shadow-lg backdrop-blur bg-opacity-90 px-3 py-1 font-bold tracking-wide">READY TO MOVE</Badge>}
                            {property.status === "Under Construction" && <Badge className="bg-amber-500 text-white border-0 shadow-lg backdrop-blur bg-opacity-90 px-3 py-1 font-bold tracking-wide">CONSTRUCTION</Badge>}
                          </div>
                          <button onClick={() => alert("Added to favorites")} className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full text-muted-foreground hover:text-red-500 hover:bg-white shadow-lg transition-all z-10 active:scale-90">
                            <Heart className="h-5 w-5" />
                          </button>
                        </div>
                        
                        <CardContent className={cn("p-6 flex flex-col flex-1", viewMode === "list" ? "justify-between py-5" : "")}>
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                {property.developer && <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{property.developer}</span>}
                              </div>
                              <h3 className="text-xl font-extrabold text-foreground group-hover:text-primary-700 transition-colors line-clamp-1">
                                <Link href={`/property/${property.id}`} className="hover:underline">{property.name}</Link>
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center mt-1.5 font-medium">
                                <MapPin className="h-3.5 w-3.5 mr-1" /> {property.location}
                              </p>
                            </div>
                            <div className="text-right pl-3 flex-shrink-0">
                              <p className="text-2xl font-black text-primary-900 tracking-tight">{property.price.display}</p>
                              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{property.price.isStarting ? 'onwards' : 'fixed price'}</p>
                            </div>
                          </div>
                          
                          <div className={cn("grid grid-cols-3 gap-2 border-y border-border/40 text-center bg-muted/20 rounded-xl my-4", viewMode === "list" ? "py-3" : "py-4")}>
                            <div className="p-1">
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">BHK</p>
                              <p className="font-extrabold text-sm text-foreground">{property.bhk.join(' & ')}</p>
                            </div>
                            <div className="border-l border-border/50 p-1">
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Area</p>
                              <p className="font-extrabold text-sm text-foreground flex items-center justify-center gap-1"><Move className="h-3.5 w-3.5 text-muted-foreground" /> {property.areaText}</p>
                            </div>
                            <div className="border-l border-border/50 p-1">
                              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1 font-bold">Status</p>
                              <p className="font-extrabold text-sm text-foreground">{property.possessionDate || property.status.split(' ')[0]}</p>
                            </div>
                          </div>
                          
                          <div className={cn("flex gap-3", viewMode === "list" ? "mt-0" : "mt-auto")}>
                            <Link href={`/property/${property.id}`} className="flex-1 inline-flex items-center justify-center h-12 px-4 rounded-xl text-sm transition-all bg-primary-900 text-white hover:bg-primary-800 font-bold shadow-[0_10px_20px_-10px_rgba(30,58,138,0.5)] hover:-translate-y-0.5 focus-visible:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-900">
                              Schedule Visit
                            </Link>
                            <Button onClick={() => window.location.href="tel:+919876543210"} variant="outline" className="flex-1 border-2 border-primary-200 text-primary-900 hover:bg-primary-50 font-bold h-12 rounded-xl transition-all">
                              Call Agent
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination / Load More */}
            {properties.length > 0 && (
              <div className="text-center mt-12 mb-8">
                <Button variant="outline" className="h-12 px-10 text-primary-900 border-2 border-primary-200 hover:bg-primary-50 hover:border-primary-300 font-bold rounded-xl transition-all hover:scale-105 shadow-sm">
                  Load More Properties
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-900"></div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  )
}
