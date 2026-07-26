"use client"

import { motion } from "framer-motion"
import { ArrowRight, Globe, GraduationCap, Briefcase, CreditCard, Plane, RefreshCw } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Foreign Currency Exchange",
    description: "Buy and sell foreign currencies at competitive rates with instant processing.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Plane,
    title: "Travel Forex",
    description: "Get travel cards and currency for your international trips with best exchange rates.",
    color: "from-green-500 to-green-600",
  },
  {
    icon: GraduationCap,
    title: "Student Forex",
    description: "Special forex solutions for students studying abroad with university fee assistance.",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: CreditCard,
    title: "Forex Cards",
    description: "Multi-currency forex cards for safe and convenient international spending.",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Briefcase,
    title: "Business Currency Exchange",
    description: "Corporate forex solutions for businesses with international operations.",
    color: "from-red-500 to-red-600",
  },
  {
    icon: RefreshCw,
    title: "Currency Remittance Guidance",
    description: "Expert guidance for international money transfers and remittances.",
    color: "from-cyan-500 to-cyan-600",
  },
]

interface ServicesSectionProps {
  onOpenQuote: (serviceTitle?: string) => void
}

export function ServicesSection({ onOpenQuote }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Comprehensive forex solutions for all your currency exchange needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className={`inline-flex p-4 bg-gradient-to-br ${service.color} rounded-xl mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                {service.description}
              </p>
              
              {/* ఇక్కడ క్లిక్ చేసినప్పుడు ఆ సర్వీస్ పేరు `onOpenQuote` కి వెళుతుంది */}
              <button
                type="button"
                onClick={() => onOpenQuote(service.title)}
                className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium group-hover:gap-3 transition-all bg-transparent border-none cursor-pointer"
              >
                Get Quote
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <button
            type="button"
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-navy-600 hover:from-primary-700 hover:to-navy-700 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-1 cursor-pointer"
          >
            Get Free Quote Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}