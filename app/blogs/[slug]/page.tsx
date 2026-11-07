import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer, PageHeader } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import {
  MapPin,
  Calendar,
  Clock,
  Tag,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FaFacebookF, FaXTwitter, FaWhatsapp } from "react-icons/fa6";

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Blog Not Found | KrikoTrip" };

  return {
    title: `${post.title} | KrikoTrip Blog`,
    description: post.excerpt,
  };
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params;
  const postIndex = blogPosts.findIndex((p) => p.slug === slug);

  if (postIndex === -1) {
    notFound();
  }

  const post = blogPosts[postIndex];
  const prevPost = postIndex > 0 ? blogPosts[postIndex - 1] : null;
  const nextPost = postIndex < blogPosts.length - 1 ? blogPosts[postIndex + 1] : null;
  const recentPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Left-Aligned Page Header with Scenic Background */}
        <PageHeader
          title={post.title}
          subtitle={`A destination story from ${post.location} • By ${post.author.name}`}
          breadcrumb={post.title}
          bgImage={post.image}
        />

        <div className="container py-12 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ─── Left Column: Article Body (8 cols) ─── */}
            <article className="lg:col-span-8">
              {/* Meta Info Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-gray-150 mb-8">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={post.author.avatar}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      {post.author.role}
                    </p>
                  </div>
                </div>

                {/* Date, Location & Read Time */}
                <div className="flex items-center gap-3 text-xs text-gray-600 font-medium">
                  <span className="inline-flex items-center gap-1 text-gray-900 font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#1877F2]" />
                    {post.location}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-gray-400" />
                    {post.date}
                  </span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {post.readTime}
                  </span>
                </div>
              </div>

              {/* Main Featured Photo */}
              <div className="relative w-full h-[320px] sm:h-[420px] lg:h-[460px] rounded-2xl overflow-hidden mb-8 shadow-xs image-shine">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal mb-8">
                {post.content.intro}
              </p>

              {/* Dynamic Content Sections */}
              <div className="space-y-8">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal"
                      >
                        {p}
                      </p>
                    ))}

                    {/* Styled Callout Quote */}
                    {section.highlight && (
                      <blockquote className="my-6 p-5 rounded-xl bg-blue-50/70 border-l-4 border-[#1877F2] text-sm sm:text-[15px] font-medium text-gray-800 leading-relaxed italic">
                        {section.highlight}
                      </blockquote>
                    )}

                    {/* Section Image */}
                    {section.image && (
                      <div className="relative w-full h-[260px] sm:h-[340px] rounded-xl overflow-hidden my-6">
                        <Image
                          src={section.image}
                          alt={section.heading}
                          fill
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Travel Tips Box */}
              {post.content.tips && post.content.tips.length > 0 && (
                <div className="my-10 p-6 sm:p-7 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-gray-950 mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#1877F2]" />
                    <span>Essential Travel Tips for this Journey</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {post.content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#1877F2] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Conclusion */}
              <div className="pt-2 pb-6 border-b border-gray-150">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Share & Tags */}
              <div className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category:
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-blue-50 text-[#1877F2] text-xs font-semibold">
                    {post.category}
                  </span>
                </div>

                {/* Social Share Buttons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-gray-500 mr-1 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share:</span>
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      post.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-gray-700 transition-colors"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Next & Previous Article Navigation */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {prevPost ? (
                  <Link
                    href={`/blogs/${prevPost.slug}`}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gray-50/50 transition-all group flex flex-col text-left"
                  >
                    <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mb-1">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      <span>Previous Story</span>
                    </span>
                    <span className="text-sm font-bold text-gray-900 group-hover:text-[#1877F2] line-clamp-1">
                      {prevPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}

                {nextPost ? (
                  <Link
                    href={`/blogs/${nextPost.slug}`}
                    className="p-4 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gray-50/50 transition-all group flex flex-col text-right sm:items-end"
                  >
                    <span className="text-xs font-semibold text-gray-400 flex items-center gap-1 mb-1">
                      <span>Next Story</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-sm font-bold text-gray-900 group-hover:text-[#1877F2] line-clamp-1">
                      {nextPost.title}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>

            {/* ─── Right Column: Sidebar (4 cols) ─── */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
              {/* Need Help Booking CTA Box */}
              <div className="bg-[#08182B] text-white rounded-xl p-6 shadow-xs relative overflow-hidden">
                <h4 className="text-lg font-bold text-white mb-2">
                  Inspired by this trip?
                </h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-5">
                  Let our travel specialists customize this exact itinerary for you
                  with exclusive resort discounts and private guides.
                </p>
                <div className="space-y-2.5">
                  <a
                    href="https://wa.me/18004567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold transition-all shadow-xs"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                  <a
                    href="tel:+18004567890"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/15"
                  >
                    <Phone className="w-4 h-4 text-[#1877F2]" />
                    <span>Call Travel Expert</span>
                  </a>
                </div>
              </div>

              {/* Recent Stories Widget */}
              <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-xs">
                <h4 className="text-base font-bold text-gray-950 mb-4 pb-2 border-b border-gray-150">
                  Recent Stories
                </h4>
                <div className="space-y-4">
                  {recentPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blogs/${rPost.slug}`}
                      className="flex items-center gap-3.5 group"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 image-shine">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          sizes="64px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs sm:text-[13px] font-bold text-gray-900 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
                          {rPost.title}
                        </h5>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {rPost.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* All Articles Link */}
              <div className="text-center pt-2">
                <Link
                  href="/blogs"
                  className="text-xs font-bold text-[#1877F2] hover:underline"
                >
                  ← Back to All Travel Inspirations
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

