"use client";

import { useConsent } from '@/contexts/consent-context';
import { Button } from '@/components/ui/button';
import { Play, Settings } from 'lucide-react';

interface EmbedGuardProps {
  children: React.ReactNode;
  category?: 'social' | 'marketing';
  placeholder?: React.ReactNode;
  className?: string;
}

export function EmbedGuard({ 
  children, 
  category = 'social', 
  placeholder,
  className = ""
}: EmbedGuardProps) {
  const { choices, openSettings } = useConsent();

  const hasConsent = choices[category];

  if (hasConsent) {
    return <>{children}</>;
  }

  if (placeholder) {
    return <div className={className}>{placeholder}</div>;
  }

  return (
    <div className={`bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center ${className}`}>
      <div className="max-w-sm mx-auto">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
          <Play className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Inhoud geblokkeerd
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Deze inhoud gebruikt cookies. Sta &apos;{category === 'social' ? 'Sociaal' : 'Marketing'}&apos; toe in je cookie-instellingen om deze inhoud te laden.
        </p>
        <Button
          onClick={openSettings}
          variant="outline"
          size="sm"
          className="inline-flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Cookie-instellingen
        </Button>
      </div>
    </div>
  );
}