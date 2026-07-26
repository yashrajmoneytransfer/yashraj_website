"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowUp, MessageCircle, Phone } from "lucide-react"
import { useState, useEffect } from "react"

export function FloatingElements() {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setShowScrollTop(window.scrollY > 500)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-600 to-navy-600"
          style={{
            scaleX,
          }}
        />
      </div>

      {/* Sticky WhatsApp */}
      <motion.a
        href="https://wa.me/919014798141"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 p-4 bg-green-600 hover:bg-green-700 text-white rounded-full shadow-lg shadow-green-600/30 transition-colors"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>

      {/* Sticky Call */}
      <motion.a
        href="tel:+919014798141"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-20 z-50 p-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg shadow-primary-600/30 transition-colors"
        aria-label="Call"
      >
        <Phone className="w-6 h-6" />
      </motion.a>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 p-4 bg-slate-900 dark:bg-slate-700 hover:bg-slate-800 dark:hover:bg-slate-600 text-white rounded-full shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </>
  )
}
