import type { Metadata } from "next"
import { Inter, Poppins, Manrope } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins" 
})
const manrope = Manrope({ 
  subsets: ["latin"], 
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope" 
})

export const metadata: Metadata = {
  title: "YashRaj Money Transfer | Trusted Foreign Exchange Services in Vijayawada",
  description: "Best foreign exchange services in Vijayawada. Currency exchange, travel forex, student forex, and business currency solutions with competitive rates.",
  keywords: "forex, currency exchange, foreign exchange, Vijayawada, travel forex, student forex, money transfer",
  authors: [{ name: "YashRaj Money Transfer" }],
  openGraph: {
    title: "YashRaj Money Transfer | Trusted Foreign Exchange Services",
    description: "Best foreign exchange services in Vijayawada with competitive rates.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "YashRaj Money Transfer",
    description: "Trusted Foreign Exchange Services in Vijayawada",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "YashRaj Money Transfer",
    "description": "Trusted foreign exchange services in Vijayawada since 1900",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2nd Floor Sai Look Complex, Labbipet",
      "addressLocality": "Vijayawada",
      "addressRegion": "Andhra Pradesh",
      "postalCode": "520010",
      "addressCountry": "IN"
    },
    "telephone": "+91 9014798141",
    "email": "yashraj.transfer@gmail.com",
    "openingHours": "Mo-Sa 10:00-19:00",
    "priceRange": "₹₹",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "156"
    }
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${poppins.variable} ${manrope.variable} font-sans antialiased w-full max-w-full overflow-x-hidden relative`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  )
}
