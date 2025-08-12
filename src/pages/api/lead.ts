import type { APIRoute } from "astro";
import { z } from "zod";
import { Resend } from "resend";

// Note: For production deployment, you'll need to deploy this API route 
// as a serverless function or add an appropriate Astro adapter

// Enhanced XSS protection function
function sanitizeInput(input: string): string {
  // More comprehensive XSS pattern detection
  const xssPatterns = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe[^>]*>.*?<\/iframe>/gi,
    /<object[^>]*>.*?<\/object>/gi,
    /<embed[^>]*>/gi,
    /<form[^>]*>.*?<\/form>/gi,
    /expression\s*\(/gi,
    /vbscript:/gi,
    /data:\s*text\/html/gi
  ];
  
  let sanitized = input;
  xssPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // Remove HTML tags but preserve content
  sanitized = sanitized.replace(/<[^>]*>/g, '');
  
  return sanitized.trim();
}

// Security headers helper
function addSecurityHeaders(response: Response): Response {
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Content-Security-Policy', "default-src 'self'; script-src 'none'; object-src 'none';");
  response.headers.set('Access-Control-Allow-Origin', process.env.SITE_URL || 'https://saykimcheese.com');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

const schema = z.object({
  name: z.string().min(2).max(100).transform(sanitizeInput),
  email: z.string().email().max(254).transform(sanitizeInput),
  phone: z.string().max(20).transform(sanitizeInput).optional(),
  event_date: z.string().max(10).transform(sanitizeInput).optional(),
  message: z.string().max(1000).transform(sanitizeInput).optional(),
  company: z.string().optional(), // honeypot
});

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();
  const values = Object.fromEntries(form) as Record<string, string>;
  const parsed = schema.safeParse(values);

  // honeypot trip
  if (values.company) {
    return addSecurityHeaders(new Response("OK", { status: 200 }));
  }

  if (!parsed.success) {
    console.warn('Form validation failed:', {
      timestamp: new Date().toISOString(),
      errors: parsed.error.issues.map(issue => issue.message),
      path: request.url
    });
    return addSecurityHeaders(new Response("Invalid input", { status: 400 }));
  }

  // Validate required environment variables
  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFY_TO;
  const notifyFrom = process.env.LEAD_NOTIFY_FROM;

  if (!resendApiKey || !notifyTo || !notifyFrom) {
    console.error('Server configuration error:', {
      timestamp: new Date().toISOString(),
      missing: [
        !resendApiKey && 'RESEND_API_KEY',
        !notifyTo && 'LEAD_NOTIFY_TO', 
        !notifyFrom && 'LEAD_NOTIFY_FROM'
      ].filter(Boolean)
    });
    return addSecurityHeaders(new Response("Server configuration error", { status: 500 }));
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      from: notifyFrom,
      to: notifyTo,
      subject: `New lead: ${parsed.data.name} — saykimcheese`,
      text: [
        `Name: ${parsed.data.name}`,
        `Email: ${parsed.data.email}`,
        `Phone: ${parsed.data.phone || "-"}`,
        `Event Date: ${parsed.data.event_date || "-"}`,
        `Message: ${parsed.data.message || "-"}`,
      ].join("\n"),
    });
  } catch (e) {
    // Log error details for debugging (server-side only) - sanitized
    console.error('Email delivery failed:', {
      timestamp: new Date().toISOString(),
      leadEmailDomain: parsed.data.email.split('@')[1], // Log domain only for privacy
      leadNameLength: parsed.data.name.length, // Log length only
      errorType: e instanceof Error ? e.constructor.name : 'Unknown',
      errorMessage: e instanceof Error ? e.message.substring(0, 100) : 'Unknown error' // Truncate error details
    });
    
    // Still redirect user to success page (they submitted successfully)
    // The email failure is an internal issue, not the user's fault
    return redirect("/thanks");
  }

  return redirect("/thanks");
};
