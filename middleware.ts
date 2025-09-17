import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'nl'],
 
  // Used when no locale matches
  defaultLocale: 'en',
  
  // Always use a locale prefix
  localePrefix: 'always'
});
 
export const config = {
  // Match all pathnames except for
  // - API routes
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - Static files (those with a file extension)
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};