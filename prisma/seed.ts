import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialCountries = [
  { name: "United States", currencyCode: "USD", currencyName: "US Dollars", currencySymbol: "$", flag: "🇺🇸", buyRate: 91.75, sellRate: 101.10, isPopular: true, isoCode: "US", order: 1 },
  { name: "Euro Zone", currencyCode: "EUR", currencyName: "EURO", currencySymbol: "€", flag: "🇪🇺", buyRate: 104.80, sellRate: 115.70, isPopular: true, isoCode: "EU", order: 2 },
  { name: "United Kingdom", currencyCode: "GBP", currencyName: "Sterling Pound", currencySymbol: "£", flag: "🇬🇧", buyRate: 123.75, sellRate: 138.65, isPopular: true, isoCode: "GB", order: 3 },
  { name: "Australia", currencyCode: "AUD", currencyName: "Australian Dollars", currencySymbol: "A$", flag: "🇦🇺", buyRate: 64.70, sellRate: 71.95, isPopular: true, isoCode: "AU", order: 4 },
  { name: "Bahrain", currencyCode: "BHD", currencyName: "Bahrain Dinar", currencySymbol: "BD", flag: "🇧🇭", buyRate: 242.25, sellRate: 269.05, isPopular: false, isoCode: "BH", order: 5 },
  { name: "Canada", currencyCode: "CAD", currencyName: "Canadian Dollar", currencySymbol: "C$", flag: "🇨🇦", buyRate: 64.70, sellRate: 72.10, isPopular: true, isoCode: "CA", order: 6 },
  { name: "China", currencyCode: "CNY", currencyName: "Chinese Yuan", currencySymbol: "¥", flag: "🇨🇳", buyRate: 13.45, sellRate: 15.30, isPopular: false, isoCode: "CN", order: 7 },
  { name: "Denmark", currencyCode: "DKK", currencyName: "Danish Kroner", currencySymbol: "kr", flag: "🇩🇰", buyRate: 13.71, sellRate: 15.48, isPopular: false, isoCode: "DK", order: 8 },
  { name: "Hong Kong", currencyCode: "HKD", currencyName: "Hong Kong Dollar", currencySymbol: "HK$", flag: "🇭🇰", buyRate: 11.45, sellRate: 13.10, isPopular: false, isoCode: "HK", order: 9 },
  { name: "Japan", currencyCode: "JPY", currencyName: "Japanese Yen", currencySymbol: "¥", flag: "🇯🇵", buyRate: 0.5615, sellRate: 0.6560, isPopular: true, isoCode: "JP", order: 10 },
  { name: "South Korea", currencyCode: "KRW", currencyName: "Korean Won", currencySymbol: "₩", flag: "🇰🇷", buyRate: 0.0608, sellRate: 0.0686, isPopular: false, isoCode: "KR", order: 11 },
  { name: "Kuwait", currencyCode: "KWD", currencyName: "Kuwaiti Dinar", currencySymbol: "KD", flag: "🇰🇼", buyRate: 288.60, sellRate: 332.10, isPopular: true, isoCode: "KW", order: 12 },
  { name: "Malaysia", currencyCode: "MYR", currencyName: "Malaysian Ringgit", currencySymbol: "RM", flag: "🇲🇾", buyRate: 21.25, sellRate: 26.20, isPopular: false, isoCode: "MY", order: 13 },
  { name: "New Zealand", currencyCode: "NZD", currencyName: "New Zealand Dollar", currencySymbol: "NZ$", flag: "🇳🇿", buyRate: 52.60, sellRate: 59.10, isPopular: false, isoCode: "NZ", order: 14 },
  { name: "Norway", currencyCode: "NOK", currencyName: "Norwegian Kroner", currencySymbol: "kr", flag: "🇳🇴", buyRate: 9.30, sellRate: 10.50, isPopular: false, isoCode: "NO", order: 15 },
  { name: "Oman", currencyCode: "OMR", currencyName: "Omani Rial", currencySymbol: "OMR", flag: "🇴🇲", buyRate: 236.00, sellRate: 262.00, isPopular: false, isoCode: "OM", order: 16 },
  { name: "Qatar", currencyCode: "QAR", currencyName: "Qatari Rial", currencySymbol: "QR", flag: "🇶🇦", buyRate: 24.95, sellRate: 27.90, isPopular: false, isoCode: "QA", order: 17 },
  { name: "Saudi Arabia", currencyCode: "SAR", currencyName: "Saudi Arabian Rial", currencySymbol: "SR", flag: "🇸🇦", buyRate: 24.20, sellRate: 27.15, isPopular: true, isoCode: "SA", order: 18 },
  { name: "Singapore", currencyCode: "SGD", currencyName: "Singapore Dollar", currencySymbol: "S$", flag: "🇸🇬", buyRate: 69.40, sellRate: 78.85, isPopular: true, isoCode: "SG", order: 19 },
  { name: "South Africa", currencyCode: "ZAR", currencyName: "South African Rand", currencySymbol: "R", flag: "🇿🇦", buyRate: 5.20, sellRate: 6.05, isPopular: false, isoCode: "ZA", order: 20 },
  { name: "Sweden", currencyCode: "SEK", currencyName: "Swedish Kroner", currencySymbol: "kr", flag: "🇸🇪", buyRate: 9.25, sellRate: 10.65, isPopular: false, isoCode: "SE", order: 21 },
  { name: "Switzerland", currencyCode: "CHF", currencyName: "Swiss Franc", currencySymbol: "CHF", flag: "🇨🇭", buyRate: 113.25, sellRate: 126.75, isPopular: true, isoCode: "CH", order: 22 },
  { name: "Thailand", currencyCode: "THB", currencyName: "Thailand Baht", currencySymbol: "฿", flag: "🇹🇭", buyRate: 2.65, sellRate: 3.50, isPopular: false, isoCode: "TH", order: 23 },
  { name: "United Arab Emirates", currencyCode: "AED", currencyName: "UAE Dirham", currencySymbol: "AED", flag: "🇦🇪", buyRate: 24.85, sellRate: 27.45, isPopular: true, isoCode: "AE", order: 24 },
]

async function main() {
  console.log("Seeding country rates into PostgreSQL database...")

  for (const c of initialCountries) {
    const existing = await prisma.country.findFirst({
      where: { currencyCode: c.currencyCode },
    })

    if (existing) {
      await prisma.country.update({
        where: { id: existing.id },
        data: {
          buyRate: c.buyRate,
          sellRate: c.sellRate,
          name: c.name,
          currencyName: c.currencyName,
          currencySymbol: c.currencySymbol,
          flag: c.flag,
          isPopular: c.isPopular,
          isEnabled: true,
        },
      })
      console.log(`Updated ${c.currencyCode} (${c.name}): Buy ₹${c.buyRate}, Sell ₹${c.sellRate}`)
    } else {
      await prisma.country.create({
        data: {
          name: c.name,
          currencyCode: c.currencyCode,
          currencyName: c.currencyName,
          currencySymbol: c.currencySymbol,
          flag: c.flag,
          buyRate: c.buyRate,
          sellRate: c.sellRate,
          isPopular: c.isPopular,
          isEnabled: true,
          isoCode: c.isoCode,
          order: c.order,
        },
      })
      console.log(`Created ${c.currencyCode} (${c.name}): Buy ₹${c.buyRate}, Sell ₹${c.sellRate}`)
    }
  }

  console.log("Country rates seeding completed successfully!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
