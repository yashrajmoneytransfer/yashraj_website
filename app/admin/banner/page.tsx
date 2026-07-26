"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Edit, Save, Image as ImageIcon, Type, Layout } from "lucide-react"

export default function BannerPage() {
  const [banner, setBanner] = useState({
    title: "Your Trusted Partner for Foreign Exchange",
    subtitle: "Best rates for 50+ currencies in Vijayawada",
    ctaText: "Get Started",
    ctaLink: "#calculator",
    backgroundImage: "/hero-bg.jpg",
    showStats: true,
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
    // In production, save to API
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Home Banner Management</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Save Changes" : "Edit Banner"}
        </button>
      </div>

      {/* Banner Preview */}
      <div className="bg-gradient-to-br from-primary-600 to-navy-600 rounded-2xl p-12 text-white relative overflow-hidden">
        <div className="relative z-10">
          {isEditing ? (
            <input
              type="text"
              value={banner.title}
              onChange={(e) => setBanner({ ...banner, title: e.target.value })}
              className="w-full text-4xl md:text-5xl font-bold bg-transparent border-b-2 border-white/30 focus:border-white outline-none mb-4"
            />
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h2>
          )}
          {isEditing ? (
            <input
              type="text"
              value={banner.subtitle}
              onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
              className="w-full text-xl bg-transparent border-b-2 border-white/30 focus:border-white outline-none mb-6"
            />
          ) : (
            <p className="text-xl mb-6">{banner.subtitle}</p>
          )}
          {isEditing ? (
            <div className="flex gap-4">
              <input
                type="text"
                value={banner.ctaText}
                onChange={(e) => setBanner({ ...banner, ctaText: e.target.value })}
                className="px-4 py-2 bg-white/20 rounded-lg outline-none"
                placeholder="Button Text"
              />
              <input
                type="text"
                value={banner.ctaLink}
                onChange={(e) => setBanner({ ...banner, ctaLink: e.target.value })}
                className="px-4 py-2 bg-white/20 rounded-lg outline-none"
                placeholder="Button Link"
              />
            </div>
          ) : (
            <button className="px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-100 transition-colors">
              {banner.ctaText}
            </button>
          )}
        </div>
      </div>

      {/* Banner Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Layout className="w-5 h-5" />
          Banner Settings
        </h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Type className="w-4 h-4" />
              Title
            </label>
            <input
              type="text"
              value={banner.title}
              onChange={(e) => setBanner({ ...banner, title: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Type className="w-4 h-4" />
              Subtitle
            </label>
            <input
              type="text"
              value={banner.subtitle}
              onChange={(e) => setBanner({ ...banner, subtitle: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">CTA Button Text</label>
              <input
                type="text"
                value={banner.ctaText}
                onChange={(e) => setBanner({ ...banner, ctaText: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">CTA Link</label>
              <input
                type="text"
                value={banner.ctaLink}
                onChange={(e) => setBanner({ ...banner, ctaLink: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <ImageIcon className="w-4 h-4" />
              Background Image URL
            </label>
            <input
              type="text"
              value={banner.backgroundImage}
              onChange={(e) => setBanner({ ...banner, backgroundImage: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="showStats"
              checked={banner.showStats}
              onChange={(e) => setBanner({ ...banner, showStats: e.target.checked })}
              disabled={!isEditing}
              className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
            />
            <label htmlFor="showStats" className="text-sm text-slate-700 dark:text-slate-300">Show Statistics Section</label>
          </div>
        </div>
      </div>
    </div>
  )
}
