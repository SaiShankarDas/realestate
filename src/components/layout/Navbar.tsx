"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 md:w-9 md:h-9">
                <Image 
                  src="/logo.png" 
                  alt="UrbanArch Mumbai Logo" 
                  fill 
                  sizes="(max-width: 768px) 32px, 36px"
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl font-black text-primary-950 tracking-tighter">UrbanArch<span className="font-light opacity-80">Mumbai</span></span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="#" className="text-sm font-medium text-foreground hover:text-primary-900 hover:underline underline-offset-4 decoration-2">Buy</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Rent</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">New Projects</Link>
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Commercial</Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground">Login</Link>
            <Button className="bg-primary-900 text-white hover:bg-primary-800 rounded-lg px-6 font-bold">Post Property</Button>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t">
          <div className="space-y-1 px-4 pb-3 pt-2 bg-background">
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-foreground hover:bg-muted">Buy</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Rent</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground">New Projects</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Commercial</Link>
            <Link href="#" className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-muted hover:text-foreground">Login</Link>
            <div className="px-3 pt-2">
              <Button className="w-full bg-primary-900 text-white hover:bg-primary-800">Post Property</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
