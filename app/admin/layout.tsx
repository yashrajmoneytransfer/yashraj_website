"use client"

import { useState, useEffect } from "react"
import { LayoutDashboard, Users, Globe, MessageSquare, Image, Star, HelpCircle, Settings, Menu, X, LogOut, FileText, Building, MapPin, Mail, Phone, Shield, Server, MessageCircle, Layout, User } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Globe, label: "Countries", href: "/admin/countries" },
  { icon: MessageSquare, label: "Quotes", href: "/admin/quotes" },
  { icon: Image, label: "Gallery", href: "/admin/gallery" },
  { icon: HelpCircle, label: "FAQs", href: "/admin/faqs" },
  { icon: FileText, label: "Services", href: "/admin/services" },
  { icon: Layout, label: "Banner", href: "/admin/banner" },
  { icon: Building, label: "About", href: "/admin/about" },
  { icon: MapPin, label: "Contact", href: "/admin/contact" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: Server, label: "Email Settings", href: "/admin/email-settings" },
  { icon: MessageCircle, label: "WhatsApp Settings", href: "/admin/whatsapp-settings" },
  { icon: Globe, label: "SEO", href: "/admin/seo" },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (!token && !pathname.startsWith("/admin/auth") && !pathname.startsWith("/auth")) {
        router.push("/auth/signin")
      }
    }
  }, [pathname, router])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-8">
              YashRaj Admin
            </h1>

            <nav className="space-y-2">
              {sidebarItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-600 text-white"
                        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                )
              })}
            </nav>

            <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 space-y-2">
              <Link
                href="/admin/profile"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                My Profile
              </Link>
              <Link
                href="/"
                className="flex items-center gap-3 px-4 py-3 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Back to Website
              </Link>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
