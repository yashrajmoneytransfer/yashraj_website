"use client"

import { useState, useEffect } from "react"
import { Edit, Save, MapPin, Phone, Mail, Clock, Building, Loader2, CheckCircle2, Globe } from "lucide-react"
import { API_URL } from "@/lib/api"

export default function ContactPage() {
  const [contact, setContact] = useState({
    address: "2nd Floor Sai Look Complex, Labbipet, Vijayawada, Andhra Pradesh, India",
    phone: "+91 9014798141",
    email: "yashraj.transfer@gmail.com",
    whatsapp: "+91 9014798141",
    workingHours: "Monday - Saturday: 10:00 AM - 7:00 PM",
    googleMapsUrl: "https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`)
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setContact((prev) => ({
            ...prev,
            address: data.address || prev.address,
            phone: data.mobile || data.phone || prev.phone,
            email: data.email || prev.email,
            whatsapp: data.whatsapp || prev.whatsapp,
            workingHours: data.businessHours || data.workingHours || prev.workingHours,
            googleMapsUrl: data.googleMapsUrl || prev.googleMapsUrl,
          }))
        }
      }
    } catch (err) {
      console.warn("Failed to load contact info:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

      const res = await fetch(`${API_URL}/api/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          address: contact.address,
          mobile: contact.phone,
          email: contact.email,
          whatsapp: contact.whatsapp,
          businessHours: contact.workingHours,
          googleMapsUrl: contact.googleMapsUrl,
        }),
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Contact information & Google Maps link updated successfully!" })
        setIsEditing(false)
        setTimeout(() => setMessage({ type: "", text: "" }), 4000)
      } else {
        const errData = await res.json().catch(() => ({}))
        setMessage({ type: "error", text: errData.error || errData.message || "Failed to update contact info." })
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Contact Information Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Update address, contact numbers, hours, and Google Maps link to sync live with website & footer.
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
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Edit Contact Info"}
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

      {/* Contact Details Form */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 space-y-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-5 h-5 text-primary-600" />
          Contact Details & Maps Link
        </h3>

        <div className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <MapPin className="w-4 h-4 text-red-500" />
              Address
            </label>
            <textarea
              value={contact.address}
              onChange={(e) => setContact({ ...contact, address: e.target.value })}
              disabled={!isEditing}
              rows={3}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Phone className="w-4 h-4 text-primary-600" />
                Phone Number
              </label>
              <input
                type="text"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                <Phone className="w-4 h-4 text-green-600" />
                WhatsApp Number
              </label>
              <input
                type="text"
                value={contact.whatsapp}
                onChange={(e) => setContact({ ...contact, whatsapp: e.target.value })}
                disabled={!isEditing}
                className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Mail className="w-4 h-4 text-primary-600" />
              Email Address
            </label>
            <input
              type="email"
              value={contact.email}
              onChange={(e) => setContact({ ...contact, email: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Clock className="w-4 h-4 text-amber-500" />
              Working Hours
            </label>
            <input
              type="text"
              value={contact.workingHours}
              onChange={(e) => setContact({ ...contact, workingHours: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Globe className="w-4 h-4 text-blue-500" />
              Google Maps Location URL (Updates Contact Us & Footer Links Live)
            </label>
            <input
              type="url"
              value={contact.googleMapsUrl}
              onChange={(e) => setContact({ ...contact, googleMapsUrl: e.target.value })}
              disabled={!isEditing}
              className="w-full p-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all disabled:opacity-50"
              placeholder="https://maps.app.goo.gl/..."
            />
          </div>
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Frontend Live Preview</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
            <p className="text-slate-700 dark:text-slate-300">{contact.address}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <p className="text-slate-700 dark:text-slate-300">{contact.phone}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary-600 flex-shrink-0" />
            <p className="text-slate-700 dark:text-slate-300">{contact.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-slate-700 dark:text-slate-300">{contact.workingHours}</p>
          </div>
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-blue-500 flex-shrink-0" />
            <a href={contact.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline text-sm truncate">
              {contact.googleMapsUrl}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
