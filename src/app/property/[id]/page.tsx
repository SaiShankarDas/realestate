"use client"

import React, { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LeadCaptureForm } from "@/components/forms/LeadCaptureForm"
import { EmiCalculator } from "@/components/calculator/EmiCalculator"
import { 
  MapPin, SlidersHorizontal, ArrowRight, Grid3X3, 
  Calendar, Phone, Ruler, Home,
  Compass, Dumbbell, Car, ArrowUpCircle, Waves, 
  ShieldAlert, Zap, Coffee, Tent, Building2, CheckCircle2
} from "lucide-react"
import { MOCK_PROPERTIES, MOCK_LOCATIONS } from "@/lib/data"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const propertyId = resolvedParams.id
  
  const property = MOCK_PROPERTIES.find(p => p.id === propertyId) || MOCK_PROPERTIES[0]
  
  const [isToastVisible, setIsToastVisible] = useState(false)

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi, I'm interested in the ${property.name} property in ${property.location}.`);
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  }

  const handleCall = () => {
    window.location.href = "tel:+919876543210";
  }

  const scrollToLeadForm = () => {
    document.getElementById("lead-capture")?.scrollIntoView({ behavior: 'smooth' })
    setIsToastVisible(true)
    setTimeout(() => setIsToastVisible(false), 3000)
  }

  // Pre-calculate EMI (rough estimation at 8.5% for 20 years = ~867 per lakh)
  const estimatedEmi = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumSignificantDigits: 3 }).format((property.price.value / 100000) * 867)

  return (
    <div className="bg-muted/20 min-h-screen py-8">
      {/* Toast Notification */}
      <AnimatePresence>
        {isToastVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3"
          >
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <span className="font-medium text-sm">Please fill your details below to schedule a visit!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 max-w-[1400px]">
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-muted-foreground mb-6 flex items-center gap-2 flex-wrap"
        >
          <Link href="/" className="hover:text-primary-900 transition-colors">Home</Link>
          <ArrowRight className="h-3 w-3 flex-shrink-0" />
          <Link href="/properties" className="hover:text-primary-900 transition-colors">Properties in Mumbai</Link>
          <ArrowRight className="h-3 w-3 flex-shrink-0" />
          <span className="text-foreground font-bold">{property.name}</span>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Layout */}
          <aside className="w-full lg:w-[350px] flex-shrink-0 space-y-6">
            
            <Card className="border-border/60 shadow-lg sticky top-24 bg-background z-20 overflow-hidden">
              <div className="h-2 w-full bg-gradient-to-r from-primary-900 to-primary-600"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
                  <SlidersHorizontal className="h-5 w-5 text-primary-900" />
                  <h2 className="font-extrabold text-xl text-foreground tracking-tight">Refine Search</h2>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3 block">Primary Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <select 
                        className="w-full h-11 pl-10 pr-4 rounded-xl bg-transparent border border-border/60 text-sm focus:ring-2 focus:ring-primary-900 outline-none transition-all appearance-none cursor-pointer"
                        defaultValue={property.location}
                      >
                        <option value="">Any Location</option>
                        {MOCK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                      </select>
                    </div>
                  </div>
                  
                  <Link href="/properties" className="flex items-center justify-center w-full h-11 bg-muted/50 text-primary-900 hover:bg-primary-50 hover:border-primary-200 font-bold rounded-xl border border-transparent transition-all shadow-sm">
                    Apply Search Filters
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div id="lead-capture" className="sticky top-[450px]">
              <LeadCaptureForm propertyName={property.name} />
            </div>
            
          </aside>

          {/* Main Content Detail */}
          <main className="flex-1 space-y-8 min-w-0">
            
            {/* Header Area */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-background rounded-3xl p-6 md:p-8 border border-border/50 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.1)]"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {property.reraId && <Badge variant="warning" className="bg-orange-100 text-orange-800 border disabled shadow-sm px-3 py-1 font-bold tracking-wide">RERA: {property.reraId}</Badge>}
                    <Badge variant="outline" className="bg-primary-50 text-primary-900 border-primary-200 shadow-sm px-3 py-1 font-bold">{property.status}</Badge>
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight mb-2">{property.name}</h1>
                  <p className="text-base text-muted-foreground flex items-center font-medium">
                    <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-primary-900" /> {property.location}
                  </p>
                </div>
                
                <div className="flex flex-col md:items-end flex-shrink-0 bg-muted/20 p-4 rounded-2xl border border-border/30">
                  <div className="text-3xl lg:text-4xl font-black text-primary-900">{property.price.display}</div>
                  <div className="text-sm text-muted-foreground font-bold mt-1 uppercase tracking-widest pl-1">{property.price.isStarting ? 'Onwards' : 'Fixed Price'}</div>
                  <div className="text-xs bg-primary-900 text-white font-bold mt-3 px-3 py-1.5 rounded-lg">Estimated EMI: {estimatedEmi}/mo</div>
                </div>
              </div>

              {/* Image Gallery */}
              <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-3 mt-8">
                {/* Main large image */}
                <div className="md:col-span-2 row-span-2 relative h-[350px] md:h-[450px] rounded-2xl overflow-hidden group shadow-md cursor-pointer">
                  <Image 
                    src={property.images[0]} 
                    alt="Living Room" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 70vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    priority 
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-4 left-4 z-10">
                     <Badge className="bg-white/90 text-primary-900 backdrop-blur-md border-0 py-1.5 px-4 font-bold shadow-lg shadow-black/20 text-sm">Main View</Badge>
                  </div>
                </div>
                {/* Side images */}
                <div className="relative h-[170px] md:h-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                  <Image 
                    src={property.images[1]} 
                    alt="Exterior" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    quality={85}
                  />
                </div>
                <div className="relative h-[170px] md:h-[220px] rounded-2xl overflow-hidden group cursor-pointer shadow-sm">
                  <Image 
                    src={property.images[2]} 
                    alt="View" 
                    fill 
                    sizes="(max-width: 768px) 50vw, 30vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-primary-950/70 flex flex-col items-center justify-center transition-opacity hover:bg-primary-950/80 backdrop-blur-sm">
                    <Grid3X3 className="h-8 w-8 text-white mb-2" />
                    <span className="font-bold text-white tracking-widest text-sm drop-shadow-md">VIEW ALL 42 PHOTOS</span>
                  </div>
                </div>
              </div>

              {/* Primary Call to Action Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 bg-muted/10 p-2 rounded-2xl border border-border/40">
                <Button onClick={scrollToLeadForm} className="flex-1 h-14 text-base font-extrabold bg-primary-900 text-white hover:bg-primary-800 shadow-xl shadow-primary-900/20 hover:-translate-y-1 transition-all rounded-xl">
                  <Calendar className="mr-2 h-5 w-5" /> Schedule Visit
                </Button>
                <Button onClick={handleCall} variant="outline" className="flex-1 h-14 text-base font-extrabold border-2 border-primary-200 text-primary-900 hover:bg-primary-50 rounded-xl transition-all shadow-sm">
                  <Phone className="mr-2 h-5 w-5" /> Call Agent
                </Button>
                <Button onClick={handleWhatsApp} variant="outline" className="flex-1 h-14 text-base font-extrabold border-2 border-green-200 text-green-700 hover:bg-green-50 shadow-sm shadow-green-100 hover:shadow-green-200 rounded-xl transition-all">
                  <WhatsAppIcon className="mr-2 h-5 w-5 text-green-600" /> WhatsApp Enquiry
                </Button>
              </div>
            </motion.div>

            {/* Overview / Description */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-extrabold text-foreground mb-4 tracking-tight">Project Overview</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{property.description}</p>
            </motion.div>

            {/* Quick Specs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-5"
            >
              <Card className="bg-background border-border/60 hover:border-primary-200 transition-colors shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Carpet Area</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-xl text-primary-900"><Ruler className="h-6 w-6" /></div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-xl tracking-tight">{property.carpetAreaSqft.toLocaleString('en-IN')} Sq.Ft.</h4>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">₹{Math.floor(property.price.value / property.carpetAreaSqft).toLocaleString('en-IN')} per sq.ft.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/60 hover:border-primary-200 transition-colors shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Configuration</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-xl text-primary-900"><Home className="h-6 w-6" /></div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-xl tracking-tight">{property.bhk.join(' & ')} BHK, {property.baths} Bath</h4>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">{property.isFurnished ? 'Fully Furnished' : 'Unfurnished'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-background border-border/60 hover:border-primary-200 transition-colors shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold mb-3">Orientation</p>
                  <div className="flex items-center gap-4">
                    <div className="bg-primary-50 p-3 rounded-xl text-primary-900"><Compass className="h-6 w-6" /></div>
                    <div>
                      <h4 className="font-extrabold text-foreground text-xl tracking-tight">{property.orientation || 'Standard'}</h4>
                      <p className="text-xs text-muted-foreground font-medium mt-0.5">Vastu Compliant</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Amenities Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-background border-border/60 shadow-lg shadow-black/5 rounded-3xl overflow-hidden">
                <div className="h-1.5 w-full bg-gradient-to-r from-muted to-primary-900/40"></div>
                <CardContent className="p-8 md:p-10">
                  <h3 className="text-2xl font-extrabold text-foreground flex items-center gap-3 mb-8 tracking-tight">
                    <Building2 className="h-6 w-6 text-primary-900" /> Project Amenities
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
                    {/* Iterating safely through generic mock amenities logic */}
                    {property.amenities.map((amenity, i) => (
                      <div key={amenity} className="flex items-center gap-4 group">
                        <div className="bg-muted p-2.5 rounded-xl group-hover:bg-primary-100 transition-colors">
                          {i % 4 === 0 && <Dumbbell className="h-5 w-5 text-primary-700" />}
                          {i % 4 === 1 && <Car className="h-5 w-5 text-primary-700" />}
                          {i % 4 === 2 && <ShieldAlert className="h-5 w-5 text-primary-700" />}
                          {i % 4 === 3 && <Waves className="h-5 w-5 text-primary-700" />}
                        </div>
                        <span className="text-sm font-bold text-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* EMI Calculator Component */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mt-12"
            >
               <EmiCalculator defaultPrice={property.price.value} />
            </motion.div>

            {/* Builder block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-muted/10 border-border/60 shadow-md rounded-3xl">
                <CardContent className="p-8 md:p-10">
                  <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="w-32 h-32 bg-white border flex items-center justify-center rounded-3xl shadow-lg shadow-black/5 text-center p-3 flex-shrink-0">
                      <span className="font-extrabold text-primary-900 leading-tight text-lg">{property.developer.split(' ').join('\n')}</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">Developed by {property.developer}</h3>
                      <p className="text-base text-muted-foreground mb-6 leading-relaxed">India's largest real estate developer with over 40 years of legacy. Delivering high-quality residential landmarks across Mumbai, London, and Pune. Committed to supreme quality and timely delivery.</p>
                      <div className="flex flex-wrap gap-3 text-xs">
                        <Badge variant="outline" className="bg-white border-primary-200 text-primary-900 font-bold py-1.5 px-3">40+ Years Legacy</Badge>
                        <Badge variant="outline" className="bg-white border-primary-200 text-primary-900 font-bold py-1.5 px-3">500+ Projects</Badge>
                        <Badge variant="outline" className="bg-white border-primary-200 text-primary-900 font-bold py-1.5 px-3">20k+ Happy Families</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

          </main>
        </div>
      </div>
    </div>
  )
}
