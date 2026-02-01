import { type NextRequest } from 'next/server';
import { verifyAccessCode } from '@/lib/auth';

// Rate limiting storage (in-memory, resets on server restart)
const rateLimitMap = new Map<string, { attempts: number; resetTime: number }>();

const MAX_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes

function getRateLimitKey(request: NextRequest): string {
  // Use IP address for rate limiting
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : request.headers.get('x-real-ip') || 'unknown';
  return `login:${ip}`;
}

function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitMap.set(key, { attempts: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.attempts >= MAX_ATTEMPTS) {
    return false; // Rate limited
  }

  record.attempts++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const key = getRateLimitKey(request);

    // Check rate limit
    if (!checkRateLimit(key)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Too many login attempts. Please try again later.',
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const { code } = await request.json();

    if (!code || typeof code !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Access code is required',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Verify the access code
    const isValid = verifyAccessCode(code);

    if (!isValid) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid access code',
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }

    // Success - reset rate limit for this IP
    rateLimitMap.delete(key);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Authentication successful',
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'An error occurred during authentication',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
