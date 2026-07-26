# YashRaj Money Transfer - Premium Foreign Exchange Website

A world-class, enterprise-grade Foreign Exchange website built for YashRaj Money Transfer in Vijayawada, India. This premium SaaS-quality application features modern UI/UX, dynamic currency management, real-time rates calculator, and a comprehensive admin CMS.

## 🚀 Features

### Frontend
- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS** with custom premium color palette
- **Framer Motion** for smooth animations and micro-interactions
- **Dark/Light Mode** toggle
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** - Schema.org, Open Graph, sitemap, robots.txt

### Core Features
- **Live Forex Rates Ticker** - Scrolling real-time currency rates
- **Exchange Calculator** - Real-time currency conversion
- **Dynamic Country & Currency Management** - Admin-controlled without code changes
- **Quote Request System** - WhatsApp and Email integration
- **Gallery** - Masonry layout with lightbox
- **Reviews** - Carousel with star ratings
- **FAQ** - Accordion UI with search and categories
- **Contact Form** - With Google Maps integration

### Backend
- **Express.js** REST API
- **JWT Authentication** with role-based access control
- **Prisma ORM** with PostgreSQL
- **Security** - Helmet, CORS, rate limiting
- **Email Notifications** - Nodemailer integration
- **WhatsApp Integration** - Auto-generated WhatsApp messages

### Admin Dashboard
- **Analytics** - Revenue-style charts and statistics
- **Country & Currency Management** - Full CRUD operations
- **Quote Management** - View and manage quote requests
- **Gallery Management** - Upload, delete, reorder images
- **Review Management** - Approve, delete, edit reviews
- **FAQ Management** - Full control over FAQs
- **Service Management** - Manage service offerings
- **Website Settings** - Edit all website content without coding
- **SEO Settings** - Manage meta tags and Open Graph data

## 🛠️ Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hook Form
- Zod Validation
- TanStack Query
- Axios
- Lucide Icons
- next-themes

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs
- Helmet
- express-rate-limit
- nodemailer

### Database
- **Neon PostgreSQL** (Serverless PostgreSQL)
- Prisma ORM

### Storage
- Cloudinary (configurable)
- AWS S3 (alternative)

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Neon PostgreSQL account (free tier available)

## 🚀 Local Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd yashraj_website
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Neon PostgreSQL

