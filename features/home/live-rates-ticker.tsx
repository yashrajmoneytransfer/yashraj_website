"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Clock, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { API_URL } from "@/lib/api"
import { GetQuoteSection } from "./get-quote-section";

interface CurrencyRate {
  flag: string
  code: string
  name: string
  buyRate: number
  sellRate: number
  trend: "up" | "down"
  isPopular?: boolean
}

const mockRates: CurrencyRate[] = [
  { flag: "🇺🇸", code: "USD", name: "US Dollar", buyRate: 83.50, sellRate: 82.80, trend: "up", isPopular: true },
  { flag: "🇪🇺", code: "EUR", name: "Euro", buyRate: 91.20, sellRate: 90.50, trend: "up", isPopular: true },
  { flag: "🇬🇧", code: "GBP", name: "British Pound", buyRate: 105.80, sellRate: 104.90, trend: "down", isPopular: true },
  { flag: "🇦🇪", code: "AED", name: "UAE Dirham", buyRate: 22.75, sellRate: 22.50, trend: "up", isPopular: true },
  { flag: "🇦🇺", code: "AUD", name: "Australian Dollar", buyRate: 55.20, sellRate: 54.80, trend: "up" },
  { flag: "🇨🇦", code: "CAD", name: "Canadian Dollar", buyRate: 61.50, sellRate: 61.10, trend: "down" },
  { flag: "🇯🇵", code: "JPY", name: "Japanese Yen", buyRate: 0.56, sellRate: 0.55, trend: "up" },
  { flag: "🇸🇬", code: "SGD", name: "Singapore Dollar", buyRate: 61.80, sellRate: 61.40, trend: "down" },
  { flag: "🇨🇭", code: "CHF", name: "Swiss Franc", buyRate: 94.20, sellRate: 93.80, trend: "up" },
  { flag: "🇸🇦", code: "SAR", name: "Saudi Riyal", buyRate: 22.25, sellRate: 22.00, trend: "up" },
]

export function LiveRatesTicker() {
  const [rates, setRates] = useState<CurrencyRate[]>(mockRates)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchRates()
    const interval = setInterval(fetchRates, 8000) // Live polling every 8 seconds

    return () => clearInterval(interval)
  }, [])

  const fetchRates = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      const response = await fetch(`${API_URL}/api/countries`, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          const ratesWithTrend = data.map((country: any) => ({
            flag: country.flag || "🌐",
            code: country.currencyCode || country.code || "USD",
            name: country.currencyName || country.name || "Currency",
            buyRate: Number(country.buyRate || country.rates?.[0]?.buyRate || 0),
            sellRate: Number(country.sellRate || country.rates?.[0]?.sellRate || 0),
            trend: country.buyRate >= country.sellRate ? "up" : ("down" as "up" | "down"),
            isPopular: country.isPopular || false,
          }))
          setRates(ratesWithTrend)
          setLastUpdated(new Date())
        }
      }
    } catch (error) {
      console.warn("Using default rates due to network/timeout:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-full bg-slate-900 py-4 overflow-hidden border-y border-slate-800 relative">
      <div className="flex items-center w-full max-w-full overflow-hidden min-w-0">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 whitespace-nowrap min-w-max"
        >
          {[...rates, ...rates, ...rates].map((rate, index) => (
            <div
              key={`${rate.code}-${index}`}
              className="flex items-center gap-4 px-6 py-3 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors cursor-pointer group"
            >
              <div className="text-3xl">{rate.flag}</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{rate.code}</span>
                  {rate.isPopular && (
                    <span className="px-2 py-0.5 bg-gold-500/20 text-gold-400 text-xs rounded-full font-medium">
                      Popular
                    </span>
                  )}
                </div>
                <span className="text-slate-400 text-sm">{rate.name}</span>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Buy:</span>
                  <span className="font-semibold text-green-400">₹{rate.buyRate.toFixed(2)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-sm">Sell:</span>
                  <span className="font-semibold text-red-400">₹{rate.sellRate.toFixed(2)}</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 ${rate.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                {rate.trend === "up" ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                {isLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
                <span>{isLoading ? "Loading..." : lastUpdated?.toLocaleTimeString() || "Just now"}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
