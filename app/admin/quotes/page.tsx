"use client"

export const dynamic = "force-dynamic"

import { useState, useEffect, useCallback } from "react"
import { Eye, Trash2, X } from "lucide-react"

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [selectedQuote, setSelectedQuote] = useState<any | null>(null) // Modal Details
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const fetchQuotes = useCallback(async () => {
    try {
      setLoading(true)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.31.36:5000"
      
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("token") || localStorage.getItem("adminToken") 
        : ""

      const res = await fetch(`${apiUrl}/api/quotes`, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      })

      if (res.status === 401 || res.status === 403) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("adminToken")
          window.location.href = "/admin/login"
        }
        return
      }

      if (!res.ok) throw new Error(`Failed to fetch quotes`)

      const data = await res.json()
      if (Array.isArray(data)) setQuotes(data)
      else if (data && Array.isArray(data.quotes)) setQuotes(data.quotes)
      else setQuotes([])
    } catch (error) {
      console.error("Error fetching quotes:", error)
      setQuotes([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchQuotes()
  }, [fetchQuotes])

  // Auto-open modal and highlight target quote row if ?id=... is present in URL
  useEffect(() => {
    if (typeof window !== "undefined" && quotes.length > 0) {
      const urlParams = new URLSearchParams(window.location.search)
      const targetId = urlParams.get("id")

      if (targetId) {
        setHighlightedId(targetId)
        const found = quotes.find((q) => (q.id || q._id) === targetId)

        if (found) {
          setSelectedQuote(found)
          setTimeout(() => {
            const el = document.getElementById(`quote-row-${targetId}`)
            if (el) {
              el.scrollIntoView({ behavior: "smooth", block: "center" })
            }
          }, 300)
        }
      }
    }
  }, [quotes])

  // Status Change API Request
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.31.36:5000"
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("token") || localStorage.getItem("adminToken") 
        : ""

      const res = await fetch(`${apiUrl}/api/quotes/${id}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setQuotes((prev) =>
          prev.map((q) => ((q.id || q._id) === id ? { ...q, status: newStatus } : q))
        )
        if (selectedQuote && (selectedQuote.id || selectedQuote._id) === id) {
          setSelectedQuote({ ...selectedQuote, status: newStatus })
        }
      } else {
        alert("Failed to update status")
      }
    } catch (err) {
      console.error("Error updating status:", err)
    }
  }

  // Delete Quote
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this quote request?")) return

    try {
      setDeletingId(id)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.31.36:5000"
      const token = typeof window !== "undefined" 
        ? localStorage.getItem("token") || localStorage.getItem("adminToken") 
        : ""

      const res = await fetch(`${apiUrl}/api/quotes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      })

      if (res.ok) {
        setQuotes((prev) => prev.filter((q) => (q.id || q._id) !== id))
        if (selectedQuote && (selectedQuote.id || selectedQuote._id) === id) {
          setSelectedQuote(null)
        }
      } else {
        alert("Failed to delete quote.")
      }
    } catch (error) {
      console.error("Error deleting quote:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const safeQuotes = Array.isArray(quotes) ? quotes : []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          Quote Requests
        </h1>
        <button
          onClick={fetchQuotes}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Details & Source</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Amount</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900 dark:text-white">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-900 dark:text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">Loading quotes...</td></tr>
              ) : safeQuotes.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-500">No quotes found.</td></tr>
              ) : (
                safeQuotes.map((quote: any, index: number) => {
                  const quoteId = quote.id || quote._id
                  const statusStr = quote.status || "pending"
                  const isDeleting = deletingId === quoteId
                  const isHighlighted = highlightedId === quoteId

                  return (
                    <tr
                      id={`quote-row-${quoteId}`}
                      key={quoteId || index}
                      className={`transition-colors duration-300 ${
                        isHighlighted
                          ? "bg-blue-50/90 dark:bg-blue-950/40 ring-2 ring-blue-500/80"
                          : "hover:bg-slate-50 dark:hover:bg-slate-700/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-white">{quote.name || "N/A"}</div>
                        <div className="text-sm text-slate-500">{quote.email || "N/A"}</div>
                        <div className="text-sm text-slate-500">{quote.mobile || quote.phone || "N/A"}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-900 dark:text-white">
                        <div>
                          {quote.fromCurrency || "INR"} → {quote.toCurrency || quote.currency || "USD"}
                        </div>
                        {/* 💡 Calculator Quote & Direct Form తేడా Badge */}
                        {quote.conversionType ? (
                          <span className="inline-block mt-1 text-[11px] font-semibold bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 px-2 py-0.5 rounded">
                            Calc: {quote.conversionType.toUpperCase()}
                          </span>
                        ) : (
                          <span className="inline-block mt-1 text-[11px] font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 px-2 py-0.5 rounded">
                            Direct Form
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                        ₹{Number(quote.amount || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {/* 💡 Admin Status ని మార్చడానికి Dropdown */}
                        <select
                          value={statusStr.toLowerCase()}
                          onChange={(e) => handleStatusChange(quoteId, e.target.value)}
                          className="text-xs font-semibold px-2 py-1 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="completed">Completed</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                        {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedQuote(quote)}
                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                          </button>

                          <button
                            onClick={() => handleDelete(quoteId)}
                            disabled={isDeleting}
                            className="p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                            title="Delete Quote"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 💡 View Details Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl border border-slate-200 dark:border-slate-700">
            <div className="flex justify-between items-center border-b pb-3 border-slate-200 dark:border-slate-700">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Quote Details</h2>
              <button onClick={() => setSelectedQuote(null)} className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <p><strong>Name:</strong> {selectedQuote.name}</p>
              <p><strong>Email:</strong> {selectedQuote.email}</p>
              <p><strong>Mobile:</strong> {selectedQuote.mobile || selectedQuote.phone}</p>
              <p><strong>Amount:</strong> ₹{Number(selectedQuote.amount || 0).toLocaleString()}</p>
              <p><strong>Currency Pair:</strong> {selectedQuote.fromCurrency || "INR"} → {selectedQuote.toCurrency || selectedQuote.currency}</p>
              <p><strong>Source:</strong> {selectedQuote.conversionType ? `Calculator (${selectedQuote.conversionType})` : "General Form"}</p>
              {selectedQuote.purpose && <p><strong>Purpose:</strong> {selectedQuote.purpose}</p>}
              <p><strong>Status:</strong> <span className="capitalize font-semibold text-blue-600">{selectedQuote.status}</span></p>
              <p><strong>Date:</strong> {selectedQuote.createdAt ? new Date(selectedQuote.createdAt).toLocaleString() : "N/A"}</p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 flex justify-end">
              <button
                onClick={() => setSelectedQuote(null)}
                className="px-4 py-2 bg-slate-200 dark:bg-slate-700 rounded-lg text-sm font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}