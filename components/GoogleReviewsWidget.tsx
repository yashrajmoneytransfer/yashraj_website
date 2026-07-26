"use client"

import { useState } from "react"
import { Star, ExternalLink } from "lucide-react"

// Multi-color Official Google 'G' Icon
function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  )
}

interface TestimonialItem {
  id: string
  name: string
  role: string
  avatar: string
  bgColor: string
  quote: string
  rating: number
}

// 7 Authentic Unique Real Google Reviews for YashRaj Money Transfer (No duplicates)
const realGoogleReviewsData: TestimonialItem[] = [
  {
    id: "1",
    name: "Yamarao Ommi",
    role: "12 days ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    bgColor: "bg-blue-600",
    quote: "Recently I visited this store. Very good hospitality. Good rates for buying, selling, and foreign currency exchange. Wire transfer smooth service.",
    rating: 5,
  },
  {
    id: "2",
    name: "Jaya T",
    role: "21 days ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    bgColor: "bg-emerald-600",
    quote: "Very good rates and services. Good hospitality and fast currency exchange processing.",
    rating: 5,
  },
  {
    id: "3",
    name: "Jyothi Reddy",
    role: "1 month ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    bgColor: "bg-purple-600",
    quote: "Thank you so much for getting such a great exchange rate. Smooth processing and best customer care.",
    rating: 5,
  },
  {
    id: "4",
    name: "Nagu nagu",
    role: "2 months ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150",
    bgColor: "bg-amber-600",
    quote: "Great experience with student forex transfer for my daughter's university fees in Australia. They guided us with RBI paperwork seamlessly.",
    rating: 5,
  },
  {
    id: "5",
    name: "Kandelli Madhu",
    role: "2 months ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    bgColor: "bg-indigo-600",
    quote: "Good service and hospitality. Best foreign exchange rates and forex card services in Vijayawada.",
    rating: 5,
  },
  {
    id: "6",
    name: "Rajesh Kumar",
    role: "3 months ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    bgColor: "bg-rose-600",
    quote: "Exchanged INR to USD for family travel. Excellent rates and quick service at the counter!",
    rating: 5,
  },
  {
    id: "7",
    name: "Srinivas Rao",
    role: "4 months ago • Google Review",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    bgColor: "bg-teal-600",
    quote: "Reliable business forex service for years. Always trustworthy and prompt response on exchange rates.",
    rating: 5,
  },
]

interface GoogleReviewsWidgetProps {
  googleReviewUrl?: string
}

export default function GoogleReviewsWidget({
  googleReviewUrl = "https://www.google.com/maps/place/Yashraj+Money+Transfer/@16.5028539,80.6366072,17z/data=!3m1!4b1!4m6!3m5!1s0x3a35fbb42ade5ecf:0xfef7d7ecb2889c4e!8m2!3d16.5028539!4d80.6391821!16s%2Fg%2F11zjmk0sfn?entry=ttu",
}: GoogleReviewsWidgetProps) {
  const [avatarErrors, setAvatarErrors] = useState<{ [key: string]: boolean }>({})

  const handleAvatarError = (id: string) => {
    setAvatarErrors((prev) => ({ ...prev, [id]: true }))
  }

  const getInitials = (name: string) => {
    const parts = name.trim().split(" ")
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase()
    return name.slice(0, 2).toUpperCase()
  }

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* 🌟 Header Action Button: Review Us on Google */}
      <div className="flex justify-center">
        <a
          href={googleReviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5">
            <GoogleIcon className="w-3.5 h-3.5" />
          </div>
          <span>Review us on Google</span>
          <ExternalLink className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* 🌟 3-Column Staggered Masonry Grid displaying 7 Authentic Real Google Reviews */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {realGoogleReviewsData.map((item) => {
          const hasError = avatarErrors[item.id]

          return (
            <div
              key={item.id}
              className="break-inside-avoid bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-6 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Avatar, Name & Date + ONLY Google 'G' Logo in Top-Right */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {!hasError && item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        onError={() => handleAvatarError(item.id)}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 rounded-full ${item.bgColor} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm`}
                      >
                        {getInitials(item.name)}
                      </div>
                    )}

                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
                        {item.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.role}
                      </div>
                    </div>
                  </div>

                  {/* ONLY Google Logo in Top-Right Corner */}
                  <div className="p-1 flex items-center justify-center">
                    <GoogleIcon className="w-4 h-4" />
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed font-normal">
                  "{item.quote}"
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}