"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { CookieSettingsLink } from "@/components/cookie-settings-link";
import { useLanguage } from "@/contexts/language-context";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-background border-t relative">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center"
            >
              <div className="w-32 h-auto relative">
                <Image
                  src="/Finit Logo Blue@4x.png"
                  alt="Finit Solutions Logo"
                  width={128}
                  height={64}
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              {t('footer.tagline').split(' ').map((word, index) => {
                if (word === 'Slimme' || word === 'Smart') return <strong key={index}>{word} </strong>;
                if (word === 'jouw' || word === 'your') return <strong key={index}>{word} </strong>;
                if (word === 'KMO.' || word === 'SME.') return <strong key={index}>{word}</strong>;
                return word + ' ';
              })}
            </p>
            <p className="text-muted-foreground text-sm">
              BTW: BE1020600643
            </p>
            <div className="flex space-x-4 pt-2">
              <Link 
                href="https://www.linkedin.com/company/finitsolutions/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.menu')}</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", href: "/" },
                { name: t('nav.services'), href: "/diensten" },
                { name: t('nav.marketplace'), href: "/marketplace" },
                { name: "Blog", href: "/blog" },
                { name: t('nav.about'), href: "/about" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2">
              {[
                { name: "Sales & CRM", href: "/diensten" },
                { name: "Marketing & Content", href: "/diensten" },
                { name: "Customer Support", href: "/diensten" },
                { name: "Business Intelligence", href: "/diensten" },
                { name: "Human Resources", href: "/diensten" },
                { name: "Operations & Logistiek", href: "/diensten" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground text-sm">
                  Keerbergen, België
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>+32 (0)495 702 314</p>
                  <p>+32 (0)468 029 945</p>
                </div>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary shrink-0" />
                <span className="text-muted-foreground text-sm">
                  contact@finitsolutions.be
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Finit Solutions. {t('footer.copyright')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link 
              href="/privacy" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.privacy')}
            </Link>
            <Link 
              href="/cookieverklaring" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.cookies')}
            </Link>
            <Link 
              href="/disclaimer" 
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {t('footer.disclaimer')}
            </Link>
            <CookieSettingsLink />
          </div>
        </div>
      </div>
    </footer>
  );
}