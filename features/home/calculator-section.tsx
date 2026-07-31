"use client"

import { motion } from "framer-motion"
import { ArrowRightLeft, Calculator as CalculatorIcon, Clock, Loader2 } from "lucide-react"
import { useState, useEffect } from "react"
import { QuoteModal } from "./quote-modal"
import { API_URL } from "@/lib/api"
import { CountryFlag } from "@/components/country-flag"

interface Country {
  code: string
  name: string
  flag: string
  buyRate: number
  sellRate: number
}

const defaultCountries: Country[] = [
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳", buyRate: 1, sellRate: 1 },
  { code: "USD", name: "US Dollar", flag: "🇺🇸", buyRate: 83.50, sellRate: 82.80 },
  { code: "EUR", name: "Euro", flag: "🇪🇺", buyRate: 91.20, sellRate: 90.50 },
  { code: "GBP", name: "British Pound", flag: "🇬🇧", buyRate: 105.80, sellRate: 104.90 },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪", buyRate: 22.75, sellRate: 22.50 },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺", buyRate: 55.20, sellRate: 54.80 },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦", buyRate: 61.50, sellRate: 61.10 },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵", buyRate: 0.56, sellRate: 0.55 },
  { code: "SAR", name: "Saudi Riyal", flag: "🇸🇦", buyRate: 22.25, sellRate: 22.00 },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭", buyRate: 94.20, sellRate: 93.80 },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬", buyRate: 61.80, sellRate: 61.40 },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿", buyRate: 51.20, sellRate: 50.80 },
  { code: "THB", name: "Thai Baht", flag: "🇹🇭", buyRate: 2.35, sellRate: 2.30 },
  { code: "MYR", name: "Malaysian Ringgit", flag: "🇲🇾", buyRate: 18.50, sellRate: 18.20 },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳", buyRate: 11.50, sellRate: 11.30 },
  { code: "HKD", name: "Hong Kong Dollar", flag: "🇭🇰", buyRate: 10.70, sellRate: 10.50 },
  { code: "KWD", name: "Kuwaiti Dinar", flag: "🇰🇼", buyRate: 272.50, sellRate: 270.00 },
  { code: "QAR", name: "Qatari Riyal", flag: "🇶🇦", buyRate: 22.90, sellRate: 22.60 },
  { code: "OMR", name: "Omani Rial", flag: "🇴🇲", buyRate: 217.50, sellRate: 215.00 },
  { code: "BHD", name: "Bahraini Dinar", flag: "🇧🇭", buyRate: 221.50, sellRate: 219.00 },
  { code: "NOK", name: "Norwegian Krone", flag: "🇳🇴", buyRate: 7.80, sellRate: 7.60 },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪", buyRate: 7.90, sellRate: 7.70 },
  { code: "DKK", name: "Danish Krone", flag: "🇩🇰", buyRate: 12.20, sellRate: 12.00 },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦", buyRate: 4.50, sellRate: 4.40 },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭", buyRate: 1.48, sellRate: 1.45 },
  { code: "IDR", name: "Indonesian Rupiah", flag: "🇮🇩", buyRate: 0.0053, sellRate: 0.0051 },
  { code: "KRW", name: "South Korean Won", flag: "🇰🇷", buyRate: 0.062, sellRate: 0.060 },
  { code: "TRY", name: "Turkish Lira", flag: "🇹🇷", buyRate: 2.55, sellRate: 2.50 },
  { code: "RUB", name: "Russian Ruble", flag: "🇷🇺", buyRate: 0.92, sellRate: 0.90 },
  { code: "BND", name: "Brunei Dollar", flag: "🇧🇳", buyRate: 61.80, sellRate: 61.40 },
  { code: "FJD", name: "Fijian Dollar", flag: "🇫🇯", buyRate: 37.50, sellRate: 37.00 },
  { code: "MUR", name: "Mauritian Rupee", flag: "🇲🇺", buyRate: 1.78, sellRate: 1.75 },
]

