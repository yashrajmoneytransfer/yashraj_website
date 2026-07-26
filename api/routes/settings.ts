import { Router, Request, Response } from 'express'
import { prisma } from '../../lib/prisma'
import { authenticate, AuthRequest, authorizeAdmin } from '../middleware/auth'

const router = Router()

// Get website settings (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    let settings = await prisma.websiteSettings.findFirst()

    if (!settings) {
      settings = await prisma.websiteSettings.create({
        data: {
          companyName: 'YashRaj Money Transfer',
          mobile: '+91 9014798141',
          email: 'yashraj.transfer@gmail.com',
          address: '2nd Floor Sai Look Complex, Labbipet, Vijayawada, Andhra Pradesh, India',
          whatsapp: '+91 9014798141',
          businessHours: 'Monday - Saturday: 10:00 AM - 7:00 PM',
          googleMapsUrl: 'https://maps.app.goo.gl/5uWM7Ch9jdLqRpyJ7',
          heroTitle: 'Trusted Foreign Exchange Services in Vijayawada',
          heroSubtitle: 'Best Exchange Rates | Fast Service | Trusted Partner',
        },
      })
    }

    res.json(settings)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch settings' })
  }
})

// Update website settings (admin only)
router.put('/', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const {
      companyName,
      mobile,
      phone,
      email,
      whatsapp,
      address,
      businessHours,
      workingHours,
      googleMapsUrl,
      googleMapEmbed,
      heroTitle,
      heroSubtitle,
      aboutContent,
      logo,
    } = req.body

    const updateData: any = {}
    if (companyName !== undefined) updateData.companyName = companyName
    if (mobile !== undefined || phone !== undefined) updateData.mobile = mobile || phone
    if (email !== undefined) updateData.email = email
    if (whatsapp !== undefined) updateData.whatsapp = whatsapp
    if (address !== undefined) updateData.address = address
    if (businessHours !== undefined || workingHours !== undefined) updateData.businessHours = businessHours || workingHours
    if (googleMapsUrl !== undefined) updateData.googleMapsUrl = googleMapsUrl
    if (googleMapEmbed !== undefined) updateData.googleMapEmbed = googleMapEmbed
    if (heroTitle !== undefined) updateData.heroTitle = heroTitle
    if (heroSubtitle !== undefined) updateData.heroSubtitle = heroSubtitle
    if (aboutContent !== undefined) updateData.aboutContent = aboutContent
    if (logo !== undefined) updateData.logo = logo

    let settings = await prisma.websiteSettings.findFirst()

    if (!settings) {
      settings = await prisma.websiteSettings.create({
        data: {
          companyName: companyName || 'YashRaj Money Transfer',
          mobile: mobile || phone || '+91 9014798141',
          email: email || 'yashraj.transfer@gmail.com',
          address: address || '2nd Floor Sai Look Complex, Labbipet, Vijayawada',
          whatsapp: whatsapp || '+91 9014798141',
          heroTitle: heroTitle || 'Trusted Foreign Exchange Services in Vijayawada',
          heroSubtitle: heroSubtitle || 'Best Exchange Rates',
          ...updateData,
        },
      })
    } else {
      settings = await prisma.websiteSettings.update({
        where: { id: settings.id },
        data: updateData,
      })
    }

    res.json(settings)
  } catch (error) {
    console.error('Failed to update website settings:', error)
    res.status(500).json({ error: 'Failed to update settings' })
  }
})

// Get SEO settings (public)
router.get('/seo', async (req: Request, res: Response) => {
  try {
    let seo = await prisma.sEO.findFirst()
    
    if (!seo) {
      seo = await prisma.sEO.create({
        data: {
          metaTitle: 'YashRaj Money Transfer | Trusted Foreign Exchange Services in Vijayawada',
          metaDescription: 'Best foreign exchange services in Vijayawada. Currency exchange, travel forex, student forex, and business currency solutions with competitive rates.',
          facebookUrl: 'https://facebook.com/yashrajmoneytransfer',
          twitterUrl: 'https://twitter.com/yashrajforex',
          instagramUrl: 'https://instagram.com/yashrajmoneytransfer',
          linkedinUrl: 'https://linkedin.com/company/yashrajmoneytransfer',
        }
      })
    }
    
    res.json(seo)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch SEO settings' })
  }
})

// Update SEO settings (admin only)
router.put('/seo', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const {
      metaTitle,
      metaDescription,
      keywords,
      metaKeywords,
      ogTitle,
      ogDescription,
      ogImage,
      twitterCard,
      canonicalUrl,
      robotsTxt,
      facebookUrl,
      twitterUrl,
      instagramUrl,
      linkedinUrl,
    } = req.body

    const updateData: any = {}
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription
    if (keywords !== undefined || metaKeywords !== undefined) updateData.keywords = keywords || metaKeywords
    if (ogTitle !== undefined) updateData.ogTitle = ogTitle
    if (ogDescription !== undefined) updateData.ogDescription = ogDescription
    if (ogImage !== undefined) updateData.ogImage = ogImage
    if (twitterCard !== undefined) updateData.twitterCard = twitterCard
    if (canonicalUrl !== undefined) updateData.canonicalUrl = canonicalUrl
    if (robotsTxt !== undefined) updateData.robotsTxt = robotsTxt
    if (facebookUrl !== undefined) updateData.facebookUrl = facebookUrl
    if (twitterUrl !== undefined) updateData.twitterUrl = twitterUrl
    if (instagramUrl !== undefined) updateData.instagramUrl = instagramUrl
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl

    let seo = await prisma.sEO.findFirst()

    if (!seo) {
      seo = await prisma.sEO.create({
        data: {
          metaTitle: metaTitle || 'YashRaj Money Transfer',
          metaDescription: metaDescription || 'Best Forex Rates in Vijayawada',
          ...updateData,
        },
      })
    } else {
      seo = await prisma.sEO.update({
        where: { id: seo.id },
        data: updateData,
      })
    }

    res.json(seo)
  } catch (error) {
    console.error('Failed to update SEO settings:', error)
    res.status(500).json({ error: 'Failed to update SEO settings' })
  }
})

export { router as settingsRouter }
