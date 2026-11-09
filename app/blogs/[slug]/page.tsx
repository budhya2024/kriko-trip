import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/shared";
import { blogPosts } from "@/components/blogs/data";
import {
  Calendar,
  Clock,
  Tag,
  Share2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Search,
  Quote,
  MessageCircle,
  ChevronRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

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

  // 4 recent posts for sidebar
  const recentPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 4);

  // 3 related posts for bottom section
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  const categories = [
    { name: "Travel Guide", count: 4 },
    { name: "Resort & Stays", count: 3 },
    { name: "Adventure & Wildlife", count: 2 },
    { name: "Culture & Luxury", count: 3 },
    { name: "Beach & Islands", count: 2 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Clean, Compact Scenic Top Hero Strip with Breadcrumbs */}
        <div className="relative w-full h-36 sm:h-44 bg-slate-900 flex items-center justify-center overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            className="object-cover opacity-30"
          />
          <div className="container relative z-10 text-center">
            <nav className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-500">/</span>
              <Link href="/blogs" className="hover:text-white transition-colors">
                Blogs
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-white truncate max-w-[200px] sm:max-w-md font-normal">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* ─── Main Content Container (Article Left + Sidebar Right) ─── */}
        <div className="container py-8 sm:py-12 lg:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ─── Left Column: Main Article Body (8 cols) ─── */}
            <article className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 p-5 sm:p-8 lg:p-9 shadow-xs">
              {/* Back to Blogs link */}
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-gray-500 hover:text-[#1877F2] transition-colors mb-4 cursor-pointer group"
              >
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Back to Blogs</span>
              </Link>

              {/* Main Article Title (Medium font weight - no heavy bold) */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-medium text-gray-900 leading-snug tracking-tight mb-3">
                {post.title}
              </h1>

              {/* Meta Row: Date, Read Time, Category Badge, Author (Clean regular weight) */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 text-xs sm:text-[13px] text-gray-500 pb-5 mb-6 border-b border-gray-150 font-normal">
                <div className="flex items-center gap-1.5 text-gray-500">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  <span>{post.date}</span>
                </div>

                <span className="text-gray-300">|</span>

                <div className="flex items-center gap-1.5 text-gray-500">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={1.8} />
                  <span>{post.readTime}</span>
                </div>

                <span className="text-gray-300">|</span>

                <span className="px-2 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-[11px] font-normal uppercase tracking-wider">
                  {post.badge || post.category || "TRAVEL GUIDE"}
                </span>

                <span className="text-gray-300 hidden sm:inline">|</span>

                <span className="text-gray-500 hidden sm:inline">
                  By {post.author.name}
                </span>
              </div>

              {/* Featured Image with Diagonal Shine Hover Effect */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gray-100 shadow-xs image-shine cursor-pointer">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>

              {/* Callout Quote Box (Green Theme matching screenshot) */}
              <div className="bg-[#F0FDF4] border-l-4 border-[#064E3B] p-4 sm:p-5 rounded-r-xl my-6 text-[#064E3B]">
                <div className="flex items-start gap-2.5">
                  <Quote className="w-5 h-5 text-[#064E3B] shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs sm:text-sm font-normal leading-relaxed italic">
                    {post.content.sections[0]?.highlight ||
                      `Experience the ultimate blend of untamed wilderness and five-star eco-luxury at ${post.title}. From scenic river-view suites to curated tiger safaris, indulge in an unforgettable journey.`}
                  </p>
                </div>
              </div>

              {/* Lead Introduction Paragraph */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-normal mb-6">
                {post.content.intro}
              </p>

              {/* Content Sections */}
              <div className="space-y-6">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2 className="text-lg sm:text-xl font-medium text-gray-900 tracking-tight">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal"
                      >
                        {p}
                      </p>
                    ))}

                    {/* Section Image if available */}
                    {section.image && (
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden my-5 bg-gray-100 image-shine">
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

              {/* Travel Tips / Highlights Box */}
              {post.content.tips && post.content.tips.length > 0 && (
                <div className="my-7 p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200/90">
                  <h3 className="text-sm sm:text-[15px] font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#064E3B]" />
                    <span>Essential Travel Tips for this Journey</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {post.content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-600 font-normal leading-normal">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Conclusion Section */}
              <div className="pt-2 pb-5">
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-normal">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Tags & Social Share Bar */}
              <div className="py-5 border-y border-gray-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-gray-400 font-normal mr-1">
                    Tags:
                  </span>
                  {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail", "Luxury Resort"]).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-normal cursor-pointer hover:bg-amber-100/70 transition-colors"
                    >
                      <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Social Share Icons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-normal mr-1 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share:</span>
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                  >
                    <FaXTwitter className="w-3 h-3" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                  >
                    <FaFacebookF className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-gray-600 transition-colors cursor-pointer"
                  >
                    <FaWhatsapp className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Big Call-to-Action Card (Green Card from Screenshot) */}
              <div className="mt-8 p-5 sm:p-7 rounded-2xl bg-[#F0FDF4] border border-[#DCFCE7] flex flex-col sm:flex-row items-center justify-between gap-5">
                <div>
                  <h3 className="text-base sm:text-lg font-medium text-[#064E3B] mb-1">
                    Looking for a Custom Sundarban Package?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-md">
                    Connect with our luxury resort specialists for private charters, customized wildlife itineraries, and five-star hospitality.
                  </p>
                </div>
                <Link
                  href="/contact-us"
                  className="px-5 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#043729] text-white text-xs sm:text-sm font-medium shadow-sm transition-all whitespace-nowrap cursor-pointer inline-flex items-center gap-2 shrink-0"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </article>

            {/* ─── Right Column: Sidebar (4 cols) ─── */}
            <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
              {/* 1. Search Bar Widget */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                <h4 className="text-xs sm:text-sm font-medium text-gray-900 uppercase tracking-wide mb-3">
                  Search
                </h4>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-3.5 pr-10 py-2 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] transition-colors"
                  />
                  <button
                    type="button"
                    aria-label="Search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1877F2] cursor-pointer"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 2. Recent Posts Widget */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">
                  Recent Posts
                </h4>
                <div className="space-y-3.5">
                  {recentPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blogs/${rPost.slug}`}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-gray-100 image-shine">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-normal text-gray-800 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
                          {rPost.title}
                        </h5>
                        <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1 font-normal">
                          <Calendar className="w-3 h-3 text-gray-300" />
                          <span>{rPost.date}</span>
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 3. Categories Widget */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">
                  Categories
                </h4>
                <div className="space-y-2">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href="/blogs"
                      className="flex items-center justify-between text-xs sm:text-sm text-gray-600 hover:text-[#1877F2] transition-colors py-1 cursor-pointer group"
                    >
                      <span className="font-normal flex items-center gap-1.5">
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                        <span>{cat.name}</span>
                      </span>
                      <span className="text-[11px] text-gray-400 font-normal bg-gray-50 px-2 py-0.5 rounded-full group-hover:bg-blue-50 group-hover:text-[#1877F2] transition-colors">
                        ({cat.count})
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4. Contact Info Widget */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">
                  Contact Info
                </h4>
                <div className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-normal">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">+91 70014 56789</p>
                      <p className="text-[11px] text-gray-400">Toll Free: 1800 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-800">booking@krikotrip.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-normal text-gray-600">Kolkata, West Bengal, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Follow Us Social Widget */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs">
                <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-3 pb-2 border-b border-gray-100">
                  Follow Us
                </h4>
                <div className="flex items-center gap-2">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#1877F2] text-gray-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#E1306C] text-gray-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaInstagram className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-black text-gray-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-[#FF0000] text-gray-600 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <FaYoutube className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 6. Subscribe to Newsletter (Dark Green Card from Screenshot) */}
              <div className="bg-[#064E3B] text-white rounded-2xl p-5 shadow-md text-left">
                <h4 className="text-sm sm:text-base font-medium text-white mb-1.5">
                  Subscribe to Our Newsletter
                </h4>
                <p className="text-xs text-emerald-100/90 font-normal leading-relaxed mb-3.5">
                  Get the latest travel guides, luxury resort deals, and seasonal discounts delivered straight to your inbox.
                </p>
                <div className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-lg bg-white/15 border border-white/20 text-white placeholder:text-emerald-100 text-xs focus:outline-none focus:bg-white/25 transition-colors font-normal"
                  />
                  <button
                    type="button"
                    className="w-full py-2 rounded-lg bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-medium uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ─── Bottom Section: Related Blog Posts ("Related Articles") ─── */}
        <section className="bg-white py-10 sm:py-14 border-t border-gray-200/80">
          <div className="container">
            {/* Header: Subtitle & Title */}
            <div className="mb-6 sm:mb-8 text-left">
              <span className="text-[11px] font-normal uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-100">
                Recent Inspirations
              </span>
              <h2 className="text-xl sm:text-2xl font-medium text-gray-900 mt-2 tracking-tight">
                Related Blog Posts
              </h2>
            </div>

            {/* 3-Column Responsive Grid matching Blog List Design */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {relatedPosts.map((rPost) => (
                <article
                  key={rPost.slug}
                  className="bg-white rounded-2xl border border-gray-200/90 transition-colors duration-200 overflow-hidden flex flex-col group h-full cursor-pointer hover:border-gray-300"
                >
                  {/* Top: Image with Badge & Diagonal Shine Hover */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer image-shine">
                    <Link href={`/blogs/${rPost.slug}`} className="block w-full h-full relative cursor-pointer">
                      <Image
                        src={rPost.image}
                        alt={rPost.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-md bg-white text-gray-800 text-[11px] font-normal tracking-wide uppercase shadow-xs border border-gray-100">
                        {rPost.badge || rPost.category || "TRAVEL GUIDE"}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between text-left">
                    <div>
                      {/* Meta Line: Date | Clock Read Time */}
                      <div className="flex items-center gap-2 text-xs text-gray-400 font-normal mb-2.5">
                        <span>{rPost.date}</span>
                        <span className="text-gray-300 font-light">|</span>
                        <div className="flex items-center gap-1.5 text-gray-500 font-normal">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={1.8} />
                          <span>{rPost.readTime}</span>
                        </div>
                      </div>

                      {/* Title (Normal/Medium font weight) */}
                      <h3 className="text-[16px] sm:text-[17px] font-medium text-gray-900 group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 mb-2.5">
                        <Link href={`/blogs/${rPost.slug}`} className="cursor-pointer">
                          {rPost.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 mb-3.5 font-normal">
                        {rPost.excerpt}
                      </p>

                      {/* Amber Styled Tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mb-4">
                        {(rPost.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-normal cursor-pointer hover:bg-amber-100/70 transition-colors"
                          >
                            <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer: Read Article → */}
                    <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                      <Link
                        href={`/blogs/${rPost.slug}`}
                        className="text-[13px] sm:text-[13.5px] font-medium text-gray-700 group-hover:text-[#1877F2] transition-colors cursor-pointer"
                      >
                        Read Article
                      </Link>
                      <Link
                        href={`/blogs/${rPost.slug}`}
                        aria-label={`Read article: ${rPost.title}`}
                        className="text-gray-600 group-hover:text-[#1877F2] transition-transform duration-200 group-hover:translate-x-1 cursor-pointer flex items-center justify-center p-1"
                      >
                        <ArrowRight className="w-4 h-4 stroke-[1.8]" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