1. Go to [console.neon.tech](https://console.neon.tech/)
2. Create a free account
3. Create a new project
4. Copy the connection string

### 4. Set up environment variables

Create a `.env` file in the project root:

```env
# Database (Neon PostgreSQL)
DATABASE_URL="postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Secret (generate a strong random string)
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"

# API Configuration
API_PORT=5000
FRONTEND_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:5000"

# Node Environment
NODE_ENV=development

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Email (for OTP and notifications)
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"

# WhatsApp
WHATSAPP_PHONE="+919014798141"
```

### 5. Set up the database
```bash
npx prisma generate
npx prisma db push
```

### 6. Run the backend server (Terminal 1)
```bash
cd api
npm install
npm start
```

The API will be available at `http://localhost:5000`

### 7. Run the frontend (Terminal 2)
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📁 Project Structure

```
yashraj_website/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin dashboard pages
│   ├── auth/              # Authentication pages (signin, forgot-password, reset-password)
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── navbar.tsx         # Navigation bar
│   ├── footer.tsx         # Footer
│   └── feedback-button.tsx # Review submission
├── features/              # Feature-based components
│   └── home/              # Home page sections
│       ├── hero.tsx
│       ├── live-rates-ticker.tsx
│       ├── trust-section.tsx
│       ├── services-section.tsx
│       ├── calculator-section.tsx
│       ├── process-section.tsx
│       ├── testimonials-section.tsx
│       ├── gallery-section.tsx
│       ├── faq-section.tsx
│       ├── contact-section.tsx
│       └── floating-elements.tsx
├── api/                   # Express.js API (separate backend)
│   ├── server.ts          # API entry point
│   ├── lib/               # API utilities
│   │   └── prisma.ts      # Prisma client for backend
│   ├── middleware/        # API middleware
│   │   └── auth.ts        # Authentication middleware
│   ├── routes/            # API routes
│   │   ├── auth.ts        # Authentication routes
│   │   ├── countries.ts   # Country management
│   │   ├── quotes.ts      # Quote requests
│   │   ├── gallery.ts     # Gallery management
│   │   ├── reviews.ts     # Review management
│   │   ├── faqs.ts        # FAQ management
│   │   ├── services.ts    # Service management
│   │   ├── settings.ts    # Website settings
│   │   └── enquiries.ts   # Contact enquiries
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # TypeScript config for backend
│   └── render.yaml        # Render deployment config
├── lib/                   # Frontend utility libraries
│   ├── api.ts             # API URL configuration
│   ├── prisma.ts          # Prisma client for frontend
│   └── utils.ts           # Utility functions
├── prisma/                # Prisma ORM
│   └── schema.prisma      # Database schema
├── types/                 # TypeScript types
│   └── index.ts           # Type definitions
└── public/                # Static assets
```

## 🔐 Security Features

- JWT Authentication with role-based access control
- Password hashing with bcrypt
- Helmet for HTTP headers
- CORS configuration
- Rate limiting (100 requests per 15 minutes)
- SQL injection prevention (Prisma ORM)
- Input validation
- SSR-safe localStorage access

## 🎨 Design Features

- Premium fintech-inspired UI
- Glassmorphism effects
- Smooth animations with Framer Motion
- Hover effects and micro-interactions
- Scroll reveal animations
- Counter animations
- Floating CTA buttons
- Responsive design
- Dark/Light mode

## 📊 Database Schema

The application uses PostgreSQL with the following tables:
- Admin (Admin users)
- Country (Countries and currencies)
- CurrencyRate (Historical rates)
- QuoteRequest (Customer quotes)
- Gallery (Image gallery)
- Review (Customer reviews)
- FAQ (Frequently asked questions)
- Service (Service offerings)
- WebsiteSettings (Site configuration)
- SEO (SEO metadata)
- Enquiry (Contact enquiries)

## 🚢 Deployment

### Frontend (Vercel)

1. **Connect your GitHub repository to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

2. **Configure environment variables in Vercel**
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com
   NEXT_PUBLIC_APP_URL=https://your-frontend-url.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"

### Backend (Render)

1. **Create a PostgreSQL database on Neon**
   - Go to [console.neon.tech](https://console.neon.tech/)
   - Create a new project
   - Copy the connection string

2. **Deploy the backend to Render**
   - Go to [render.com](https://render.com)
   - Click "New +"
   - Select "Web Service"
   - Connect your GitHub repository
   - Set root directory to `api`
   - Build command: `npm install && npx prisma generate`
   - Start command: `npm start`

3. **Configure environment variables in Render**
   ```
   DATABASE_URL=your-neon-connection-string
   JWT_SECRET=your-jwt-secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   FRONTEND_URL=https://your-frontend-url.vercel.app
   API_PORT=5000
   ```

4. **Deploy**
   - Click "Deploy Web Service"

### Database (Neon PostgreSQL)

1. **Create Neon account**
   - Go to [console.neon.tech](https://console.neon.tech/)
   - Sign up for free

2. **Create a project**
   - Click "New Project"
   - Name your project
   - Select a region
   - Click "Create Project"

3. **Get connection string**
   - Copy the connection string from the dashboard
   - Add it to your environment variables

## 📝 Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| DATABASE_URL | PostgreSQL connection string (Neon) | Yes | `postgresql://user:password@ep-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require` |
| JWT_SECRET | JWT secret key (generate with `openssl rand -base64 32`) | Yes | `your-super-secret-jwt-key` |
| API_PORT | Backend server port | Yes | `5000` |
| FRONTEND_URL | Frontend URL for CORS | Yes | `http://localhost:3000` |
| NEXT_PUBLIC_API_URL | Backend API URL (public) | Yes | `http://localhost:5000` |
| NODE_ENV | Node environment | Yes | `development` or `production` |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes | `your-cloud-name` |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes | `your-api-key` |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes | `your-api-secret` |
| EMAIL_HOST | SMTP host | Yes | `smtp.gmail.com` |
| EMAIL_PORT | SMTP port | Yes | `587` |
| EMAIL_USER | SMTP username | Yes | `your-email@gmail.com` |
| EMAIL_PASSWORD | SMTP password | Yes | `your-app-password` |
| WHATSAPP_PHONE | WhatsApp phone number | Yes | `+919014798141` |

## 🔧 Troubleshooting

### Backend won't start
- Ensure all dependencies are installed: `cd api && npm install`
- Check that DATABASE_URL is correct
- Run `npx prisma generate` to generate Prisma client

### Frontend can't connect to backend
- Verify NEXT_PUBLIC_API_URL is set correctly
- Ensure backend is running on the correct port
- Check CORS configuration in `api/server.ts`

### Database connection errors
- Verify DATABASE_URL is correct
- Ensure SSL mode is enabled for Neon: `?sslmode=require`
- Check that your Neon database is active

### Prisma errors
- Run `npx prisma generate` after installing dependencies
- Run `npx prisma db push` to sync schema with database
- Check that Prisma schema matches your database

### SSR/Hydration errors
- All localStorage access is wrapped with `typeof window !== "undefined"`
- Hydration warnings from browser extensions can be ignored
- Test in Incognito mode to verify

## 🤝 Contributing

This is a proprietary project for YashRaj Money Transfer. For contributions, please contact the development team.

## 📄 License

Proprietary - All rights reserved to YashRaj Money Transfer

## 👥 Contact

- **Company**: YashRaj Money Transfer
- **Phone**: +91 9014798141
- **Email**: yashraj.transfer@gmail.com
- **Address**: 2nd Floor Sai Look Complex, Labbipet, Vijayawada, Andhra Pradesh, India

## 🎯 Business Rules

**IMPORTANT**: This application does NOT provide:
- Online money transfer
- Online remittance
- Payment processing
- Forex transactions

The platform is strictly an **informational and enquiry management system** for forex services.

## 🔮 Future Expansion

The architecture is designed to easily add:
- Live Currency API Integration
- Online Forex Booking
- Customer Dashboard
- Payment Gateway Integration
- KYC Upload
- Document Verification
- SMS Notifications
- Invoice Generation
- Transaction History
- Forex Order Tracking
- Multi-language Support

---

Built with ❤️ for YashRaj Money Transfer
