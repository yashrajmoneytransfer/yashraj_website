import { Router, Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest, authorizeAdmin } from '../middleware/auth'

const router = Router()

// Get active services (public)
router.get('/', async (req: Request, res: Response) => {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' }
    })
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch services' })
  }
})

// Get single service (public)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const service = await prisma.service.findUnique({
      where: { id }
    })
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch service' })
  }
})

// Create service (admin only)
router.post('/', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const service = await prisma.service.create({
      data: req.body
    })
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create service' })
  }
})

// Update service (admin only)
router.put('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const service = await prisma.service.update({
      where: { id },
      data: req.body
    })
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update service' })
  }
})

// Delete service (admin only)
router.delete('/:id', authenticate, authorizeAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await prisma.service.delete({
      where: { id }
    })
    res.json({ message: 'Service deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete service' })
  }
})

export { router as serviceRouter }
