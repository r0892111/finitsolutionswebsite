import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPost } from "@/lib/types/blog";
import { BlogPostClient } from "@/components/blog-post-client";
import { blogPosts } from "@/lib/blog-data";

export function generateStaticParams() {
  const locales = ['en', 'nl'];
  const params = [];
  
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({
        locale,
        slug: post.slug,
      });
    }
  }
  
  return params;
}

export function generateMetadata({ params }: { params: { slug: string; locale: string } }): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found | Finit Solutions',
      description: 'The requested blog post could not be found.'
    };
  }

  return {
    title: `${post.title} | Finit Solutions Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
    authors: [{ name: post.author.name }],
  };
}

export default function BlogPostPage({ params }: { params: { slug: string; locale: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}