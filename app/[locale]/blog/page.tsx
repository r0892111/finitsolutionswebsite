"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { nl, enUS } from "date-fns/locale";
import { useTranslations, useLocale } from 'next-intl';

type SortOption = "newest" | "oldest";

export default function BlogPage() {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('blog');
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Sort blog posts based on selected option
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const dateA = new Date(a.publishedAt);
    const dateB = new Date(b.publishedAt);
    
    if (sortBy === "newest") {
      return dateB.getTime() - dateA.getTime();
    } else {
      return dateA.getTime() - dateB.getTime();
    }
  });

  const sortOptions = [
    { value: "newest" as SortOption, label: t('sort.newest') },
    { value: "oldest" as SortOption, label: t('sort.oldest') }
  ];

  const getArticleCountText = (count: number) => {
    if (count === 1) {
      return t('articlesCount', { count });
    }
    return t('articlesCountPlural', { count });
  };

  // Simple loading state without complex animations
  if (!mounted) {
    return (
      <main className="pt-20">
        <section className="relative py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <div className="h-6 bg-primary/20 rounded w-20 mb-6"></div>
              <div className="h-12 bg-primary/20 rounded w-80 mb-6"></div>
              <div className="h-6 bg-primary/20 rounded w-96 mb-12"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-background rounded-lg border">
                  <div className="h-48 bg-muted"></div>
                  <div className="p-6">
                    <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-muted rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="relative py-16 md:py-24 bg-muted">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary mb-6"
          >
            <span>Blog</span> <ChevronRight className="h-4 w-4 ml-1" />
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            {t('title')}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg mb-12 max-w-2xl"
          >
            {t('description')}
          </motion.p>

          {/* Sorting Controls */}
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {getArticleCountText(sortedPosts.length)}
              </span>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative"
            >
              <Button
                variant="outline"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 min-w-[160px] justify-between"
              >
                <span>{sortOptions.find(option => option.value === sortBy)?.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>
              
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 bg-background border rounded-lg shadow-lg z-10 min-w-[160px]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2 text-left hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        sortBy === option.value ? 'bg-primary/10 text-primary' : ''
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
              >
                <Link href={`/${locale}/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index < 3}
                        unoptimized
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex gap-2 mb-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="relative w-8 h-8">
                            <Image
                              src={post.author.image}
                              alt={post.author.name}
                              fill
                              className="object-cover rounded-full"
                              sizes="32px"
                              unoptimized
                            />
                          </div>
                          <span className="text-sm">{post.author.name}</span>
                        </div>
                        <time className="text-sm text-muted-foreground">
                          {format(new Date(post.publishedAt), 'd MMMM yyyy', { 
                            locale: locale === 'nl' ? nl : enUS 
                          })}
                        </time>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}