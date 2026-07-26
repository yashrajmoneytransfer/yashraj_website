import { Router, Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { prisma } from '../lib/prisma'
import { authenticate, AuthRequest, authorizeAdmin } from '../middleware/auth'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// OTP storage (in production, use Redis or database)
const otpStore = new Map<string, { otp: string; expiresAt: Date }>()

// Register admin
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' })
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' })
    }

    const existingAdmin = await prisma.admin.findUnique({ where: { email } })
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    })

    res.status(201).json({
      message: 'Admin created successfully',
      admin: { id: admin.id, email: admin.email, name: admin.name }
    })
  } catch (error: any) {
    console.error('Registration error:', error)
    res.status(500).json({ error: 'Failed to create admin', details: error.message })
  }
})

// Login admin
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, admin.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: admin.id, email: admin.email, role: admin.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role }
    })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// Get current admin
router.get('/me', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.userId },
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    })

    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }

    res.json(admin)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin' })
  }
})

// Update admin password
router.put('/password', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body

    const admin = await prisma.admin.findUnique({ where: { id: req.userId } })
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' })
    }

    const isValidPassword = await bcrypt.compare(currentPassword, admin.password)
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12)

    await prisma.admin.update({
      where: { id: req.userId },
      data: { password: hashedPassword }
    })

    res.json({ message: 'Password updated successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to update password' })
  }
})

// Forgot password - Send OTP
router.post('/forgot-password', async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) {
      // Don't reveal if email exists for security
      return res.json({ message: 'If the email exists, an OTP will be sent' })
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

    // Store OTP
    otpStore.set(email, { otp, expiresAt })

    // Send email with OTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP - YashRaj Money Transfer',
      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP code is: <strong>${otp}</strong></p>
        <p>This code will expire in 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    })

    res.json({ message: 'OTP sent successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to send OTP' })
  }
})

// Verify OTP
router.post('/verify-otp', async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body

    const storedData = otpStore.get(email)
    if (!storedData) {
      return res.status(400).json({ error: 'Invalid or expired OTP' })
    }

    if (storedData.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' })
    }

    if (storedData.expiresAt < new Date()) {
      otpStore.delete(email)
      return res.status(400).json({ error: 'OTP has expired' })
    }

    // Generate reset token
    const resetToken = jwt.sign({ email }, JWT_SECRET, { expiresIn: '15m' })

    // Clear OTP after successful verification
    otpStore.delete(email)

    res.json({ token: resetToken })
  } catch (error) {
    res.status(500).json({ error: 'Failed to verify OTP' })
  }
})

// Reset password with token
router.post('/reset-password', async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string }
    const { email } = decoded

    const hashedPassword = await bcrypt.hash(password, 12)

    await prisma.admin.update({
      where: { email },
      data: { password: hashedPassword }
    })

    res.json({ message: 'Password reset successfully' })
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

export { router as authRouter }
