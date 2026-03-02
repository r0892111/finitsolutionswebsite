const crypto = require('crypto');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const rawBody = event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : (event.body ?? '');

  const hmacHeader = (event.headers['x-shopify-hmac-sha256'] ?? '');
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
    return { statusCode: 401, body: 'Unauthorized' };
  }

  const payload = JSON.parse(rawBody);
  console.log(`[Shopify webhook] customers/redact for shop: ${payload.shop_domain}`);

  return { statusCode: 200, body: '' };
};
