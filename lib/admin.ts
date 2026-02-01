/**
 * Admin utility functions
 */

/**
 * Check if a user email belongs to an admin account
 * Admins are users with @finitsolutions email domain
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.toLowerCase().endsWith('@finitsolutions.be') || 
         email.toLowerCase().endsWith('@finitsolutions.com');
}

/**
 * Extract domain from email
 */
export function getEmailDomain(email: string): string {
  const parts = email.split('@');
  return parts.length > 1 ? parts[1].toLowerCase() : '';
}
