"use client"

import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Loader2, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const [contactInfo, setContactInfo] = useState({
    address: "2nd Floor Sai Look Complex, Labbipet, Vijayawada, Andhra Pradesh, India",
    phone: "+91 9014798141",
    email: "yashraj.transfer@gmail.com",
    whatsapp: "+91 9014798141",
    businessHours: "Monday - Saturday: 10:00 AM - 7:00 PM",
    googleMapsUrl: "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7",
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)
      const res = await fetch(`${API_URL}/api/settings`, { signal: controller.signal })
      clearTimeout(timeoutId)

      if (res.ok) {
        const data = await res.json()
        if (data) {
          setContactInfo((prev) => ({
            ...prev,
            address: data.address || prev.address,
            phone: data.mobile || data.phone || prev.phone,
            email: data.email || prev.email,
            whatsapp: data.whatsapp || prev.whatsapp,
            businessHours: data.businessHours || data.workingHours || prev.businessHours,
            googleMapsUrl: data.googleMapsUrl || prev.googleMapsUrl,
          }))
        }
      }
    } catch (err) {
      console.warn("Using default contact settings:", err)
    }
  }

  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: "success" | "error" | ""; message: string }>({
    type: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setStatus({ type: "", message: "" })

    // Use Backend API URL from .env or default Express Port 5000
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

    try {
      const response = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: data.message || "Thank you! Your message has been sent successfully."
        })
        // Reset form
        setTimeout(() => {
          setStatus({ type: "", message: "" })
        }, 4000)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        setStatus({
          type: "error",
          message: data.error || "Something went wrong. Please try again."
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setStatus({
        type: "error",
        message: "Failed to connect to the server. Please check your network connection."
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Contact <span className="text-gradient">Us</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Get in touch with us for any queries or assistance
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Address */}
            <a
              href={contactInfo.googleMapsUrl || "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7"}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-4 group cursor-pointer"
            >
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 rounded-xl transition-colors">
                <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors flex items-center gap-1.5">
                  Address
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                  {contactInfo.address}
                </p>
              </div>
            </a>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Phone className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Phone</h3>
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Mail className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Business Hours */}
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-xl">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Business Hours</h3>
                <p className="text-slate-600 dark:text-slate-400 whitespace-pre-line">
                  {contactInfo.businessHours}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={`tel:${contactInfo.phone}`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-xl transition-colors font-medium shadow-sm"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors font-medium shadow-sm"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp
              </a>
              <a
                href={contactInfo.googleMapsUrl || "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl transition-colors font-medium shadow-sm"
              >
                <MapPin className="w-5 h-5 text-red-400" />
                Get Directions
              </a>
            </div>

            {/* Real Interactive Google Map */}
            <div className="pt-6">
              <div className="relative group w-full h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.4215264669894!2d80.63660721532997!3d16.50285399874839!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fbb42ade5ecf%3A0xfef7d7ecb2889c4e!2sYashraj%20Money%20Transfer!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Direct Clickable Overlay Link to Real Google Maps Location */}
                <a
                  href={contactInfo.googleMapsUrl || "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 bg-transparent group-hover:bg-slate-900/10 transition-all flex items-end justify-end p-4 cursor-pointer"
                  title="Open Yashraj Money Transfer on Google Maps"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/90 dark:bg-slate-900/90 hover:bg-white dark:hover:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs rounded-xl shadow-md border border-slate-200 dark:border-slate-700 backdrop-blur-sm transition-all group-hover:scale-105">
                    <MapPin className="w-4 h-4 text-red-500" />
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <form onSubmit={handleSubmit} className="bg-slate-50 dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700">
              <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                Send us a Message
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Status Alert Box (English Only) */}
                {status.message && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium ${
                      status.type === "success"
                        ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                        : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-navy-600 hover:from-primary-700 hover:to-navy-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/25 hover:-translate-y-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}