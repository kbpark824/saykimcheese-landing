# 🧩 saykimcheese

A modern, high-performance landing page for a NYC charcuterie catering business. Built with Astro for maximum performance and SEO optimization, featuring interactive components and secure lead capture functionality.

## 📝 Brief Description

**saykimcheese** is a professional marketing website for a charcuterie catering business specializing in custom grazing boards and event catering in New York City. The site showcases beautiful charcuterie boards, captures leads through a secure contact form, and provides potential customers with an elegant browsing experience optimized for conversions.

**Target Audience:** Event planners, individuals hosting parties, corporate event coordinators, and anyone seeking premium charcuterie catering services in NYC.

**Why it matters:** Converts website visitors into qualified leads through an optimized user experience, professional presentation, and seamless inquiry process.

## ⚙️ Tech Stack

### Frontend
- **Astro 5.12.9** - Static site generator with island architecture
- **React 18.2.0** - Interactive components (rotating ingredient carousel)
- **Tailwind CSS 3.4.7** - Utility-first CSS framework
- **TypeScript** - Type-safe development

### Backend/API
- **Astro API Routes** - Serverless functions for form handling
- **Resend 6.0.1** - Transactional email service
- **Zod 3.25.76** - Runtime validation and sanitization

### Deployment & Hosting
- **Vercel** - Serverless deployment platform
- **Vercel Web Analytics** - Built-in performance tracking

### Security & Validation
- Comprehensive XSS protection
- Honeypot spam filtering
- CORS security headers
- Input sanitization and validation

## 🚀 Installation Instructions

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Setup
1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saykimcheese-landing
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your actual values (see Environment Variables section below)

4. **Start development server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:4321` to view the site

5. **Build for production**
   ```bash
   npm run build
   ```

6. **Preview production build**
   ```bash
   npm run preview
   ```

## 🧪 Testing

Currently, this project focuses on production reliability through:
- TypeScript type checking
- Zod runtime validation
- Comprehensive error handling
- XSS protection testing

To add testing framework:
```bash
# Example with Vitest (recommended for Astro)
npm install -D vitest @vitest/ui
```

## 📁 Project Structure Overview

```
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── BoardCard.astro     # Individual board showcase cards
│   │   ├── ContentImageSection.astro  # Image+text sections
│   │   ├── Hero.astro          # Main hero section
│   │   └── LeadForm.astro      # Contact form component
│   ├── islands/             # Interactive React components
│   │   └── RotatingIngredients.jsx  # Dynamic ingredient carousel
│   ├── layouts/             # Page layout templates
│   │   └── MarketingLayout.astro    # Main site layout
│   ├── pages/               # File-based routing
│   │   ├── api/             # API endpoints
│   │   │   └── lead.ts         # Form submission handler
│   │   ├── index.astro         # Homepage
│   │   └── thanks.astro        # Thank you page
│   └── styles/              # Global CSS
│       └── global.css          # Base styles and fonts
├── public/                  # Static assets
│   └── images/             # Image assets
│       └── boards/            # Charcuterie board photos
├── astro.config.mjs        # Astro configuration
├── tailwind.config.mjs     # Tailwind CSS configuration
└── vercel.json            # Vercel deployment config
```

## 🔐 Environment Variables

Create a `.env` file based on `.env.example`:

| Variable | Purpose | Required |
|----------|---------|----------|
| `RESEND_API_KEY` | Resend email service API key | ✅ |
| `LEAD_NOTIFY_TO` | Email address to receive lead notifications | ✅ |
| `LEAD_NOTIFY_FROM` | Verified sender email address | ✅ |
| `SITE_URL` | Production site URL (for CORS) | ✅ |
| `PLAUSIBLE_DOMAIN` | Plausible Analytics domain | ❌ |

### Email Setup
1. Sign up for [Resend](https://resend.com)
2. Verify your domain
3. Generate API key
4. Configure `LEAD_NOTIFY_FROM` with verified email

## 📦 API Endpoints / Major Features

### API Routes

#### `POST /api/lead`
Handles contact form submissions with comprehensive security measures.

**Features:**
- Input validation and sanitization (Zod)
- XSS protection
- Honeypot spam filtering  
- Security headers (CORS, CSP, etc.)
- Email notifications via Resend
- Graceful error handling

**Request Body:**
```typescript
{
  name: string;        // Required, 2-100 chars
  email: string;       // Required, valid email
  phone?: string;      // Optional, max 20 chars  
  event_date?: string; // Optional, max 10 chars
  message?: string;    // Optional, max 1000 chars
}
```

**Response:** Redirects to `/thanks` on success

### Frontend Features

#### 🏠 Homepage (`/`)
- **Hero Section**: Full-screen hero with call-to-action
- **Rotating Ingredients**: Interactive React carousel showcasing ingredients
- **Board Gallery**: Responsive showcase of signature charcuterie boards
- **Contact Form**: Secure lead capture with validation

#### 🙏 Thank You Page (`/thanks`)
- Post-submission confirmation page
- Professional acknowledgment of inquiry

#### 🎨 Design System
- **Custom Color Palette**: Brand colors including primary red (#d4232a)
- **Typography**: Lato (sans-serif), Merriweather (serif), Barriecito (logo)
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **Performance**: WebP images, lazy loading, optimized assets

## 🛠️ Contributing Guidelines

### Code Standards
- Follow existing TypeScript and Astro conventions
- Use Tailwind CSS for styling (avoid custom CSS when possible)
- Ensure mobile-responsive design
- Maintain security best practices

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make changes following project conventions
4. Test thoroughly on mobile and desktop
5. Run `npm run format` to format code
6. Submit a pull request

### Security Considerations
- Never commit environment variables
- Always validate and sanitize user inputs
- Test XSS protection measures
- Review email functionality thoroughly

## 🧹 Known Issues / TODOs

### Future Enhancements
- [ ] Add image optimization and lazy loading for ingredient carousel
- [ ] Implement proper testing suite (Vitest + Testing Library)
- [ ] Add Google Analytics or Plausible Analytics integration
- [ ] Consider adding more board categories/filtering
- [ ] Add JSON-LD structured data for better SEO
- [ ] Implement progressive web app (PWA) features

### Technical Debt
- [ ] Move hard-coded ingredient images to CMS or local assets
- [ ] Add error boundaries for React components
- [ ] Implement proper loading states for form submission
- [ ] Add rate limiting for API endpoints

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

This project is open source and available for educational and commercial use.

## 🙌 Acknowledgements

### Inspiration & Credits
- **Design Inspiration**: Modern food industry landing pages
- **Photography**: Stock images from Pexels and Unsplash for ingredient carousel
- **Typography**: Google Fonts (Lato, Merriweather) and custom Barriecito font

### Technologies & Tools
- [Astro](https://astro.build) - Amazing static site generator
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [Resend](https://resend.com) - Developer-friendly email API
- [Vercel](https://vercel.com) - Seamless deployment platform
- [React](https://react.dev) - Interactive UI components

### Special Thanks
- Astro community for excellent documentation and examples
- Tailwind team for the comprehensive design system
- All contributors and users of this project

---

**Built with ❤️ for the NYC food scene**
