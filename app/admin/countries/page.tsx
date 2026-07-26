"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash2, Globe, ToggleLeft, ToggleRight, Save, X, Loader2, CheckCircle2 } from "lucide-react"
import { API_URL } from "@/lib/api"

interface Country {
  id: string
  name: string
  code: string
  currency: string
  currencyName?: string
  flag: string
  buyRate: number
  sellRate: number
  isPopular: boolean
  isEnabled: boolean
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editData, setEditData] = useState({ buyRate: 0, sellRate: 0 })
  const [savingId, setSavingId] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: "success" | "error" | ""; text: string }>({ type: "", text: "" })

  // Add Country Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [addFormData, setAddFormData] = useState({
    name: "",
    currencyCode: "",
    currencyName: "",
    flag: "🌐",
    buyRate: 1,
    sellRate: 1,
    isPopular: false,
    isEnabled: true,
  })
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      setLoading(true)
      const res = await fetch(`${API_URL}/api/countries?all=true`)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) {
          const mapped: Country[] = data.map((c: any) => ({
            id: c.id,
            name: c.name,
            code: c.isoCode || c.code || c.currencyCode,
            currency: c.currencyCode || c.currency || "USD",
            currencyName: c.currencyName || c.name,
            flag: c.flag || "🌐",
            buyRate: Number(c.buyRate || 0),
            sellRate: Number(c.sellRate || 0),
            isPopular: Boolean(c.isPopular),
            isEnabled: Boolean(c.isEnabled),
          }))
          setCountries(mapped)
        }
      }
    } catch (err) {
      console.error("Failed to fetch countries:", err)
      setMessage({ type: "error", text: "Failed to load countries from database." })
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (country: Country) => {
    setEditingId(country.id)
    setEditData({ buyRate: country.buyRate, sellRate: country.sellRate })
  }

  const handleCancel = () => {
    setEditingId(null)
    setEditData({ buyRate: 0, sellRate: 0 })
  }

  const getToken = () => (typeof window !== "undefined" ? localStorage.getItem("token") : null)

  const handleSaveRate = async (id: string) => {
    setSavingId(id)
    setMessage({ type: "", text: "" })
    try {
      const token = getToken()
      const res = await fetch(`${API_URL}/api/countries/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          buyRate: Number(editData.buyRate),
          sellRate: Number(editData.sellRate),
        }),
      })

      if (res.ok) {
        setCountries((prev) =>
          prev.map((c) =>
            c.id === id ? { ...c, buyRate: Number(editData.buyRate), sellRate: Number(editData.sellRate) } : c
          )
        )
        setEditingId(null)
        setMessage({ type: "success", text: "Currency rates updated & live on homepage!" })
        setTimeout(() => setMessage({ type: "", text: "" }), 3000)
      } else {
        setMessage({ type: "error", text: "Failed to update rates in database." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error updating rates." })
    } finally {
      setSavingId(null)
    }
  }

  const handleTogglePopular = async (country: Country) => {
    const updatedStatus = !country.isPopular
    setCountries((prev) => prev.map((c) => (c.id === country.id ? { ...c, isPopular: updatedStatus } : c)))
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/countries/${country.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ isPopular: updatedStatus }),
      })
    } catch (err) {
      console.error("Failed to toggle popular:", err)
    }
  }

  const handleToggleEnabled = async (country: Country) => {
    const updatedStatus = !country.isEnabled
    setCountries((prev) => prev.map((c) => (c.id === country.id ? { ...c, isEnabled: updatedStatus } : c)))
    try {
      const token = getToken()
      await fetch(`${API_URL}/api/countries/${country.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({ isEnabled: updatedStatus }),
      })
    } catch (err) {
      console.error("Failed to toggle enabled:", err)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this country?")) return
    try {
      const token = getToken()
      const res = await fetch(`${API_URL}/api/countries/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      if (res.ok) {
        setCountries((prev) => prev.filter((c) => c.id !== id))
        setMessage({ type: "success", text: "Country deleted successfully." })
        setTimeout(() => setMessage({ type: "", text: "" }), 3000)
      }
    } catch (err) {
      setMessage({ type: "error", text: "Failed to delete country." })
    }
  }

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsAdding(true)
    setMessage({ type: "", text: "" })

    try {
      const token = getToken()
      const res = await fetch(`${API_URL}/api/countries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify({
          name: addFormData.name,
          currencyCode: addFormData.currencyCode.toUpperCase(),
          currencyName: addFormData.currencyName || addFormData.name,
          flag: addFormData.flag,
          buyRate: Number(addFormData.buyRate),
          sellRate: Number(addFormData.sellRate),
          isPopular: addFormData.isPopular,
          isEnabled: addFormData.isEnabled,
          isoCode: addFormData.currencyCode.substring(0, 2).toUpperCase(),
        }),
      })

      if (res.ok) {
        const newCountry = await res.json()
        setMessage({ type: "success", text: `${addFormData.name} added successfully & active live!` })
        setIsAddModalOpen(false)
        setAddFormData({
          name: "",
          currencyCode: "",
          currencyName: "",
          flag: "🌐",
          buyRate: 1,
          sellRate: 1,
          isPopular: false,
          isEnabled: true,
        })
        fetchCountries()
        setTimeout(() => setMessage({ type: "", text: "" }), 3000)
      } else {
        setMessage({ type: "error", text: "Failed to add country to database." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error adding country." })
    } finally {
      setIsAdding(false)
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
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Countries & Currencies</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage live currency exchange rates, active countries, and popular status for frontend tickers & calculator.
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Add Country
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Currencies</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{countries.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Popular</div>
          <div className="text-3xl font-bold text-gold-600">{countries.filter((c) => c.isPopular).length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active</div>
          <div className="text-3xl font-bold text-green-600">{countries.filter((c) => c.isEnabled).length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Status</div>
          <div className="text-xl font-bold text-green-600 flex items-center gap-1.5 mt-1">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse" />
            Live Sync Active
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Country</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Currency</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Buy Rate (₹)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Sell Rate (₹)</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Popular</th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
            {countries.map((country) => (
              <tr key={country.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-white">{country.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{country.currencyName || country.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{country.currency}</td>
                <td className="px-6 py-4">
                  {editingId === country.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editData.buyRate}
                      onChange={(e) => setEditData({ ...editData, buyRate: parseFloat(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
                    />
                  ) : (
                    <span className="text-green-600 font-medium">₹{country.buyRate.toFixed(2)}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {editingId === country.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editData.sellRate}
                      onChange={(e) => setEditData({ ...editData, sellRate: parseFloat(e.target.value) || 0 })}
                      className="w-24 px-2 py-1 border border-slate-300 dark:border-slate-600 rounded bg-white dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
                    />
                  ) : (
                    <span className="text-red-600 font-medium">₹{country.sellRate.toFixed(2)}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleToggleEnabled(country)}
                    className={`p-2 rounded-lg transition-colors ${
                      country.isEnabled
                        ? "bg-green-100 dark:bg-green-900/30 text-green-600"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                    }`}
                    title={country.isEnabled ? "Click to Disable" : "Click to Enable"}
                  >
                    {country.isEnabled ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleTogglePopular(country)}
                    className={`p-2 rounded-lg transition-colors ${
                      country.isPopular
                        ? "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                        : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                    }`}
                    title={country.isPopular ? "Marked Popular" : "Click to Mark Popular"}
                  >
                    <Globe className="w-5 h-5" />
                  </button>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {editingId === country.id ? (
                      <>
                        <button
                          onClick={() => handleSaveRate(country.id)}
                          disabled={savingId === country.id}
                          className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center justify-center"
                        >
                          {savingId === country.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="p-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(country)}
                          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
                          <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(country.id)}
                          className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Country Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Add New Country & Currency</h2>
              <button onClick={() => setIsAddModalOpen(false)}>
                <X className="w-5 h-5 text-slate-500 hover:text-slate-700 dark:hover:text-white" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Country Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. United States"
                  value={addFormData.name}
                  onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
                  className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Currency Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. USD"
                    value={addFormData.currencyCode}
                    onChange={(e) => setAddFormData({ ...addFormData, currencyCode: e.target.value })}
                    className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Flag Emoji</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 🇺🇸"
                    value={addFormData.flag}
                    onChange={(e) => setAddFormData({ ...addFormData, flag: e.target.value })}
                    className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white text-center text-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Buy Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={addFormData.buyRate}
                    onChange={(e) => setAddFormData({ ...addFormData, buyRate: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Sell Rate (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={addFormData.sellRate}
                    onChange={(e) => setAddFormData({ ...addFormData, sellRate: parseFloat(e.target.value) || 0 })}
                    className="w-full p-3 border border-slate-200 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-700 text-slate-900 dark:text-white font-semibold"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isAdding}
                  className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-sm"
                >
                  {isAdding && <Loader2 className="w-4 h-4 animate-spin" />}
                  {isAdding ? "Saving..." : "Add Country"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
