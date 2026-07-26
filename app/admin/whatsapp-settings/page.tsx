"use client"

export const dynamic = "force-dynamic"

import { useState } from "react"
import { Edit, Save, MessageCircle, Phone, Globe } from "lucide-react"

export default function WhatsAppSettingsPage() {
  const [settings, setSettings] = useState({
    phoneNumber: "+919876543210",
    defaultMessage: "Hello! I'm interested in your currency exchange services.",
    showWidget: true,
    widgetPosition: "bottom-right",
    autoReply: true,
    autoReplyMessage: "Thank you for contacting us! We'll get back to you shortly.",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">WhatsApp Settings</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Save Changes" : "Edit Settings"}
        </button>
      </div>

      {/* WhatsApp Number */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Phone className="w-5 h-5" />
          WhatsApp Number
        </h3>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <MessageCircle className="w-4 h-4" />
            Phone Number (with country code)
          </label>
          <input
            type="text"
            value={settings.phoneNumber}
            onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
            disabled={!isEditing}
            placeholder="+91 XXXXX XXXXX"
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
      </div>

      {/* Widget Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Widget Settings
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showWidget"
            checked={settings.showWidget}
            onChange={(e) => setSettings({ ...settings, showWidget: e.target.checked })}
            disabled={!isEditing}
            className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
          />
          <label htmlFor="showWidget" className="text-sm text-slate-700 dark:text-slate-300">Show WhatsApp Widget on Website</label>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Widget Position</label>
          <select
            value={settings.widgetPosition}
            onChange={(e) => setSettings({ ...settings, widgetPosition: e.target.value })}
            disabled={!isEditing}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
          >
            <option value="bottom-right">Bottom Right</option>
            <option value="bottom-left">Bottom Left</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Default Message</label>
          <textarea
            value={settings.defaultMessage}
            onChange={(e) => setSettings({ ...settings, defaultMessage: e.target.value })}
            disabled={!isEditing}
            rows={3}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      {/* Auto Reply Settings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Auto Reply Settings
        </h3>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="autoReply"
            checked={settings.autoReply}
            onChange={(e) => setSettings({ ...settings, autoReply: e.target.checked })}
            disabled={!isEditing}
            className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
          />
          <label htmlFor="autoReply" className="text-sm text-slate-700 dark:text-slate-300">Enable Auto Reply</label>
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Auto Reply Message</label>
          <textarea
            value={settings.autoReplyMessage}
            onChange={(e) => setSettings({ ...settings, autoReplyMessage: e.target.value })}
            disabled={!isEditing}
            rows={3}
            className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
          />
        </div>
      </div>

      {/* Test WhatsApp */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Test Configuration</h3>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          Send Test Message
        </button>
      </div>
    </div>
  )
}
