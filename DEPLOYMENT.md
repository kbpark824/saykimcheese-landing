# 🚀 Deployment Guide

This project is configured for deployment on **Vercel** with custom domain support.

## 📋 Prerequisites

1. **Domain name** (purchase from any registrar)
2. **Vercel account** (free at [vercel.com](https://vercel.com))
3. **Environment variables** configured

## 🔧 Environment Variables

Set these in your Vercel dashboard (Project Settings → Environment Variables):

```env
RESEND_API_KEY=re_your_resend_api_key_here
LEAD_NOTIFY_TO=yourname@yourdomain.com
LEAD_NOTIFY_FROM=noreply@yourdomain.com
```

## 🚀 Deployment Options

### Option 1: Vercel Dashboard (Recommended)

1. **Connect Repository**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel auto-detects Astro configuration

2. **Configure Environment Variables**
   - Project Settings → Environment Variables
   - Add the three variables above

3. **Deploy**
   - Vercel deploys automatically
   - Get a `.vercel.app` URL immediately

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts to configure
```

## 🌐 Custom Domain Setup

### Step 1: Add Domain in Vercel
1. Project Settings → Domains
2. Add your domain (e.g., `saykimcheese.com`)
3. Vercel provides DNS instructions

### Step 2: Configure DNS
**Option A: Use Vercel Nameservers (Easiest)**
- Point your domain's nameservers to Vercel
- Vercel manages everything (DNS, SSL, etc.)

**Option B: Keep Your DNS Provider**
- Add A/CNAME records provided by Vercel
- Point to Vercel's servers

### Step 3: SSL Certificate
- **Automatic**: Vercel provides free SSL via Let's Encrypt
- **Custom**: Upload your own certificate if needed

## 📊 Features Enabled

- ✅ **Static pages**: Lightning fast
- ✅ **Serverless API**: `/api/lead` endpoint
- ✅ **Security headers**: Built-in protection
- ✅ **Web Analytics**: Vercel analytics enabled
- ✅ **Global CDN**: Worldwide performance
- ✅ **Automatic deployments**: On git push

## 🔍 Monitoring

### Vercel Dashboard
- **Analytics**: Traffic and performance
- **Functions**: API endpoint logs
- **Deployments**: Build history
- **Domains**: SSL status

### Forms & Email
- **Resend Dashboard**: Email delivery stats
- **Server logs**: Function execution logs

## 🛠️ Local Testing

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Test production build
npm run build
npm run preview
```

## 🚨 Troubleshooting

### Build Issues
- Check Node.js version (18+ recommended)
- Verify environment variables are set
- Review build logs in Vercel dashboard

### API Issues
- Ensure `RESEND_API_KEY` is valid
- Check email addresses in environment variables
- Monitor function logs in Vercel

### Domain Issues
- Verify DNS propagation (24-48 hours)
- Check SSL certificate status
- Use Vercel's domain debugger

## 📈 Performance Tips

1. **Image Optimization**: Already configured
2. **Caching**: Handled by Vercel CDN
3. **Compression**: Automatic gzip/brotli
4. **Analytics**: Monitor Core Web Vitals

---

## 🎉 You're Ready to Deploy!

Your project is fully configured for production deployment with:
- Security hardening ✅
- Performance optimization ✅
- Serverless API endpoints ✅
- Custom domain support ✅