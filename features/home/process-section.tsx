"use client"

import { motion } from "framer-motion"
import { MessageCircle, FileText, MapPin, CheckCircle } from "lucide-react"
import { GetQuoteSection } from "./get-quote-section";

const steps = [
  {
    icon: MessageCircle,
    title: "Contact Us",
    description: "Reach out via WhatsApp, phone, or visit our office for enquiry",
  },
  {
    icon: FileText,
    title: "Get Quote",
    description: "Receive competitive exchange rates based on current market rates",
  },
  {
    icon: MapPin,
    title: "Visit Office",
    description: "Visit our Vijayawada office with required documents",
  },
  {
    icon: CheckCircle,
    title: "Receive Currency",
    description: "Get your foreign currency instantly with secure processing",
  },
]

export function ProcessSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 overflow-hidden w-full max-w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            How It <span className="text-gradient">Works</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Simple 4-step process to get your foreign currency
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-600 via-navy-600 to-primary-600 transform -translate-y-1/2" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-600 to-navy-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex p-4 bg-primary-100 dark:bg-primary-900/30 rounded-xl mb-6 mt-4">
                    <step.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {step.description}
                  </p>
                </div>

                {/* Arrow for mobile */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center mt-4">
                    <div className="w-8 h-8 border-b-2 border-r-2 border-primary-600 transform rotate-45" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <a
            href="https://wa.me/919014798141"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-green-500/25 hover:-translate-y-1"
          >
            Start Your Journey
            <MessageCircle className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
