"use client"

import { motion } from "framer-motion"
import { ChevronDown, Search } from "lucide-react"
import { useState } from "react"

const faqs = [
  {
    question: "What documents do I need for currency exchange?",
    answer: "For currency exchange, you'll need a valid government-issued ID (Aadhaar card, PAN card, or Passport), and for larger amounts, you may need to provide additional documentation such as travel tickets or visa copies.",
    category: "General"
  },
  {
    question: "What are your exchange rates?",
    answer: "Our exchange rates are competitive and updated daily based on market conditions. You can check our live rates on the website or contact us directly for the most current rates.",
    category: "Rates"
  },
  {
    question: "Do you provide forex cards?",
    answer: "Yes, we provide multi-currency forex cards that are convenient and secure for international travel. These cards can be loaded with multiple currencies and used worldwide.",
    category: "Services"
  },
  {
    question: "How long does the currency exchange process take?",
    answer: "For most transactions, the process is completed within 30 minutes to 1 hour. For larger amounts or special requests, it may take slightly longer.",
    category: "Process"
  },
  {
    question: "Can I get currency exchange for study abroad purposes?",
    answer: "Absolutely! We specialize in student forex services and can help with university fee payments, living expenses, and other study abroad currency needs.",
    category: "Services"
  },
  {
    question: "What are your business hours?",
    answer: "We are open Monday to Saturday from 10:00 AM to 7:00 PM. We are closed on Sundays and public holidays.",
    category: "General"
  },
  {
    question: "Do you offer better rates for bulk transactions?",
    answer: "Yes, we offer special rates for bulk transactions and corporate clients. Contact us directly to discuss your requirements and get a customized quote.",
    category: "Rates"
  },
  {
    question: "Is it safe to exchange currency with YashRaj?",
    answer: "Absolutely! We are a registered and authorized forex dealer with over 124 years of experience. All transactions are secure and compliant with RBI regulations.",
    category: "General"
  },
]

const categories = ["All", "General", "Rates", "Services", "Process"]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedCategory === category
                  ? "bg-primary-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {filteredFAQs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                <span className="font-semibold text-slate-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pd-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Still have questions?
          </p>
          <a
            href="https://wa.me/919014798141"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-1"
          >
            Chat with us on WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  )
}
