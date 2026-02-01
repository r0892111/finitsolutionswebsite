#!/usr/bin/env node

/**
 * Script to generate secure access code hashes for the customer portal
 * 
 * Usage:
 *   node scripts/generate-access-code.js <your-secret-code>
 * 
 * Example:
 *   node scripts/generate-access-code.js MySecureCode123!
 * 
 * Output:
 *   SHA-256 Hash: <hash>
 *   Add this to your .env.local file:
 *   CUSTOMER_PORTAL_CODES=<hash>
 * 
 * For multiple codes, separate them with commas:
 *   CUSTOMER_PORTAL_CODES=<hash1>,<hash2>,<hash3>
 */

const crypto = require('crypto');

const code = process.argv[2];

if (!code) {
  console.error('Error: Please provide an access code as an argument');
  console.error('Usage: node scripts/generate-access-code.js <your-secret-code>');
  process.exit(1);
}

if (code.length < 12) {
  console.warn('Warning: Access codes should be at least 12 characters long for security');
}

// Generate SHA-256 hash
const hash = crypto.createHash('sha256').update(code).digest('hex');

console.log('\n✅ Access Code Hash Generated\n');
console.log('Original Code:', code.replace(/./g, '*').substring(0, 4) + '...');
console.log('SHA-256 Hash:', hash);
console.log('\n📝 Add this to your .env.local file:\n');
console.log(`CUSTOMER_PORTAL_CODES=${hash}\n`);
console.log('💡 For multiple codes, separate them with commas:');
console.log(`CUSTOMER_PORTAL_CODES=${hash},<another-hash>\n`);
console.log('🔒 Keep your access codes secure and never commit them to version control!\n');
