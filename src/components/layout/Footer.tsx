import Link from "next/link"
import Image from "next/image"
import { Globe, Mail, Phone, Share2 } from "lucide-react"
import WhatsAppIcon from "@/components/common/WhatsAppIcon"

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image 
                  src="/logo.png" 
                  alt="UrbanArch Mumbai" 
                  fill 
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-black text-primary-950 tracking-tighter">UrbanArch<span className="font-light opacity-80">Mumbai</span></span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Mumbai's leading tech-first real estate discovery platform. Committed to transparency and RERA compliance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary-900 bg-muted p-2 rounded-full"><Globe className="h-4 w-4" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary-900 bg-muted p-2 rounded-full"><Mail className="h-4 w-4" /></Link>
              <Link href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="text-white bg-[#25D366] hover:bg-[#128C7E] shadow-sm shadow-[#25D366]/40 p-2 rounded-full transition-all"><WhatsAppIcon className="h-4 w-4" /></Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Explore Mumbai</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Mumbai Central</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">South Mumbai</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Thane</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Navi Mumbai</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Property Types</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Apartments</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Villas</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Commercial</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">New Projects</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">RERA Compliance</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm font-medium text-primary-900 mt-2 block">1800-ARCH-MUM</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground text-center md:text-left">
            &copy; {new Date().getFullYear()} UrbanArch Mumbai. RERA Registered Portals Only.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground flex items-center gap-1 border border-border px-2 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-green-500 block"></span>
              BUILT FOR MUMBAI
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
