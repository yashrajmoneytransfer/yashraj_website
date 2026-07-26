"use client"

import { motion } from "framer-motion"
import { Shield, Clock, Users, Award, CheckCircle, Star } from "lucide-react"

const trustBadges = [
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Your money is safe with our secure processes",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Quick and efficient service delivery",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "200+ Happy Customers",
    description: "Trusted by thousands of satisfied clients",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "8+ Years Experience",
    description: "Decades of expertise in forex services",
    color: "text-gold-400",
    bgColor: "bg-gold-500/10",
  },
  {
    icon: CheckCircle,
    title: "Best Rates Guaranteed",
    description: "Competitive exchange rates in the market",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    icon: Star,
    title: "4.9 Google Rating",
    description: "Excellent customer reviews and ratings",
    color: "text-yellow-400",
    bgColor: "bg-yellow-500/10",
  },
]

export function TrustSection() {
  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Why Choose <span className="text-gradient">YashRaj</span>?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Trusted by generations for reliable foreign exchange services
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group p-8 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
            >
              <div className={`inline-flex p-4 ${badge.bgColor} rounded-xl mb-6 group-hover:scale-110 transition-transform`}>
                <badge.icon className={`w-8 h-8 ${badge.color}`} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                {badge.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {badge.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex justify-center"
        >
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white shadow-lg shadow-green-500/25">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <div className="font-semibold">4.9 Rating</div>
            <div className="text-green-100">on Google</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
