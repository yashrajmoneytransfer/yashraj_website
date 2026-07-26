"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, MessageCircle } from "lucide-react"
import Link from "next/link"
import { API_URL } from "@/lib/api"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/yashrajmoneytransfer",
    twitter: "https://twitter.com/yashrajforex",
    instagram: "https://instagram.com/yashrajmoneytransfer",
    linkedin: "https://linkedin.com/company/yashrajmoneytransfer",
  })

  const [contactInfo, setContactInfo] = useState({
    address: "2nd Floor Sai Look Complex, Labbipet, Vijayawada, Andhra Pradesh, India",
    phone: "+91 9014798141",
    email: "yashraj.transfer@gmail.com",
    whatsapp: "+91 9014798141",
    googleMapsUrl: "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7",
  })

  useEffect(() => {
    fetchFooterData()
  }, [])

  const fetchFooterData = async () => {
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000)

      const [seoRes, settingsRes] = await Promise.all([
        fetch(`${API_URL}/api/settings/seo`, { signal: controller.signal }),
        fetch(`${API_URL}/api/settings`, { signal: controller.signal }),
      ])
      clearTimeout(timeoutId)

      if (seoRes.ok) {
        const data = await seoRes.json()
        if (data) {
          setSocialLinks({
            facebook: data.facebookUrl || socialLinks.facebook,
            twitter: data.twitterUrl || socialLinks.twitter,
            instagram: data.instagramUrl || socialLinks.instagram,
            linkedin: data.linkedinUrl || socialLinks.linkedin,
          })
        }
      }

      if (settingsRes.ok) {
        const data = await settingsRes.json()
        if (data) {
          setContactInfo((prev) => ({
            ...prev,
            address: data.address || prev.address,
            phone: data.mobile || data.phone || prev.phone,
            email: data.email || prev.email,
            whatsapp: data.whatsapp || prev.whatsapp,
            googleMapsUrl: data.googleMapsUrl || prev.googleMapsUrl,
          }))
        }
      }
    } catch (err) {
      console.warn("Using default footer data:", err)
    }
  }

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "Services", href: "#services" },
    { name: "Calculator", href: "#calculator" },
    { name: "Gallery", href: "#gallery" },
    { name: "Reviews", href: "#reviews" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ]

  const services = [
    "Foreign Currency Exchange",
    "Travel Forex",
    "Student Forex",
    "Forex Cards",
    "University Fee Assistance",
    "Business Currency Exchange",
  ]

  const socialItems = [
    { icon: Facebook, href: socialLinks.facebook, label: "Facebook" },
    { icon: Twitter, href: socialLinks.twitter, label: "Twitter" },
    { icon: Instagram, href: socialLinks.instagram, label: "Instagram" },
    { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-navy-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">YR</span>
              </div>
              <div>
                <div className="font-bold text-xl">YashRaj</div>
                <div className="text-sm text-slate-400">Money Transfer</div>
              </div>
            </div>
            <p className="text-slate-400 leading-relaxed">
              Trusted foreign exchange services in Vijayawada since 2016. Best rates, fast service, and reliable support for all your forex needs.
            </p>

            {/* Dynamic Social Links configured in Admin SEO */}
            <div className="flex gap-4">
              {socialItems.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-800 hover:bg-primary-600 text-slate-300 hover:text-white rounded-xl transition-all hover:scale-105"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-slate-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a
                href={contactInfo.googleMapsUrl || "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
              >
                <MapPin className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0 group-hover:text-primary-300" />
                <div className="leading-relaxed whitespace-pre-line">
                  {contactInfo.address}
                </div>
              </a>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">

            {/* Left Side: Copyright + Admin Portal Link */}
            <div className="flex items-center gap-3 text-slate-400 text-sm">
              <span>© {currentYear} YashRaj Money Transfer. All rights reserved.</span>
              <span className="text-slate-700">|</span>
              <Link
                href="/auth/signin"
                className="text-slate-600 hover:text-slate-400 transition-colors text-xs"
              >
                Admin Portal
              </Link>
            </div>

            {/* Right Side: Legal Links */}
            <div className="flex items-center gap-6 text-sm">
              <Link
                href="/privacy-policy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms & Conditions
              </Link>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}