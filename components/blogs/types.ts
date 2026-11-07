export interface BlogPost {
  slug: string;
  title: string;
  location: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  category: string;
  badge?: string;
  tags?: string[];
  readTime: string;
  image: string;
  excerpt: string;
  content: {
    intro: string;
    sections: {
      heading: string;
      paragraphs: string[];
      highlight?: string;
      image?: string;
    }[];
    tips: string[];
    conclusion: string;
  };
}

