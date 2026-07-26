import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest, authorizeAdmin } from '../middleware/auth'

const router = Router()

const fallbackCountries = [
  { id: "usd", name: "United States", currencyCode: "USD", currencyName: "US Dollars", currencySymbol: "$", flag: "🇺🇸", buyRate: 91.75, sellRate: 101.10, isPopular: true, isEnabled: true, isoCode: "US", order: 1 },
  { id: "eur", name: "Euro Zone", currencyCode: "EUR", currencyName: "EURO", currencySymbol: "€", flag: "🇪🇺", buyRate: 104.80, sellRate: 115.70, isPopular: true, isEnabled: true, isoCode: "EU", order: 2 },
  { id: "gbp", name: "United Kingdom", currencyCode: "GBP", currencyName: "Sterling Pound", currencySymbol: "£", flag: "🇬🇧", buyRate: 123.75, sellRate: 138.65, isPopular: true, isEnabled: true, isoCode: "GB", order: 3 },
  { id: "aud", name: "Australia", currencyCode: "AUD", currencyName: "Australian Dollars", currencySymbol: "A$", flag: "🇦🇺", buyRate: 64.70, sellRate: 71.95, isPopular: true, isEnabled: true, isoCode: "AU", order: 4 },
  { id: "bhd", name: "Bahrain", currencyCode: "BHD", currencyName: "Bahrain Dinar", currencySymbol: "BD", flag: "🇧🇭", buyRate: 242.25, sellRate: 269.05, isPopular: false, isEnabled: true, isoCode: "BH", order: 5 },
  { id: "cad", name: "Canada", currencyCode: "CAD", currencyName: "Canadian Dollar", currencySymbol: "C$", flag: "🇨🇦", buyRate: 64.70, sellRate: 72.10, isPopular: true, isEnabled: true, isoCode: "CA", order: 6 },
  { id: "cny", name: "China", currencyCode: "CNY", currencyName: "Chinese Yuan", currencySymbol: "¥", flag: "🇨🇳", buyRate: 13.45, sellRate: 15.30, isPopular: false, isEnabled: true, isoCode: "CN", order: 7 },
  { id: "dkk", name: "Denmark", currencyCode: "DKK", currencyName: "Danish Kroner", currencySymbol: "kr", flag: "🇩🇰", buyRate: 13.71, sellRate: 15.48, isPopular: false, isEnabled: true, isoCode: "DK", order: 8 },
  { id: "hkd", name: "Hong Kong", currencyCode: "HKD", currencyName: "Hong Kong Dollar", currencySymbol: "HK$", flag: "🇭🇰", buyRate: 11.45, sellRate: 13.10, isPopular: false, isEnabled: true, isoCode: "HK", order: 9 },
  { id: "jpy", name: "Japan", currencyCode: "JPY", currencyName: "Japanese Yen", currencySymbol: "¥", flag: "🇯🇵", buyRate: 0.5615, sellRate: 0.6560, isPopular: true, isEnabled: true, isoCode: "JP", order: 10 },
  { id: "krw", name: "South Korea", currencyCode: "KRW", currencyName: "Korean Won", currencySymbol: "₩", flag: "🇰🇷", buyRate: 0.0608, sellRate: 0.0686, isPopular: false, isEnabled: true, isoCode: "KR", order: 11 },
  { id: "kwd", name: "Kuwait", currencyCode: "KWD", currencyName: "Kuwaiti Dinar", currencySymbol: "KD", flag: "🇰🇼", buyRate: 288.60, sellRate: 332.10, isPopular: true, isEnabled: true, isoCode: "KW", order: 12 },
  { id: "myr", name: "Malaysia", currencyCode: "MYR", currencyName: "Malaysian Ringgit", currencySymbol: "RM", flag: "🇲🇾", buyRate: 21.25, sellRate: 26.20, isPopular: false, isEnabled: true, isoCode: "MY", order: 13 },
  { id: "nzd", name: "New Zealand", currencyCode: "NZD", currencyName: "New Zealand Dollar", currencySymbol: "NZ$", flag: "🇳🇿", buyRate: 52.60, sellRate: 59.10, isPopular: false, isEnabled: true, isoCode: "NZ", order: 14 },
  { id: "nok", name: "Norway", currencyCode: "NOK", currencyName: "Norwegian Kroner", currencySymbol: "kr", flag: "🇳🇴", buyRate: 9.30, sellRate: 10.50, isPopular: false, isEnabled: true, isoCode: "NO", order: 15 },
  { id: "omr", name: "Oman", currencyCode: "OMR", currencyName: "Omani Rial", currencySymbol: "OMR", flag: "🇴🇲", buyRate: 236.00, sellRate: 262.00, isPopular: false, isEnabled: true, isoCode: "OM", order: 16 },
  { id: "qar", name: "Qatar", currencyCode: "QAR", currencyName: "Qatari Rial", currencySymbol: "QR", flag: "🇶🇦", buyRate: 24.95, sellRate: 27.90, isPopular: false, isEnabled: true, isoCode: "QA", order: 17 },
  { id: "sar", name: "Saudi Arabia", currencyCode: "SAR", currencyName: "Saudi Arabian Rial", currencySymbol: "SR", flag: "🇸🇦", buyRate: 24.20, sellRate: 27.15, isPopular: true, isEnabled: true, isoCode: "SA", order: 18 },
  { id: "sgd", name: "Singapore", currencyCode: "SGD", currencyName: "Singapore Dollar", currencySymbol: "S$", flag: "🇸🇬", buyRate: 69.40, sellRate: 78.85, isPopular: true, isEnabled: true, isoCode: "SG", order: 19 },
  { id: "zar", name: "South Africa", currencyCode: "ZAR", currencyName: "South African Rand", currencySymbol: "R", flag: "🇿🇦", buyRate: 5.20, sellRate: 6.05, isPopular: false, isEnabled: true, isoCode: "ZA", order: 20 },
  { id: "sek", name: "Sweden", currencyCode: "SEK", currencyName: "Swedish Kroner", currencySymbol: "kr", flag: "🇸🇪", buyRate: 9.25, sellRate: 10.65, isPopular: false, isEnabled: true, isoCode: "SE", order: 21 },
  { id: "chf", name: "Switzerland", currencyCode: "CHF", currencyName: "Swiss Franc", currencySymbol: "CHF", flag: "🇨🇭", buyRate: 113.25, sellRate: 126.75, isPopular: true, isEnabled: true, isoCode: "CH", order: 22 },
  { id: "thb", name: "Thailand", currencyCode: "THB", currencyName: "Thailand Baht", currencySymbol: "฿", flag: "🇹🇭", buyRate: 2.65, sellRate: 3.50, isPopular: false, isEnabled: true, isoCode: "TH", order: 23 },
  { id: "aed", name: "United Arab Emirates", currencyCode: "AED", currencyName: "UAE Dirham", currencySymbol: "AED", flag: "🇦🇪", buyRate: 24.85, sellRate: 27.45, isPopular: true, isEnabled: true, isoCode: "AE", order: 24 },
]

