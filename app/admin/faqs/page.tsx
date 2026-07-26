"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight, X } from "lucide-react"

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    { id: 1, question: "What documents do I need for currency exchange?", answer: "You need a valid ID proof (Aadhaar, PAN, or Passport) and address proof for transactions above ₹50,000.", category: "General", order: 1, isActive: true },
    { id: 2, question: "How long does it take to process a forex request?", answer: "Most requests are processed within 30 minutes during business hours.", category: "Process", order: 2, isActive: true },
    { id: 3, question: "Do you offer better rates for bulk transactions?", answer: "Yes, we offer special rates for transactions above ₹1 lakh. Contact us for a quote.", category: "Rates", order: 3, isActive: true },
  ])
  
  const [categories] = useState(["General", "Process", "Rates", "Documents", "Payments"])
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Modal & Form state setup
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General"
  })

  const filteredFaqs = selectedCategory === "all" 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const handleToggleActive = (id: number) => {
    setFaqs(faqs.map(faq => 
      faq.id === id ? { ...faq, isActive: !faq.isActive } : faq
    ))
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(faq => faq.id !== id))
    }
  }

  // Edit action trigger
  const handleEditClick = (faq: FAQ) => {
    setEditingFaq(faq)
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category
    })
    setIsModalOpen(true)
  }

  // Add action trigger
  const handleAddClick = () => {
    setEditingFaq(null)
    setFormData({ question: "", answer: "", category: "General" })
    setIsModalOpen(true)
  }

  // Save changes (Create or Update)
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingFaq) {
      setFaqs(faqs.map(item => item.id === editingFaq.id ? { ...item, ...formData } : item))
    } else {
      const newFaq: FAQ = {
        id: Date.now(),
        ...formData,
        order: faqs.length + 1,
        isActive: true
      }
      setFaqs([...faqs, newFaq])
    }
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">FAQs Management</h1>
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add FAQ
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === "all"
              ? "bg-primary-600 text-white"
              : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category
                ? "bg-primary-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQs List */}
      <div className="space-y-4">
        {filteredFaqs.map((faq) => (
          <div key={faq.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs rounded-full">
                    {faq.category}
                  </span>
                  {!faq.isActive && (
                    <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-500 text-xs rounded-full">
                      Hidden
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => handleToggleActive(faq.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    faq.isActive 
                      ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                      : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                  }`}
                >
                  {faq.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                </button>
                
                {/* Fixed Edit Button */}
                <button 
                  onClick={() => handleEditClick(faq)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>

                <button
                  onClick={() => handleDelete(faq.id)}
                  className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Dialog Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {editingFaq ? "Edit FAQ" : "Add FAQ"}
              </h2>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={e => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border rounded-lg p-2 dark:bg-slate-700 dark:border-slate-600"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Question</label>
                <input 
                  type="text"
                  required
                  value={formData.question}
                  onChange={e => setFormData({ ...formData, question: e.target.value })}
                  className="w-full border rounded-lg p-2 dark:bg-slate-700 dark:border-slate-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Answer</label>
                <textarea 
                  required
                  rows={3}
                  value={formData.answer}
                  onChange={e => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full border rounded-lg p-2 dark:bg-slate-700 dark:border-slate-600"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border dark:border-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}