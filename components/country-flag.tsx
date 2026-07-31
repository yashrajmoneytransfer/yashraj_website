import React from "react"

const currencyToCountryMap: Record<string, string> = {
  INR: "in",
  USD: "us",
  EUR: "eu",
  GBP: "gb",
  AED: "ae",
  AUD: "au",
  CAD: "ca",
  JPY: "jp",
  SGD: "sg",
  CHF: "ch",
  SAR: "sa",
  NZD: "nz",
  THB: "th",
  MYR: "my",
  CNY: "cn",
  HKD: "hk",
  KWD: "kw",
  QAR: "qa",
  OMR: "om",
  BHD: "bh",
  NOK: "no",
  SEK: "se",
  DKK: "dk",
  ZAR: "za",
  PHP: "ph",
  IDR: "id",
  KRW: "kr",
  TRY: "tr",
  RUB: "ru",
  BND: "bn",
  FJD: "fj",
  MUR: "mu",
  EGP: "eg",
  NGN: "ng",
  NPR: "np",
  LKR: "lk",
  BDT: "bd",
  PKR: "pk",
  VND: "vn",
}

interface CountryFlagProps {
  code?: string
  flag?: string
  className?: string
  size?: "sm" | "md" | "lg" | "xl"
}

export function CountryFlag({
  code = "",
  flag = "🌐",
  className = "",
  size = "md",
}: CountryFlagProps) {
  const cleanCode = code.toUpperCase().trim()
  const countryIso =
    currencyToCountryMap[cleanCode] ||
    (cleanCode.length === 2 ? cleanCode.toLowerCase() : "")

  const sizeClasses = {
    sm: "w-5 h-3.5",
    md: "w-7 h-5",
    lg: "w-9 h-6",
    xl: "w-11 h-8",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  }

  if (countryIso) {
    const flagUrl = `https://flagcdn.com/w80/${countryIso}.png`
    return (
      <span className="inline-flex items-center justify-center shrink-0 align-middle">
        <img
          src={flagUrl}
          alt={`${code} flag`}
          className={`object-cover rounded shadow-sm border border-slate-200/50 dark:border-slate-700/60 ${sizeClasses[size]} ${className}`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.style.display = "none"
            const nextEl = e.currentTarget.nextElementSibling as HTMLElement
            if (nextEl) nextEl.style.display = "inline"
          }}
        />
        <span className={`hidden ${textSizes[size]}`}>{flag}</span>
      </span>
    )
  }

  return <span className={`inline-block ${textSizes[size]} ${className}`}>{flag}</span>
}
