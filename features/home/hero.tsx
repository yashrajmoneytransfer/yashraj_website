"use client"

import { motion } from "framer-motion"
import { ArrowRight, Phone, MessageCircle, Calculator } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { API_URL } from "@/lib/api"
import { GetQuoteSection } from "./get-quote-section"

export function Hero() {
  const [showQuote, setShowQuote] = useState(false)
  const [heroRates, setHeroRates] = useState<any[]>([
    { flag: "🇺🇸", code: "USD", name: "US Dollar", buyRate: 83.50, sellRate: 82.80 },
    { flag: "🇪🇺", code: "EUR", name: "Euro", buyRate: 91.20, sellRate: 90.50 },
    { flag: "🇬🇧", code: "GBP", name: "British Pound", buyRate: 105.80, sellRate: 104.90 },
    { flag: "🇦🇪", code: "AED", name: "UAE Dirham", buyRate: 22.75, sellRate: 22.50 },
  ])

  useEffect(() => {
    fetchHeroRates()
    const interval = setInterval(fetchHeroRates, 8000)
    return () => clearInterval(interval)
  }, [])

  const fetchHeroRates = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      const res = await fetch(`${API_URL}/api/countries`, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          const formatted = data.map((c: any) => ({
            flag: c.flag || "🌐",
            code: c.currencyCode || c.code || "USD",
            name: c.currencyName || c.name || "Currency",
            buyRate: Number(c.buyRate || c.rates?.[0]?.buyRate || 0),
            sellRate: Number(c.sellRate || c.rates?.[0]?.sellRate || 0),
          }))
          setHeroRates(formatted)
        }
      }
    } catch (err) {
      console.warn("Using default hero rates:", err)
    }
  }

  return (
    <section className="relative min-h-[80vh] lg:min-h-[85vh] flex items-center justify-center w-full max-w-full overflow-hidden bg-gradient-to-br from-primary-900 via-navy-900 to-primary-950">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] max-w-full h-[800px] bg-navy-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Currency Symbols */}
        <motion.div
          className="absolute top-[10%] left-[15%] text-6xl text-white/5 font-bold animate-float"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          $
        </motion.div>
        <motion.div
          className="absolute top-[20%] right-[20%] text-5xl text-white/5 font-bold animate-float-delayed"
          animate={{ y: [0, -25, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          €
        </motion.div>
        <motion.div
          className="absolute bottom-[30%] left-[10%] text-7xl text-white/5 font-bold animate-float"
          animate={{ y: [0, -35, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
        >
          £
        </motion.div>
        <motion.div
          className="absolute bottom-[20%] right-[15%] text-6xl text-white/5 font-bold animate-float-delayed"
          animate={{ y: [0, -28, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        >
          ¥
        </motion.div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

      <div className="relative z-10 container mx-auto px-4 pt-24 pb-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold-500/20 rounded-full border border-gold-500/30"
            >
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <span className="text-gold-300 text-sm font-medium">Trusted Since 2016</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl font-bold font-heading leading-tight"
            >
              Trusted Foreign Exchange Services in{" "}
              <span className="text-gradient-gold">Vijayawada</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-slate-300 leading-relaxed"
            >
              Best Exchange Rates • Fast Service • Trusted Partner
              <br />
              Travel Forex • Student Forex • University Fee Assistance
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={() => setShowQuote(true)}
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-gold-500/25 hover:-translate-y-1"
              >
                Get Free Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <Link
                href="#calculator"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm"
              >
                <Calculator className="w-5 h-5" />
                Exchange Calculator
              </Link>

              <a
                href="tel:+919014798141"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>

              <a
                href="https://wa.me/919014798141"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10"
            >
              <div>
                <div className="text-3xl font-bold text-gold-400">8+</div>
                <div className="text-slate-400 text-sm">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">200+</div>
                <div className="text-slate-400 text-sm">Happy Customers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">25+</div>
                <div className="text-slate-400 text-sm">Currencies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">4.9★</div>
                <div className="text-slate-400 text-sm">Google Rating</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Currency Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block w-full max-w-full overflow-hidden"
          >
            <div className="relative w-full h-[600px] max-w-full overflow-hidden">
              {/* Card 1 */}
              {heroRates[0] && (
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 right-0 sm:right-2 w-64 max-w-[calc(100%-1rem)] p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{heroRates[0].flag}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{heroRates[0].code}</div>
                      <div className="text-slate-400 text-sm truncate max-w-[120px]">{heroRates[0].name}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Buy</span>
                      <span className="font-semibold text-green-400">₹{Number(heroRates[0].buyRate || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Sell</span>
                      <span className="font-semibold text-red-400">₹{Number(heroRates[0].sellRate || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
                    <span>↑ Live Rate</span>
                  </div>
                </motion.div>
              )}

              {/* Card 2 */}
              {heroRates[1] && (
                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-32 left-0 sm:left-2 w-64 max-w-[calc(100%-1rem)] p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{heroRates[1].flag}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{heroRates[1].code}</div>
                      <div className="text-slate-400 text-sm truncate max-w-[120px]">{heroRates[1].name}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Buy</span>
                      <span className="font-semibold text-green-400">₹{Number(heroRates[1].buyRate || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Sell</span>
                      <span className="font-semibold text-red-400">₹{Number(heroRates[1].sellRate || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
                    <span>↑ Live Rate</span>
                  </div>
                </motion.div>
              )}

              {/* Card 3 */}
              {heroRates[2] && (
                <motion.div
                  animate={{ y: [0, -18, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-20 right-2 xl:right-6 w-64 max-w-[calc(100%-1rem)] p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{heroRates[2].flag}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{heroRates[2].code}</div>
                      <div className="text-slate-400 text-sm truncate max-w-[120px]">{heroRates[2].name}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Buy</span>
                      <span className="font-semibold text-green-400">₹{Number(heroRates[2].buyRate || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Sell</span>
                      <span className="font-semibold text-red-400">₹{Number(heroRates[2].sellRate || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
                    <span>↑ Live Rate</span>
                  </div>
                </motion.div>
              )}

              {/* Card 4 */}
              {heroRates[3] && (
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                  className="absolute bottom-0 left-2 xl:left-6 w-64 max-w-[calc(100%-1rem)] p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl">{heroRates[3].flag}</div>
                    <div>
                      <div className="text-white font-bold text-lg">{heroRates[3].code}</div>
                      <div className="text-slate-400 text-sm truncate max-w-[120px]">{heroRates[3].name}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Buy</span>
                      <span className="font-semibold text-green-400">₹{Number(heroRates[3].buyRate || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white">
                      <span className="text-slate-400">Sell</span>
                      <span className="font-semibold text-red-400">₹{Number(heroRates[3].sellRate || 0).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-green-400 text-sm font-medium">
                    <span>↑ Live Rate</span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-gold-400 rounded-full"
          />
        </motion.div>
      </motion.div>
      {showQuote && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-slate-900">

            {/* Close Button */}
            <button
              onClick={() => setShowQuote(false)}
              className="absolute right-5 top-5 z-50 h-10 w-10 rounded-full bg-red-500 text-white hover:bg-red-600"
            >
              ✕
            </button>

            <GetQuoteSection />
          </div>
        </div>
      )}
    </section>
  )
}
