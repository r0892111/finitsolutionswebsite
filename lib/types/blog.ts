export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  publishedAt: string;
  featuredImage: string;
  author: {
    name: string;
    image: string;
  };
  tags: string[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}