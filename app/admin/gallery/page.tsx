"use client"

import { useState, useRef } from "react"
import { Edit, Trash2, Upload, Image as ImageIcon, Folder, GripVertical, X, RefreshCw } from "lucide-react"

interface GalleryItem {
  id: number
  title: string
  category: string
  imageUrl: string
  order: number
}

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([
    { id: 1, title: "Office Interior", category: "Office", imageUrl: "/placeholder.jpg", order: 1 },
    { id: 2, title: "Customer Service", category: "Team", imageUrl: "/placeholder.jpg", order: 2 },
    { id: 3, title: "Currency Exchange", category: "Services", imageUrl: "/placeholder.jpg", order: 3 },
  ])
  const [categories] = useState(["Office", "Team", "Services", "Events", "Products"])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isUploading, setIsUploading] = useState(false)

  // Edit Modal States
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editCategory, setEditCategory] = useState("")
  const [editImageFile, setEditImageFile] = useState<File | null>(null)
  const [editImagePreview, setEditImagePreview] = useState<string>("")

  // File Input Refs
  const fileInputRef = useRef<HTMLInputElement>(null)
  const replaceFileInputRef = useRef<HTMLInputElement>(null)

  const filteredItems = selectedCategory === "all" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory)

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this image?")) {
      setGalleryItems(galleryItems.filter(item => item.id !== id))
    }
  }

  // File picker trigger
  const triggerFileSelect = () => {
    fileInputRef.current?.click()
  }

  // Open Edit Modal
  const handleEditClick = (item: GalleryItem) => {
    setEditingItem(item)
    setEditTitle(item.title)
    setEditCategory(item.category)
    setEditImagePreview(item.imageUrl)
    setEditImageFile(null)
  }

  // Handle image replacement in edit modal
  const handleReplaceImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setEditImageFile(file)
      setEditImagePreview(URL.createObjectURL(file))
    }
  }

  // Save Edits
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingItem) return

    // State update locally
    setGalleryItems(prev => prev.map(item => {
      if (item.id === editingItem.id) {
        return {
          ...item,
          title: editTitle,
          category: editCategory,
          imageUrl: editImagePreview
        }
      }
      return item
    }))

    // Reset Modal
    setEditingItem(null)
  }

  // File Change & Upload Handling (New Upload)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)
      formData.append("title", file.name.split('.')[0] || "Gallery Image")
      formData.append("category", selectedCategory === "all" ? "Office" : selectedCategory)

      const token = localStorage.getItem("token")

      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        setGalleryItems(prev => [...prev, data.gallery])
      } else {
        alert(data.error || "Upload failed")
      }
    } catch (error) {
      console.error(error)
      alert("Upload failed")
    } finally {
      setIsUploading(false)
      if (e.target) e.target.value = "" 
    }
  }

  return (
    <div className="space-y-6">
      {/* Hidden File Inputs */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={replaceFileInputRef}
        onChange={handleReplaceImageSelect}
        accept="image/*"
        className="hidden"
      />

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Gallery Management</h1>
        
        <button 
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors disabled:opacity-50"
        >
          <Upload className="w-5 h-5" />
          {isUploading ? "Uploading..." : "Upload Image"}
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
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
              selectedCategory === category
                ? "bg-primary-600 text-white"
                : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600"
            }`}
          >
            <Folder className="w-4 h-4" />
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden group">
            <div className="relative aspect-square bg-slate-100 dark:bg-slate-700">
              <div className="absolute inset-0 flex items-center justify-center">
                <ImageIcon className="w-12 h-12 text-slate-400" />
              </div>
              <div className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-xs rounded-full">
                {item.category}
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white/90 dark:bg-slate-800/90 rounded-lg hover:bg-white dark:hover:bg-slate-800">
                  <GripVertical className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <div className="flex items-center gap-2">
                
                {/* FIXED: Edit button with onClick event */}
                <button 
                  onClick={() => handleEditClick(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Upload Card */}
        <button
          onClick={triggerFileSelect}
          disabled={isUploading}
          className="bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-primary-500 dark:hover:border-primary-500 transition-colors aspect-square flex flex-col items-center justify-center gap-3 group disabled:opacity-50"
        >
          {isUploading ? (
            <div className="text-slate-500">Uploading...</div>
          ) : (
            <>
              <Upload className="w-12 h-12 text-slate-400 group-hover:text-primary-500 transition-colors" />
              <span className="text-slate-600 dark:text-slate-400 group-hover:text-primary-500 transition-colors">
                Upload New Image
              </span>
            </>
          )}
        </button>
      </div>

      {/* Edit Image Modal (Crop / Change Image / Title / Remove options) */}
      {editingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-md w-full p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Edit Image Details</h2>
              <button onClick={() => setEditingItem(null)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Image Preview & Replace Options */}
            <div className="space-y-2">
              <label className="block text-sm font-medium">Image Preview</label>
              <div className="relative aspect-video bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center border">
                <ImageIcon className="w-10 h-10 text-slate-400" />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => replaceFileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-xs font-medium rounded-lg"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Replace Image
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleDelete(editingItem.id)
                    setEditingItem(null)
                  }}
                  className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 text-xs font-medium rounded-lg"
                >
                  Remove
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input 
                  type="text"
                  required
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-slate-700 dark:border-slate-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select 
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                  className="w-full border rounded-lg p-2 dark:bg-slate-700 dark:border-slate-600 text-sm"
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button 
                  type="button" 
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-sm rounded-lg border dark:border-slate-600"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Update Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Total Images</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{galleryItems.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Categories</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">{categories.length}</div>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Storage Used</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">~15 MB</div>
        </div>
      </div>
    </div>
  )
}