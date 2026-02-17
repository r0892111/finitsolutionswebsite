import { Metadata } from 'next';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Mail, Calendar, Lock, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Finit Solutions - Google Integration Information',
  description: 'Learn about how Finit Solutions uses Google APIs to provide secure email and calendar integration for our customer portal.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function OAuthInfoPage() {
  return (
    <div className="min-h-screen bg-finit-aurora font-instrument">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-xl shadow-brand border-b border-[#1A2D63]/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="h-8 w-auto relative">
              <Image
                src="/Finit Logo Blue@4x.png"
                alt="Finit Solutions Logo"
                width={120}
                height={32}
                className="object-contain h-full w-auto"
                priority
              />
            </div>
            <div className="h-6 w-px bg-[#1A2D63]/20"></div>
            <h1 className="finit-h2 text-[#1A2D63]">Google Integration</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="finit-h1 text-[#1A2D63] mb-4">
            Google Account Integration
          </h2>
          <p className="finit-body text-[#1A2D63]/70 text-lg max-w-2xl mx-auto">
            Connect your Google account to access email and calendar features in the Finit Solutions customer portal.
          </p>
        </div>

        {/* What We Do */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mb-8">
          <CardHeader>
            <CardTitle className="finit-h2 text-[#1A2D63] flex items-center gap-2">
              <Shield className="h-6 w-6" />
              What We Do
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="finit-body text-[#1A2D63]/70">
              Finit Solutions provides a secure customer portal where clients can manage their projects, 
              documents, and communications. Our Google integration allows you to connect your Google account 
              to access email and calendar features within the portal.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#1A2D63] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1A2D63] mb-1">Email Access</h3>
                  <p className="text-sm text-[#1A2D63]/60">
                    Read-only access to your Gmail messages to help manage communications and project updates.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-[#1A2D63] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1A2D63] mb-1">Calendar Access</h3>
                  <p className="text-sm text-[#1A2D63]/60">
                    Read-only access to your Google Calendar to help coordinate meetings and deadlines.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Privacy */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mb-8">
          <CardHeader>
            <CardTitle className="finit-h2 text-[#1A2D63] flex items-center gap-2">
              <Lock className="h-6 w-6" />
              Security & Privacy
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1A2D63] mb-1">Read-Only Access</h3>
                  <p className="text-sm text-[#1A2D63]/60">
                    We only request read-only permissions. We cannot send emails, modify your calendar, 
                    or access any other Google services.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1A2D63] mb-1">Secure Storage</h3>
                  <p className="text-sm text-[#1A2D63]/60">
                    All access tokens are encrypted and stored securely. You can revoke access at any time 
                    from your Google Account settings or from within the portal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#1A2D63] mb-1">Your Control</h3>
                  <p className="text-sm text-[#1A2D63]/60">
                    You maintain full control over your Google account. You can disconnect the integration 
                    at any time, and we will immediately stop accessing your data.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Usage */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10 mb-8">
          <CardHeader>
            <CardTitle className="finit-h2 text-[#1A2D63]">
              Google APIs We Use
            </CardTitle>
            <CardDescription>
              We use the following Google APIs with read-only permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-[#1A2D63] mb-2">Gmail API</h3>
                <p className="text-sm text-[#1A2D63]/60 mb-2">
                  <strong>Scope:</strong> <code className="bg-[#1A2D63]/10 px-2 py-1 rounded text-xs">https://www.googleapis.com/auth/gmail.readonly</code>
                </p>
                <p className="text-sm text-[#1A2D63]/60">
                  Used to read your email messages (read-only). We use this to help you view and manage 
                  project-related communications within the portal.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-[#1A2D63] mb-2">Google Calendar API</h3>
                <p className="text-sm text-[#1A2D63]/60 mb-2">
                  <strong>Scope:</strong> <code className="bg-[#1A2D63]/10 px-2 py-1 rounded text-xs">https://www.googleapis.com/auth/calendar.readonly</code>
                </p>
                <p className="text-sm text-[#1A2D63]/60">
                  Used to read your calendar events (read-only). We use this to help coordinate meetings 
                  and track project deadlines.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Support */}
        <Card className="bg-white/95 backdrop-blur-sm shadow-brand-lg border-[#1A2D63]/10">
          <CardHeader>
            <CardTitle className="finit-h2 text-[#1A2D63]">
              Questions or Concerns?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="finit-body text-[#1A2D63]/70 mb-4">
              If you have any questions about how we use your Google account data or need help with the integration, 
              please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-sm text-[#1A2D63]/60">
                <strong>Email:</strong> <a href="mailto:info@finitsolutions.be" className="text-[#1A2D63] hover:underline">info@finitsolutions.be</a>
              </p>
              <p className="text-sm text-[#1A2D63]/60">
                <strong>Website:</strong> <a href="https://finitsolutions.be" className="text-[#1A2D63] hover:underline">finitsolutions.be</a>
              </p>
              <p className="text-sm text-[#1A2D63]/60">
                <strong>Privacy Policy:</strong> <a href="/privacy" className="text-[#1A2D63] hover:underline">View Privacy Policy</a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-[#1A2D63]/60">
          <p>
            This page provides information about Finit Solutions' use of Google APIs for customer portal integration.
          </p>
          <p className="mt-2">
            <a href="/" className="text-[#1A2D63] hover:underline">← Back to Home</a>
          </p>
        </div>
      </main>
    </div>
  );
}
