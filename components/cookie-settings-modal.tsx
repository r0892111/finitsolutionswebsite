"use client";

import { useState, useEffect } from 'react';
import { useConsent } from '@/contexts/consent-context';
import { ConsentChoices, pushDataLayerEvent } from '@/lib/consent';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';

interface CategoryInfo {
  key: keyof ConsentChoices;
  title: string;
  description: string;
  required: boolean;
  cookies: string[];
}

export function CookieSettingsModal() {
  const { showSettings, choices, updateChoices, closeSettings, acceptAll, rejectAll } = useConsent();
  const [localChoices, setLocalChoices] = useState<ConsentChoices>(choices);
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  const t = useTranslations('cookies.settings');
  const locale = useLocale();

  const categories: CategoryInfo[] = [
    {
      key: 'essential',
      title: t('categories.essential.title'),
      description: t('categories.essential.description'),
      required: true,
      cookies: ['fs_cookie_consent_v1', 'fs_cookie_consent_log_v1', 'PHPSESSID', '__Secure-*']
    },
    {
      key: 'statistics',
      title: t('categories.statistics.title'),
      description: t('categories.statistics.description'),
      required: false,
      cookies: ['_ga', '_ga_*', '_gid', '_gat', '_gtag_*']
    },
    {
      key: 'marketing',
      title: t('categories.marketing.title'),
      description: t('categories.marketing.description'),
      required: false,
      cookies: ['_fbp', '_fbc', 'fr', 'ads/ga-audiences', 'IDE', 'test_cookie']
    },
    {
      key: 'social',
      title: t('categories.social.title'),
      description: t('categories.social.description'),
      required: false,
      cookies: ['VISITOR_INFO1_LIVE', 'YSC', 'CONSENT', 'SOCS']
    }
  ];

  useEffect(() => {
    setLocalChoices(choices);
  }, [choices, showSettings]);

  const handleToggle = (category: keyof ConsentChoices, value: boolean) => {
    setLocalChoices(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleSave = () => {
    updateChoices(localChoices, 'settings');
    pushDataLayerEvent('consent_save_settings', localChoices, 'settings');
  };

  const handleAcceptAll = () => {
    const allAccepted: ConsentChoices = {
      essential: true,
      statistics: true,
      marketing: true,
      social: true,
    };
    setLocalChoices(allAccepted);
    updateChoices(allAccepted, 'settings');
    pushDataLayerEvent('consent_accept_all', allAccepted, 'settings');
  };

  const handleRejectAll = () => {
    const allRejected: ConsentChoices = {
      essential: true,
      statistics: false,
      marketing: false,
      social: false,
    };
    setLocalChoices(allRejected);
    updateChoices(allRejected, 'settings');
    pushDataLayerEvent('consent_reject_all', allRejected, 'settings');
  };

  const toggleCategoryExpansion = (categoryKey: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryKey]: !prev[categoryKey]
    }));
  };

  if (!showSettings) return null;

  return (
    <Dialog open={showSettings} onOpenChange={closeSettings}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{t('title')}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <p className="text-sm text-gray-600">
            {t('description')}
          </p>

          {/* Categories */}
          <div className="space-y-4">
            {categories.map((category) => (
              <div key={category.key} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 mb-1">
                      {category.title}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {category.description}
                    </p>
                  </div>
                  <div className="ml-4">
                    {category.required ? (
                      <div className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        {t('alwaysActive')}
                      </div>
                    ) : (
                      <Switch
                        checked={localChoices[category.key]}
                        onCheckedChange={(checked) => handleToggle(category.key, checked)}
                        aria-label={`${category.title} toestaan`}
                      />
                    )}
                  </div>
                </div>

                {/* Cookie details accordion */}
                <button
                  onClick={() => toggleCategoryExpansion(category.key)}
                  className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  aria-expanded={expandedCategories[category.key]}
                >
                  <span>{t('viewCookies')}</span>
                  {expandedCategories[category.key] ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandedCategories[category.key] && (
                  <div className="mt-3 p-3 bg-gray-50 rounded border">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">{t('cookiesInCategory')}</h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {category.cookies.map((cookie, index) => (
                        <li key={index} className="font-mono">
                          {cookie}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Cookie Policy Link */}
          <div className="pt-4 border-t border-gray-200">
            <Link 
              href={`/${locale}/cookieverklaring`}
              className="text-sm text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cookieverklaring
            </Link>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={handleRejectAll}
              className="text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-300"
            >
              {t('rejectAll')}
            </Button>
            <Button
              variant="outline"
              onClick={handleSave}
              className="border-primary text-primary hover:bg-primary/5"
            >
              {t('save')}
            </Button>
            <Button
              onClick={handleAcceptAll}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {t('acceptAll')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}