// Get all countries (public with optional ?all=true for admin)
router.get('/', async (req: Request, res: Response) => {
  try {
    const showAll = req.query.all === 'true'
    const whereCondition = showAll ? {} : { isEnabled: true }
    const countries = await prisma.country.findMany({
      where: whereCondition,
      orderBy: { order: 'asc' },
    })
    res.json(countries)
  } catch (error: any) {
    console.warn('Database temporarily sleeping or connecting, returning fallback rates:', error.message)
    res.json(fallbackCountries)
  }
})

// Get popular countries (public)
router.get('/popular', async (req: Request, res: Response) => {
  try {
    const countries = await prisma.country.findMany({
      where: { isEnabled: true, isPopular: true },
      orderBy: { order: 'asc' }
    })
    res.json(countries)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch popular countries' })
  }
})

// Get single country (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const country = await prisma.country.findUnique({
      where: { id }
    })
    if (!country) {
      return res.status(404).json({ error: 'Country not found' })
    }
    res.json(country)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country' })
  }
})

// Create country (admin only)
router.post('/', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const country = await prisma.country.create({
      data: req.body
    })
    res.status(201).json(country)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create country' })
  }
})

// Update country (admin only)
router.put('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const country = await prisma.country.update({
      where: { id },
      data: req.body
    })
    res.json(country)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update country' })
  }
})

// Delete country (admin only)
router.delete('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await prisma.country.delete({
      where: { id }
    })
    res.json({ message: 'Country deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete country' })
  }
})

// Update country order (admin only)
router.put('/:id/order', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { order } = req.body
    const country = await prisma.country.update({
      where: { id },
      data: { order }
    })
    res.json(country)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update order' })
  }
})

export { router as countryRouter }
