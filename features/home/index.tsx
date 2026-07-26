"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react" // క్లోజ్ బటన్ కోసం
import { Hero } from "./hero"
import { LiveRatesTicker } from "./live-rates-ticker"
import { CalculatorSection } from "./calculator-section"
import { TrustSection } from "./trust-section"
import { ServicesSection } from "./services-section"
import { ProcessSection } from "./process-section"
import GoogleReviewsWidget from "@/components/GoogleReviewsWidget"
import { GallerySection } from "./gallery-section"
import { FAQSection } from "./faq-section"
import { ContactSection } from "./contact-section"
import { FloatingElements } from "./floating-elements"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeedbackButton } from "@/components/feedback-button"
import { GetQuoteSection } from "./get-quote-section"

export function Home() {
  const [showQuote, setShowQuote] = useState(false)
  const [selectedService, setSelectedService] = useState("")

  const handleOpenQuote = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle)
    }
    setShowQuote(true) // బటన్ నొక్కగానే పాప్-అప్ ఓపెన్ అవుతుంది
  }

  return (
    <div className="min-h-screen relative w-full max-w-full overflow-x-hidden">
      <Navbar />
      <FloatingElements />
      <Hero />
      <LiveRatesTicker />
      <CalculatorSection />
      <TrustSection />
      
      {/* ServicesSection */}
      <ServicesSection onOpenQuote={handleOpenQuote} />

      <ProcessSection />
      
      <section id="reviews" className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Customer <span className="text-primary-600">Reviews</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              What our customers say about us on Google
            </p>
          </div>
          <GoogleReviewsWidget />
        </div>
      </section>

      <GallerySection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <FeedbackButton />

      {/* 🌟 పాప్-అప్ (Modal) మోడ్ */}
      <AnimatePresence>
        {showQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* క్లోజ్ (X) బటన్ */}
              <button
                type="button"
                onClick={() => setShowQuote(false)}
                className="absolute top-4 right-4 z-10 p-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 rounded-full text-slate-700 dark:text-slate-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* ఫారమ్ కాంపోనెంట్ */}
              <div className="p-2">
                <GetQuoteSection selectedService={selectedService} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}