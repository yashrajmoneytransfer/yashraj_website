"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ToggleLeft, ToggleRight } from "lucide-react"

export default function ServicesPage() {
  const [services, setServices] = useState([
    { id: 1, title: "Travel Forex", description: "Best rates for travel currency exchange", icon: "Plane", isActive: true, order: 1 },
    { id: 2, title: "Student Forex", description: "Special rates for students studying abroad", icon: "GraduationCap", isActive: true, order: 2 },
    { id: 3, title: "Business Forex", description: "Corporate currency exchange solutions", icon: "Briefcase", isActive: true, order: 3 },
  ])

  const handleToggle = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ))
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Services Management</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors">
          <Plus className="w-5 h-5" />
          Add Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <button
                onClick={() => handleToggle(service.id)}
                className={`p-2 rounded-lg transition-colors ${
                  service.isActive 
                    ? "bg-green-100 dark:bg-green-900/30 text-green-600" 
                    : "bg-slate-100 dark:bg-slate-700 text-slate-400"
                }`}
              >
                {service.isActive ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
              </button>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{service.title}</h3>
            <p className="text-slate-600 dark:text-slate-400 mb-4">{service.description}</p>
            <div className="flex items-center gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors text-sm">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => handleDelete(service.id)}
                className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button className="bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500 transition-colors p-6 flex flex-col items-center justify-center gap-3 group min-h-[200px]">
          <Plus className="w-12 h-12 text-slate-400 group-hover:text-primary-500 transition-colors" />
          <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary-500 transition-colors">
            Add New Service
          </span>
        </button>
      </div>
    </div>
  )
}
