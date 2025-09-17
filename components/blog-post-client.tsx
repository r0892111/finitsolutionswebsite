"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { nl, enUS } from "date-fns/locale";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from 'next-intl';
import type { BlogPost } from "@/lib/types/blog";

interface BlogPostClientProps {
  post: BlogPost;
}

export function BlogPostClient({ post }: BlogPostClientProps) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleContactClick = useCallback(() => {
    // If we're already on the homepage, just scroll to contact
    if (pathname === `/${locale}`) {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage with hash
      router.push(`/${locale}/#contact`);
    }
  }, [pathname, router, locale]);

  useEffect(() => {
    setMounted(true);
    
    // Add click handler for project request triggers in blog content
    const handleProjectRequestClick = (e: Event) => {
      e.preventDefault();
      handleContactClick();
    };

    // Add event listeners to all project request triggers
    const triggers = document.querySelectorAll('.project-request-trigger');
    triggers.forEach(trigger => {
      trigger.addEventListener('click', handleProjectRequestClick);
    });

    // Cleanup
    return () => {
      triggers.forEach(trigger => {
        trigger.removeEventListener('click', handleProjectRequestClick);
      });
    };
  }, [handleContactClick]);

  if (!mounted) {
    return (
      <main className="pt-20">
        <section className="relative py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <div className="h-6 bg-primary/20 rounded w-20 mb-6"></div>
              <div className="h-12 bg-primary/20 rounded w-80 mb-6"></div>
              <div className="h-6 bg-primary/20 rounded w-96 mb-8"></div>
            </div>
          </div>
        </section>
        <div className="relative h-[400px] md:h-[600px] -mt-12 mb-12 bg-muted"></div>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <article>
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <Link 
                href={`/${locale}/blog`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <span>Blog</span> <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              {post.title}
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-6 text-muted-foreground mb-8"
            >
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <time>
                  {format(new Date(post.publishedAt), 'd MMMM yyyy', { 
                    locale: locale === 'nl' ? nl : enUS 
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>{post.author.name}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative h-[400px] md:h-[600px] -mt-12 mb-12"
        >
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            unoptimized
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="container mx-auto px-4 py-12"
        >
          <div className="max-w-3xl mx-auto">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </motion.div>
      </article>
    </main>
  );
}