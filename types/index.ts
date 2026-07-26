export interface Country {
  id: string
  name: string
  currencyName: string
  currencyCode: string
  currencySymbol: string
  isoCode: string
  flag?: string
  buyRate: number
  sellRate: number
  isPopular: boolean
  isEnabled: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface QuoteRequest {
  id: string
  name: string
  mobile: string
  email: string
  city: string
  country: string
  purpose: string
  currency: string
  amount: number
  message?: string
  preferredContact: string
  agreedToContact: boolean
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Gallery {
  id: string
  title: string
  description?: string
  imageUrl: string
  category: string
  order: number
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  name: string
  email: string
  rating: number
  review: string
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  imageUrl?: string
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface WebsiteSettings {
  id: string
  companyName: string
  phone: string
  email: string
  address: string
  whatsapp: string
  businessHours?: string
  logo?: string
  heroTitle: string
  heroSubtitle: string
  aboutContent?: string
  socialLinks?: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface SEO {
  id: string
  metaTitle: string
  metaDescription: string
  keywords?: string
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  twitterCard?: string
  canonicalUrl?: string
  robotsTxt?: string
  createdAt: Date
  updatedAt: Date
}
