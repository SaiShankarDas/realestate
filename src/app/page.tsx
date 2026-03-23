"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Building2, CheckCircle2, ShieldCheck, Handshake, Heart, Phone, ArrowRight, TrendingUp, Bath, Move } from "lucide-react"
import { MOCK_PROPERTIES, MOCK_LOCATIONS } from "@/lib/data"
import { cn } from "@/lib/utils"

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
}

export default function Home() {
  const router = useRouter()
  const [searchLocation, setSearchLocation] = useState("")
  const [searchBudget, setSearchBudget] = useState("")
  const [searchBhk, setSearchBhk] = useState("")
  const [searchType, setSearchType] = useState<"buy"|"rent">("buy")
  const [isToastVisible, setIsToastVisible] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (searchLocation) params.set("location", searchLocation)
    if (searchBudget) params.set("budget", searchBudget)
    if (searchBhk) params.set("bhk", searchBhk)
    params.set("type", searchType)
    router.push(`/properties?${params.toString()}`)
  }

  const handleRequirement = () => {
    setIsToastVisible(true)
    setTimeout(() => setIsToastVisible(false), 3000)
  }

  const featuredProperties = MOCK_PROPERTIES.filter(p => p.featured).slice(0, 3)

  return (
    <>
      {/* Toast Notification */}
      {isToastVisible && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-primary-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="h-5 w-5 text-green-400" />
          <span className="font-medium text-sm">Action completed successfully!</span>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center bg-primary-950 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="/images/mumbai_skyline_hero_1774281938568.png"
            alt="Mumbai Skyline"
            fill
            className="object-cover object-center opacity-85"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary-900/30 to-primary-950/60" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-4 text-center mt-[-20px]">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-2xl"
          >
            Find Your Perfect <br className="md:hidden" /> Home in Mumbai
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-4xl mx-auto bg-background/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20"
          >
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 items-center">
              <div className="flex bg-muted/80 backdrop-blur rounded-lg p-1 w-full md:w-auto h-12">
                <Button 
                  type="button"
                  variant={searchType === "buy" ? "default" : "ghost"} 
                  className={cn("w-1/2 md:w-24 rounded-md h-full transition-all", searchType === "buy" ? "shadow-md" : "text-muted-foreground")}
                  onClick={() => setSearchType("buy")}
                >
                  Buy
                </Button>
                <Button 
                  type="button"
                  variant={searchType === "rent" ? "default" : "ghost"} 
                  className={cn("w-1/2 md:w-24 rounded-md h-full transition-all", searchType === "rent" ? "shadow-md" : "text-muted-foreground")}
                  onClick={() => setSearchType("rent")}
                >
                  Rent
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 w-full">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground z-10" />
                  <select 
                    className="w-full h-12 pl-10 pr-4 rounded-md bg-white border border-border/80 text-sm focus:ring-2 focus:ring-primary-900 outline-none transition-all appearance-none cursor-pointer"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  >
                    <option value="">Any Location</option>
                    {MOCK_LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
                </div>
                <Select className="h-12 bg-white border-border/80 focus-visible:ring-primary-900" value={searchBudget} onChange={(e) => setSearchBudget(e.target.value)}>
                  <option value="">Any Budget</option>
                  <option value="1cr-2cr">₹1 Cr - ₹2 Cr</option>
                  <option value="2cr-5cr">₹2 Cr - ₹5 Cr</option>
                  <option value="5cr+">₹5 Cr +</option>
                </Select>
                <Select className="h-12 bg-white border-border/80 focus-visible:ring-primary-900" value={searchBhk} onChange={(e) => setSearchBhk(e.target.value)}>
                  <option value="">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4+">4+ BHK</option>
                </Select>
              </div>
              
              <Button type="submit" className="w-full md:w-auto h-12 px-8 bg-primary-900 text-white hover:bg-primary-800 shadow-lg hover:shadow-primary-900/30 transition-all">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>
            
            <div className="mt-4 pt-4 border-t border-border/50 flex justify-center text-sm">
              <button onClick={handleRequirement} className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-900 rounded-full font-semibold hover:bg-primary-100 transition-colors shadow-sm cursor-pointer">
                <Building2 className="h-4 w-4" /> Post Your Requirement
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-background py-10 relative z-20 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-border"
          >
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-4 py-4 md:py-0 group cursor-default">
              <div className="bg-orange-50 p-3.5 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-orange-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm tracking-wide">Verified Listings</h4>
                <p className="text-xs text-muted-foreground mt-0.5">100% Physical Audit</p>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-4 py-4 md:py-0 group cursor-default">
              <div className="bg-blue-50 p-3.5 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-blue-200">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm tracking-wide">RERA Approved</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Legal Peace of Mind</p>
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="flex items-center justify-center gap-4 py-4 md:py-0 group cursor-default">
              <div className="bg-purple-50 p-3.5 rounded-2xl text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-purple-200">
                <Handshake className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm tracking-wide">No Brokerage</h4>
                <p className="text-xs text-muted-foreground mt-0.5">Direct Owner Deals</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <Badge variant="secondary" className="mb-4 text-orange-600 bg-orange-100/80 hover:bg-orange-100 uppercase tracking-widest px-3 py-1">Curated Selections</Badge>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">Featured Projects in Mumbai</h2>
            </div>
            <Link href="/properties" className="hidden md:flex items-center text-sm font-bold text-primary-600 hover:text-primary-800 transition-colors group">
              View All Projects <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProperties.map((property) => (
              <motion.div variants={fadeIn} key={property.id}>
                <Card className="group overflow-hidden border-border/60 transition-all duration-300 hover:shadow-2xl hover:shadow-primary-900/5 hover:-translate-y-1 bg-background h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden border-b border-border/50">
                    <Image 
                      src={property.images[0]} 
                      alt={property.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                      {property.status === "New Launch" && <Badge className="bg-primary-900 text-white border-0 shadow-lg backdrop-blur-md bg-opacity-90">NEW LAUNCH</Badge>}
                      {property.status === "Ready to Move" && <Badge className="bg-emerald-600 text-white border-0 shadow-lg backdrop-blur-md bg-opacity-90">READY TO MOVE</Badge>}
                      {property.status === "Under Construction" && <Badge className="bg-amber-500 text-white border-0 shadow-lg backdrop-blur-md bg-opacity-90">UNDER CONSTRUCTION</Badge>}
                    </div>
                    <button onClick={handleRequirement} className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-muted-foreground hover:text-red-500 hover:bg-white shadow-lg transition-all z-10 hover:scale-110 active:scale-95">
                      <Heart className="h-4 w-4" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-foreground line-clamp-1 group-hover:text-primary-700 transition-colors">
                          <Link href={`/property/${property.id}`}>{property.name}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground flex items-center mt-1.5 font-medium">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> {property.location}
                        </p>
                      </div>
                      <div className="text-right pl-2">
                        <p className="text-xl font-extrabold text-primary-900">{property.price.display}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{property.price.isStarting ? 'onwards' : 'fixed price'}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/40 my-5 text-center bg-muted/30 rounded-lg">
                      <div className="p-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold">BHK</p>
                        <p className="font-bold text-sm text-foreground">{property.bhk.join(' & ')}</p>
                      </div>
                      <div className="border-l border-border/50 p-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold">Area</p>
                        <p className="font-bold text-sm text-foreground flex items-center justify-center gap-1"><Move className="h-3 w-3 text-muted-foreground" /> {property.areaText}</p>
                      </div>
                      <div className="border-l border-border/50 p-2">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1.5 font-bold">Status</p>
                        <p className="font-bold text-sm text-foreground">{property.possessionDate || property.status.split(' ')[0]}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 mt-auto pt-2">
                      <Link href={`/property/${property.id}`} className="flex-1 w-full inline-flex items-center justify-center bg-transparent border-2 border-primary-200 text-primary-900 hover:bg-primary-50 hover:border-primary-300 font-bold h-11 px-4 rounded-xl text-sm transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-900 focus-visible:ring-offset-2">
                        View Details
                      </Link>
                      <Button onClick={() => window.location.href = "tel:+919876543210"} className="w-12 h-11 px-0 bg-primary-900 text-white hover:bg-primary-800 flex-shrink-0 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                        <Phone className="h-[18px] w-[18px]" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center md:hidden">
            <Link href="/properties" className="inline-flex w-full items-center justify-center h-12 px-8 rounded-xl bg-primary-50 text-primary-900 font-bold border border-primary-200">
              View All Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Locality Insights section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center md:text-left max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-4 tracking-tight">Mumbai Locality Insights</h2>
            <p className="text-muted-foreground text-lg">Expert area guides with real-time price trends, upcoming infrastructure projects, and lifestyle ratings.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[550px]"
          >
            {/* Main Insight */}
            <motion.div variants={fadeIn} className="md:col-span-2 md:row-span-2 relative h-[380px] md:h-full rounded-[2rem] overflow-hidden group shadow-xl">
              <Image 
                src="/images/mumbai_skyline_hero_1774281938568.png" 
                alt="Bandra West" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-primary-950/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <h3 className="text-3xl font-extrabold text-white mb-3">Bandra West</h3>
                <p className="text-primary-100/90 text-sm mb-6 line-clamp-2 pr-10 leading-relaxed">The Queen of Suburbs. Premium connectivity via Sea Link and upcoming Metro Line 3. Extremely high demand from HNI clients.</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/10 font-bold py-1.5 px-3">Price: ₹155k / sq ft</Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/10 font-bold py-1.5 px-3">Top Schools: 15+</Badge>
                  <TrendingUp className="text-white h-6 w-6 ml-auto mr-2" />
                </div>
              </div>
            </motion.div>
            
            {/* Sub Insight 1 */}
            <motion.div variants={fadeIn} className="md:col-span-2 relative h-[250px] md:h-full rounded-[2rem] overflow-hidden group shadow-lg">
              <Image 
                src="/images/luxury_apartment_exterior_1774281957165.png" 
                alt="BKC" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out object-top" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-2xl font-bold text-white mb-2">BKC & G-Block</h3>
                <p className="text-primary-100/80 text-sm leading-relaxed pr-8">Financial hub. High rental yield potential for corporate HNI clients and diplomats.</p>
              </div>
            </motion.div>
            
            {/* Sub Insight 2 */}
            <motion.div variants={fadeIn} className="md:col-span-1 relative h-[250px] md:h-full rounded-[2rem] overflow-hidden group shadow-md">
              <Image 
                src="/images/luxury_apartment_living_room_1774281976681.png" 
                alt="Powai" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1.5">Powai</h3>
                <p className="text-primary-100/80 text-xs leading-relaxed">Tech startup corridor & serene lake views.</p>
              </div>
            </motion.div>

            {/* Sub Insight 3 */}
            <motion.div variants={fadeIn} className="md:col-span-1 relative h-[250px] md:h-full rounded-[2rem] overflow-hidden group shadow-md">
              <Image 
                src="/images/mumbai_skyline_hero_1774281938568.png" 
                alt="Navi Mumbai" 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out object-right" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-950/90 to-transparent opacity-80" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1.5">Navi Mumbai</h3>
                <p className="text-primary-100/80 text-xs leading-relaxed">Immense growth eyeing upcoming airport.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-primary-900 rounded-[2.5rem] p-8 md:p-16 text-center shadow-[0_30px_60px_-15px_rgba(30,58,138,0.5)] overflow-hidden relative max-w-5xl mx-auto border border-primary-800"
          >
            {/* Animated abstract blobs */}
            <div className="absolute top-[-50%] left-[-10%] w-[600px] h-[600px] bg-primary-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-[pulse_8s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_10s_ease-in-out_infinite_reverse]"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">Wait! Stay Ahead of the <br className="hidden md:block" />Mumbai Real Estate Market</h2>
              <p className="text-primary-100/90 mb-10 text-lg md:text-xl font-medium">Get exclusive weekly property alerts, price drop notifications, and insider reports on RERA compliant projects delivered directly to your inbox.</p>
              
              <form onSubmit={handleRequirement} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto bg-white/5 p-2 rounded-2xl backdrop-blur-sm border border-white/10">
                <input 
                  type="email" 
                  required
                  placeholder="Your Email Address" 
                  className="flex-1 h-14 bg-transparent border-0 text-white placeholder:text-white/50 px-6 focus:outline-none focus:ring-0 text-lg" 
                />
                <Button className="h-14 px-10 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-lg transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1">Subscribe Now</Button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
