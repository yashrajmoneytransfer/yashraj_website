"use client"

import { useState } from "react"
import { Edit, Save, Mail, Lock, Server } from "lucide-react"

export default function EmailSettingsPage() {
  const [settings, setSettings] = useState({
    host: "smtp.gmail.com",
    port: "587",
    secure: false,
    user: "noreply@yashrajmoneytransfer.com",
    password: "••••••••",
    fromName: "YashRaj Money Transfer",
    fromEmail: "noreply@yashrajmoneytransfer.com",
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Email Settings</h1>
        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          {isEditing ? <Save className="w-5 h-5" /> : <Edit className="w-5 h-5" />}
          {isEditing ? "Save Changes" : "Edit Settings"}
        </button>
      </div>

      {/* SMTP Configuration */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Server className="w-5 h-5" />
          SMTP Configuration
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">SMTP Host</label>
            <input
              type="text"
              value={settings.host}
              onChange={(e) => setSettings({ ...settings, host: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">SMTP Port</label>
            <input
              type="text"
              value={settings.port}
              onChange={(e) => setSettings({ ...settings, port: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="secure"
            checked={settings.secure}
            onChange={(e) => setSettings({ ...settings, secure: e.target.checked })}
            disabled={!isEditing}
            className="w-5 h-5 rounded border-slate-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50"
          />
          <label htmlFor="secure" className="text-sm text-slate-700 dark:text-slate-300">Use SSL/TLS</label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Mail className="w-4 h-4" />
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.user}
              onChange={(e) => setSettings({ ...settings, user: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Lock className="w-4 h-4" />
              SMTP Password
            </label>
            <input
              type="password"
              value={settings.password}
              onChange={(e) => setSettings({ ...settings, password: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Email Sender Details */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Email Sender Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">From Name</label>
            <input
              type="text"
              value={settings.fromName}
              onChange={(e) => setSettings({ ...settings, fromName: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">From Email</label>
            <input
              type="email"
              value={settings.fromEmail}
              onChange={(e) => setSettings({ ...settings, fromEmail: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      {/* Test Email */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Test Configuration</h3>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          Send Test Email
        </button>
      </div>
    </div>
  )
}
