"use client"

import { useState, useEffect } from "react"
import { Edit, Save, Globe, Image as ImageIcon, Share2, Code, Layout, Loader2, CheckCircle2 } from "lucide-react"
import { API_URL } from "@/lib/api"

export default function SEOPage() {
  const [seo, setSeo] = useState({
    metaTitle: "YashRaj Money Transfer | Best Forex Rates in Vijayawada",
    metaDescription: "Get the best currency exchange rates in Vijayawada. YashRaj Money Transfer offers 50+ currencies with competitive rates and trusted service.",
    metaKeywords: "forex, currency exchange, money transfer, Vijayawada, foreign exchange",
    ogTitle: "YashRaj Money Transfer - Your Trusted Forex Partner",
    ogDescription: "Best currency exchange rates in Vijayawada with complete transparency and trust.",
    ogImage: "/og-image.jpg",
    logoUrl: "/logo.png",
    faviconUrl: "/favicon.ico",
    facebookUrl: "https://facebook.com/yashrajmoneytransfer",
    twitterUrl: "https://twitter.com/yashrajforex",
    instagramUrl: "https://instagram.com/yashrajmoneytransfer",
    linkedinUrl: "https://linkedin.com/company/yashrajmoneytransfer",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" })

  useEffect(() => {
    fetchSeoSettings()
  }, [])

  const fetchSeoSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings/seo`)
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setSeo((prev) => ({
            ...prev,
            metaTitle: data.metaTitle || prev.metaTitle,
            metaDescription: data.metaDescription || prev.metaDescription,
            metaKeywords: data.keywords || prev.metaKeywords,
            ogTitle: data.ogTitle || prev.ogTitle,
            ogDescription: data.ogDescription || prev.ogDescription,
            ogImage: data.ogImage || prev.ogImage,
            facebookUrl: data.facebookUrl || prev.facebookUrl,
            twitterUrl: data.twitterUrl || prev.twitterUrl,
            instagramUrl: data.instagramUrl || prev.instagramUrl,
            linkedinUrl: data.linkedinUrl || prev.linkedinUrl,
          }))
        }
      }
    } catch (err) {
      console.warn("Failed to load SEO settings:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

      const res = await fetch(`${API_URL}/api/settings/seo`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          metaTitle: seo.metaTitle,
          metaDescription: seo.metaDescription,
          keywords: seo.metaKeywords,
          ogTitle: seo.ogTitle,
          ogDescription: seo.ogDescription,
          ogImage: seo.ogImage,
          facebookUrl: seo.facebookUrl,
          twitterUrl: seo.twitterUrl,
          instagramUrl: seo.instagramUrl,
          linkedinUrl: seo.linkedinUrl,
        }),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "SEO & Social Media Links updated successfully!" })
        setIsEditing(false)
        setTimeout(() => setMessage({ type: "", text: "" }), 4000)
      } else {
        const errData = await res.json().catch(() => ({}))
        setMessage({ type: "error", text: errData.error || errData.message || "Failed to update SEO settings." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error. Please try again." })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">SEO & Social Media Settings</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage meta tags, OpenGraph data, and dynamic footer social links.
          </p>
        </div>
        <button
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-sm"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isEditing ? (
            <Save className="w-5 h-5" />
          ) : (
            <Edit className="w-5 h-5" />
          )}
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Settings"}
        </button>
      </div>

      {message.text && (
        <div
          className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${
            message.type === "success"
              ? "bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
              : "bg-red-100 text-red-800 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
          }`}
        >
          <CheckCircle2 className="w-5 h-5" />
          <span>{message.text}</span>
        </div>
      )}

      {/* Meta Tags */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Code className="w-5 h-5 text-primary-600" />
          Meta Tags
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Meta Title</label>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recommended: 50-60 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Meta Description</label>
            <textarea
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Recommended: 150-160 characters</p>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Meta Keywords</label>
            <input
              type="text"
              value={seo.metaKeywords}
              onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="keyword1, keyword2, keyword3"
            />
          </div>
        </div>
      </div>

      {/* Social Links Section */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary-600" />
            Social Media Links (Updates Frontend Footer Links Live)
          </h3>
          <span className="text-xs px-2.5 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-full font-medium">
            Live Frontend Sync
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Facebook URL</label>
            <input
              type="url"
              value={seo.facebookUrl}
              onChange={(e) => setSeo({ ...seo, facebookUrl: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="https://facebook.com/your-page"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Twitter / X URL</label>
            <input
              type="url"
              value={seo.twitterUrl}
              onChange={(e) => setSeo({ ...seo, twitterUrl: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="https://twitter.com/your-handle"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Instagram URL</label>
            <input
              type="url"
              value={seo.instagramUrl}
              onChange={(e) => setSeo({ ...seo, instagramUrl: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="https://instagram.com/your-profile"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">LinkedIn URL</label>
            <input
              type="url"
              value={seo.linkedinUrl}
              onChange={(e) => setSeo({ ...seo, linkedinUrl: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="https://linkedin.com/company/your-company"
            />
          </div>
        </div>
      </div>

      {/* Open Graph */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5 text-primary-600" />
          Open Graph Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">OG Title</label>
            <input
              type="text"
              value={seo.ogTitle}
              onChange={(e) => setSeo({ ...seo, ogTitle: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">OG Description</label>
            <textarea
              value={seo.ogDescription}
              onChange={(e) => setSeo({ ...seo, ogDescription: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <ImageIcon className="w-4 h-4" />
              OG Image URL
            </label>
            <input
              type="text"
              value={seo.ogImage}
              onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Google Search Preview</h3>
        <div className="bg-slate-50 dark:bg-slate-700/50 rounded-lg p-4 max-w-2xl">
          <div className="text-blue-600 dark:text-blue-400 text-lg hover:underline cursor-pointer mb-1">
            {seo.metaTitle}
          </div>
          <div className="text-green-700 dark:text-green-400 text-sm mb-2">yashrajmoneytransfer.com</div>
          <div className="text-slate-600 dark:text-slate-400 text-sm">{seo.metaDescription}</div>
        </div>
      </div>
    </div>
  )
}
