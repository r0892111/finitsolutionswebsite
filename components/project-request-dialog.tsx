"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from 'next-intl';

interface ProjectRequestDialogProps {
  buttonText?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link";
  buttonClassName?: string;
  buttonProps?: Record<string, any>;
}

export function ProjectRequestDialog({ 
  buttonText = "Start je project", 
  buttonVariant = "default", 
  buttonClassName = "",
  buttonProps = {}
}: ProjectRequestDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleContactClick = () => {
    // If we're already on the homepage, just scroll to contact
    if (pathname === `/${locale}` || pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`/${locale}#contact`);
    }
  };

  return (
    <Button 
      onClick={handleContactClick} 
      size="lg"
      variant={buttonVariant}
      className={`group ${buttonClassName}`}
      {...buttonProps}
    >
      {buttonText}
      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}