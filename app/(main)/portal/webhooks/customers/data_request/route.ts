import { type NextRequest } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const hmacHeader = request.headers.get('x-shopify-hmac-sha256') ?? '';
  const secret = process.env.SHOPIFY_API_SECRET ?? '';

  const digest = crypto
    .createHmac('sha256', secret)
    .update(rawBody, 'utf8')
    .digest('base64');

  const digestBuf = Buffer.from(digest);
  const hmacBuf = Buffer.from(hmacHeader);
  const valid =
    digestBuf.length === hmacBuf.length &&
    crypto.timingSafeEqual(digestBuf, hmacBuf);

  if (!valid) {
    return new Response('Unauthorized', { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  console.log(`[Shopify webhook] customers/data_request for shop: ${payload.shop_domain}`);

  // This app stores no customer PII beyond session tokens.
  // If customer-level data is added in future, compile and deliver it here.

  return new Response(null, { status: 200 });
}
