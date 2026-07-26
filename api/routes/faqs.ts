import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest, authorizeAdmin } from '../middleware/auth'

const router = Router()

// Get active FAQs (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const { category } = req.query
    const faqs = await prisma.fAQ.findMany({
      where: { 
        isActive: true,
        category: category ? category as string : undefined
      },
      orderBy: { order: 'asc' }
    })
    res.json(faqs)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQs' })
  }
})

// Get single FAQ (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const faq = await prisma.fAQ.findUnique({
      where: { id }
    })
    if (!faq) {
      return res.status(404).json({ error: 'FAQ not found' })
    }
    res.json(faq)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch FAQ' })
  }
})

// Create FAQ (admin only)
router.post('/', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const faq = await prisma.fAQ.create({
      data: req.body
    })
    res.status(201).json(faq)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create FAQ' })
  }
})

// Update FAQ (admin only)
router.put('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const faq = await prisma.fAQ.update({
      where: { id },
      data: req.body
    })
    res.json(faq)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update FAQ' })
  }
})

// Delete FAQ (admin only)
router.delete('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await prisma.fAQ.delete({
      where: { id }
    })
    res.json({ message: 'FAQ deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete FAQ' })
  }
})

export { router as faqRouter }
