"use client"

import { motion } from "framer-motion"
import { MessageSquare } from "lucide-react"

export function FeedbackButton() {
  // 💡 మీ Google Maps Review URL ని ఇక్కడ మార్చండి
  const GOOGLE_REVIEW_URL =
    "https://www.google.com/search?q=yashraj+money+transfer#lrd=0x3a35fbb42ade5ecf:0xfef7d7ecb2889c4e,3,,,,"

  const handleRedirect = () => {
    window.open(GOOGLE_REVIEW_URL, "_blank")
  }

  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleRedirect}
      className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 text-white rounded-full shadow-lg shadow-gold-500/30 flex items-center justify-center hover:shadow-xl transition-all cursor-pointer"
      title="Leave a Review on Google"
    >
      <MessageSquare className="w-6 h-6" />
    </motion.button>
  )
}