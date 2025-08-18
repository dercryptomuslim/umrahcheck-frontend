"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mosque, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { trackEvent } from '@/lib/posthog'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-emerald-100/50 backdrop-blur-xl bg-white/90 supports-[backdrop-filter]:bg-white/75 shadow-sm"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Premium Logo */}
        <motion.div 
          className="flex items-center space-x-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-600 flex items-center justify-center shadow-2xl shadow-emerald-500/30">
              <Mosque className="w-7 h-7 text-white drop-shadow-sm" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">✓</span>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-600 via-teal-700 to-cyan-700 bg-clip-text text-transparent tracking-tight">
              UmrahCheck
            </h1>
            <p className="text-xs font-medium text-emerald-600 -mt-1 tracking-wide">
              🤖 KI-Hotel-Intelligence
            </p>
          </div>
        </motion.div>

        {/* Premium Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#hotels" className="relative text-slate-700 hover:text-emerald-600 transition-all duration-300 font-semibold group">
            🏨 Hotels
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#preise" className="relative text-slate-700 hover:text-emerald-600 transition-all duration-300 font-semibold group">
            💰 Preise
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <a href="#kontakt" className="relative text-slate-700 hover:text-emerald-600 transition-all duration-300 font-semibold group">
            📞 Kontakt
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 group-hover:w-full transition-all duration-300"></span>
          </a>
          <Badge className="animate-pulse bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md">
            ✓ 100% Halal zertifiziert
          </Badge>
        </div>

        {/* Premium CTA */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="hover:bg-emerald-50 hover:text-emerald-600 transition-colors duration-300"
          >
            <Search className="w-5 h-5" />
          </Button>
          <Button 
            className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5"
            size="lg"
            onClick={() => {
              trackEvent('cta_click', { location: 'navbar', action: 'jetzt_testen' })
              window.location.href = '/formular'
            }}
          >
            ✨ Jetzt kostenlos testen
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-emerald-100/50 bg-white/95 backdrop-blur-xl shadow-lg"
        >
          <div className="container mx-auto px-4 py-6 space-y-4">
            <a href="#hotels" className="block text-slate-700 hover:text-emerald-600 transition-colors font-semibold py-3 px-2 hover:bg-emerald-50 rounded-lg">
              🏨 Hotels
            </a>
            <a href="#preise" className="block text-slate-700 hover:text-emerald-600 transition-colors font-semibold py-3 px-2 hover:bg-emerald-50 rounded-lg">
              💰 Preise
            </a>
            <a href="#kontakt" className="block text-slate-700 hover:text-emerald-600 transition-colors font-semibold py-3 px-2 hover:bg-emerald-50 rounded-lg">
              📞 Kontakt
            </a>
            <div className="pt-4 border-t border-emerald-100 space-y-4">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 shadow-md">
                ✓ 100% Halal zertifiziert
              </Badge>
              <Button 
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/25"
                size="lg"
                onClick={() => {
                  trackEvent('cta_click', { location: 'mobile_menu', action: 'jetzt_testen' })
                  window.location.href = '/formular'
                }}
              >
                ✨ Jetzt kostenlos testen
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}