export function CalculatorSection() {
  const [fromCurrency, setFromCurrency] = useState("INR")
  const [toCurrency, setToCurrency] = useState("USD")
  const [amount, setAmount] = useState<number | "">(1000)
  const [conversionType, setConversionType] = useState<"buy" | "sell">("buy")
  const [showQuoteModal, setShowQuoteModal] = useState(false)
  const [countries, setCountries] = useState<Country[]>(defaultCountries)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchCountries()
    const interval = setInterval(fetchCountries, 5000) // Live polling every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchCountries = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      const response = await fetch(`${API_URL}/api/countries`, { signal: controller.signal })
      clearTimeout(timeoutId)
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data) && data.length > 0) {
          const countriesWithRates = data.map((country: any) => ({
            code: country.currencyCode || country.code || "USD",
            name: country.currencyName || country.name || "Currency",
            flag: country.flag || "🌐",
            buyRate: Number(country.buyRate || country.rates?.[0]?.buyRate || 0),
            sellRate: Number(country.sellRate || country.rates?.[0]?.sellRate || 0),
          }))

          // Ensure INR is first position in calculator
          const hasINR = countriesWithRates.some((c: Country) => c.code === "INR")
          const finalCountries = hasINR
            ? countriesWithRates
            : [{ code: "INR", name: "Indian Rupee", flag: "🇮🇳", buyRate: 1, sellRate: 1 }, ...countriesWithRates]

          setCountries(finalCountries)
          setLastUpdated(new Date())
        }
      }
    } catch (error) {
      console.warn("Failed to fetch countries, using default list:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const fromCountry = countries.find((c) => c.code === fromCurrency)
  const toCountry = countries.find((c) => c.code === toCurrency)

  const calculateConversion = () => {
    const numAmount = Number(amount) || 0
    if (!fromCountry || !toCountry || numAmount <= 0) return 0

    if (fromCurrency === "INR") {
      // INR to Foreign Currency
      const rate = conversionType === "buy" ? toCountry.buyRate : toCountry.sellRate
      return rate > 0 ? numAmount / rate : 0
    } else if (toCurrency === "INR") {
      // Foreign Currency to INR
      const rate = conversionType === "buy" ? fromCountry.sellRate : fromCountry.buyRate
      return numAmount * rate
    } else {
      // Cross currency conversion
      const toINR = numAmount * fromCountry.sellRate
      return toCountry.buyRate > 0 ? toINR / toCountry.buyRate : 0
    }
  }

  const convertedAmount = calculateConversion()

  const swapCurrencies = () => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <section id="calculator" className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-full mb-3 text-sm font-semibold">
            <CalculatorIcon className="w-4 h-4" />
            <span>Live Calculator</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Currency Exchange <span className="text-blue-600">Calculator</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 mt-2">
            Calculate your currency exchange with real-time rates
          </p>
        </motion.div>

        {/* Main Xe-Style White Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 md:p-10">

            {/* Toggle Buttons: Buy / Sell */}
            <div className="flex bg-slate-100 dark:bg-slate-700/60 p-1.5 rounded-2xl max-w-md mx-auto mb-8">
              <button
                onClick={() => setConversionType("buy")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${conversionType === "buy"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
              >
                We Buy Foreign Currency
              </button>
              <button
                onClick={() => setConversionType("sell")}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${conversionType === "sell"
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                  }`}
              >
                We Sell Foreign Currency
              </button>
            </div>

            {/* Xe Style Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center mb-8">

              {/* Amount Input */}
              <div className="md:col-span-4">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  placeholder="Enter amount"
                  className="w-full h-14 px-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl font-bold text-xl text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>

              {/* From Currency Select */}
              <div className="md:col-span-3.5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                  From
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none flex items-center gap-1.5 z-10">
                    <CountryFlag code={fromCountry?.code || fromCurrency} flag={fromCountry?.flag} size="md" />
                  </div>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center pt-2 md:pt-6">
                <button
                  onClick={swapCurrencies}
                  title="Swap Currencies"
                  className="p-3 bg-blue-50 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-blue-600 dark:text-blue-400 rounded-full border border-blue-200 dark:border-slate-600 transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <ArrowRightLeft className="w-5 h-5" />
                </button>
              </div>

              {/* To Currency Select */}
              <div className="md:col-span-3.5">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">
                  To
                </label>
                <div className="relative flex items-center">
                  <div className="absolute left-3.5 pointer-events-none flex items-center gap-1.5 z-10">
                    <CountryFlag code={toCountry?.code || toCurrency} flag={toCountry?.flag} size="md" />
                  </div>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full h-14 pl-14 pr-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all cursor-pointer"
                  >
                    {countries.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.code} - {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

            </div>

            {/* Conversion Result Section */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Converted Amount</p>
                <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1">
                  {convertedAmount.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}{" "}
                  <span className="text-blue-600">{toCurrency}</span>
                </h3>

                {/* Rate details and timestamp */}
                <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-400">
                  {fromCountry && toCountry && (
                    <span>
                      1 {fromCurrency === "INR" ? toCurrency : fromCurrency} = ₹
                      {(conversionType === "buy" ? (toCountry.code === "INR" ? fromCountry.buyRate : toCountry.buyRate) : (toCountry.code === "INR" ? fromCountry.sellRate : toCountry.sellRate)).toFixed(2)} INR
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-slate-400">
                    {isLoading ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Clock className="w-3.5 h-3.5" />
                    )}
                    <span>
                      {isLoading
                        ? "Fetching latest rates..."
                        : `Updated: ${lastUpdated?.toLocaleTimeString() || "Just now"}`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Get Free Quote CTA */}
              <button
                onClick={() => setShowQuoteModal(true)}
                className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all hover:scale-[1.02] active:scale-95"
              >
                Get Free Quote
              </button>
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-xs text-center md:text-left text-slate-400">
              * Rates are indicative and based on admin updates. Visit our office for exact live trading rates.
            </p>

          </div>
        </motion.div>
      </div>

      {/* Quote Modal */}
      {showQuoteModal && (
        <QuoteModal
          isOpen={showQuoteModal}
          onClose={() => setShowQuoteModal(false)}
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          amount={Number(amount) || 0}
          conversionType={conversionType}
        />
      )}
    </section>
  )
}