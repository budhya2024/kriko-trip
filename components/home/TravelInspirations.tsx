import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { getBlogs } from "@/lib/api/server/blogs";

interface DisplayPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  authorName: string;
  authorAvatar?: string;
  publishedDate: string;
}

const FALLBACK_POSTS: DisplayPost[] = [
  {
    slug: "tropical-escapes-beach-getaways",
    title: "Tropical Escapes: The Best Beach Getaways Around The Globe",
    excerpt: "From turquoise waters and swaying palms to powdery white sands, explore the most breathtaking coastal destinations for your next seaside adventure.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    authorName: "Ananya Sharma",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    publishedDate: "Nov 15, 2024",
  },
  {
    slug: "crystal-clear-waters-white-sands",
    title: "Crystal-Clear Waters: Must-Visit White Sand Beaches",
    excerpt: "Discover hidden coves, vibrant coral reefs, and pristine shores across the Maldives, Andaman, and Lakshadweep that promise pure relaxation.",
    coverImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    authorName: "Vikram Malhotra",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    publishedDate: "Nov 10, 2024",
  },
];

export default async function TravelInspirations() {
  const result = await getBlogs({ page: 1, limit: 2 });
  const posts: DisplayPost[] =
    result.items.length > 0
      ? result.items.slice(0, 2).map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          coverImage: item.coverUrl,
          authorName: item.author.name,
          authorAvatar: item.author.avatarUrl || undefined,
          publishedDate: item.publishedAt
            ? new Date(item.publishedAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "Recent",
        }))
      : FALLBACK_POSTS;

  return (
    <section className="w-full pb-8 md:pb-16 bg-white">
      <div className="container relative">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-12 relative">
          <h2 className="section-title">
            Travel Inspirations
          </h2>
          <p className="section-details max-w-xl mx-auto">
            A curated list of inspiration the most tour &amp; travel based on different destinations.
          </p>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-200 transition-colors duration-200 overflow-hidden flex flex-col sm:flex-row group"
              >
                <div className="relative w-full sm:w-[45%] h-52 sm:h-72 md:h-80 overflow-hidden bg-gray-100 shrink-0 image-shine">
                  <Link href={`/blogs/${post.slug}`} className="block w-full h-full relative">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </Link>
                </div>

                <div className="p-4 sm:p-7 flex flex-col justify-center flex-1 text-left">
                  <div className="flex items-center gap-2 text-xs sm:text-[13px] text-gray-500 font-normal mb-2 sm:mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <div className="relative w-5 h-5 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                        <Image
                          src={
                            post.authorAvatar ||
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                          }
                          alt={post.authorName}
                          fill
                          sizes="20px"
                          className="object-cover rounded-full"
                        />
                      </div>
                      <span className="font-semibold text-gray-800">
                        {post.authorName}
                      </span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                      <span>{post.publishedDate}</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-xl md:text-2xl font-semibold text-gray-950 leading-snug tracking-tight mb-2 sm:mb-2.5">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-[#1877F2] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-gray-500 leading-relaxed font-normal line-clamp-2 sm:line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
