"use client"

import { useState } from "react"
import { Edit, Save, FileText, Building, Users, Award } from "lucide-react"

export default function AboutPage() {
  const [about, setAbout] = useState({
    companyName: "YashRaj Money Transfer",
    tagline: "Your Trusted Partner for Foreign Exchange",
    description: "YashRaj Money Transfer has been serving Vijayawada for over 10 years, providing the best currency exchange rates with complete transparency and trust.",
    mission: "To provide the most reliable and competitive foreign exchange services to our customers.",
    vision: "To be the leading forex service provider in Andhra Pradesh.",
    foundedYear: "2014",
    totalCustomers: "10000+",
    branches: "5",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">About Content Management</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Save Changes" : "Edit Content"}
        </button>
      </div>

      {/* Company Info */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-5 h-5" />
          Company Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Company Name</label>
            <input
              type="text"
              value={about.companyName}
              onChange={(e) => setAbout({ ...about, companyName: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Tagline</label>
            <input
              type="text"
              value={about.tagline}
              onChange={(e) => setAbout({ ...about, tagline: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <FileText className="w-4 h-4" />
            Description
          </label>
          <textarea
            value={about.description}
            onChange={(e) => setAbout({ ...about, description: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5" />
          Mission & Vision
        </h3>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Mission</label>
          <textarea
            value={about.mission}
            onChange={(e) => setAbout({ ...about, mission: e.target.value })}
            disabled={!isEditing}
            rows={3}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Vision</label>
          <textarea
            value={about.vision}
            onChange={(e) => setAbout({ ...about, vision: e.target.value })}
            disabled={!isEditing}
            rows={3}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Statistics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Founded Year</label>
            <input
              type="text"
              value={about.foundedYear}
              onChange={(e) => setAbout({ ...about, foundedYear: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Total Customers</label>
            <input
              type="text"
              value={about.totalCustomers}
              onChange={(e) => setAbout({ ...about, totalCustomers: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Number of Branches</label>
            <input
              type="text"
              value={about.branches}
              onChange={(e) => setAbout({ ...about, branches: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
