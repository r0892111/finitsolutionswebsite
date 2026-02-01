import { createHash, timingSafeEqual } from 'crypto';

/**
 * Securely hash an access code using SHA-256
 */
export function hashCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

/**
 * Securely compare two codes using timing-safe comparison
 * This prevents timing attacks
 */
export function secureCompare(providedCode: string, storedHash: string): boolean {
  const providedHash = hashCode(providedCode);
  
  // Ensure both strings are the same length to prevent timing attacks
  if (providedHash.length !== storedHash.length) {
    return false;
  }

  // Use timing-safe comparison
  const providedBuffer = Buffer.from(providedHash, 'hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');
  
  try {
    return timingSafeEqual(providedBuffer, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Get the stored hash for the access code from environment variables
 * Multiple codes can be supported by separating with commas
 */
export function getStoredHashes(): string[] {
  const accessCodes = process.env.CUSTOMER_PORTAL_CODES || '';
  return accessCodes.split(',').filter(Boolean).map(code => code.trim());
}

/**
 * Verify if a provided code matches any of the stored hashes
 */
export function verifyAccessCode(providedCode: string): boolean {
  const storedHashes = getStoredHashes();
  
  if (storedHashes.length === 0) {
    console.error('No access codes configured in CUSTOMER_PORTAL_CODES');
    return false;
  }

  // Check against all stored hashes
  return storedHashes.some(storedHash => secureCompare(providedCode, storedHash));
}
