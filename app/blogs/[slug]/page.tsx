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
  ChevronRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaXTwitter,
  FaWhatsapp,
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

  // 2 related posts for bottom section matching screenshot
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 2);

  const categories = [
    { name: "Travel Guide", slug: "travel-guide" },
    { name: "Resort & Stays", slug: "resort-stays" },
    { name: "Wildlife", slug: "wildlife" },
    { name: "Culture & Luxury", slug: "culture-luxury" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Global Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* ─── Hero Banner with Kingfisher Birds / Nature ─── */}
        <div className="relative w-full h-48 sm:h-56 lg:h-64 bg-[#0B132A] flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=2000&q=80"
            alt="Sundarban Nature Wilderness"
            fill
            priority
            className="object-cover opacity-35"
          />
          <div className="container relative z-10 text-center px-4">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#EAB308] tracking-wide mb-2 drop-shadow-md">
              Sundarban Winter Luxury Tour Package with Hotel Sonar Bangla
            </h2>
            <nav className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span>&gt;</span>
              <Link href="/blogs" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span>&gt;</span>
              <span className="text-white truncate max-w-[220px] sm:max-w-md">
                {post.title}
              </span>
            </nav>
          </div>
        </div>

        {/* ─── Main Container (Article on Left 68%, Sidebar on Right 32%) ─── */}
        <div className="container py-8 sm:py-10 lg:py-12">
          {/* Breadcrumb Back Link */}
          <div className="mb-5">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-[#1877F2] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Blogs</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ─── Left Column: Main Article Content (8 cols) ─── */}
            <article className="lg:col-span-8 text-left">
              {/* Category Link in Blue */}
              <Link
                href="/blogs"
                className="text-xs sm:text-sm font-semibold text-[#1877F2] hover:underline uppercase tracking-wider block mb-2 cursor-pointer"
              >
                {post.category || "Adventure & Wildlife"}
              </Link>

              {/* Main Article Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#0B132A] leading-tight mb-2.5">
                {post.title}
              </h1>

              {/* Author byline */}
              <p className="text-xs sm:text-[13px] text-gray-500 mb-3 font-normal">
                By {post.author.name}
              </p>

              {/* Meta Row: Date, Read Time with Clock, Tags */}
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-[13px] text-gray-500 pb-5 mb-6 border-b border-gray-150">
                <span>{post.date}</span>
                <span className="text-gray-300">|</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                  <span>{post.readTime}</span>
                </div>
                <span className="text-gray-300">|</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-medium cursor-pointer"
                    >
                      <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Main Featured Image with Diagonal Shine Hover Effect */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 bg-gray-100 shadow-xs image-shine cursor-pointer">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className="object-cover"
                />
              </div>

              {/* Green Callout Quote Box */}
              <div className="bg-[#F0FDF4] border-l-4 border-[#064E3B] p-5 sm:p-6 rounded-r-xl my-6 text-[#064E3B]">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#064E3B] shrink-0 mt-0.5 opacity-80" />
                  <p className="text-xs sm:text-sm font-medium leading-relaxed italic">
                    {post.content.sections[0]?.highlight ||
                      `Experience the mystical mangrove wilderness of the Sundarban Tiger Reserve in royal luxury with Hotel Sonar Bangla. Our premier winter safari brings you closer to the Bengal Tiger, spotted deer, and saltwater crocodiles.`}
                  </p>
                </div>
              </div>

              {/* Lead Paragraph */}
              <p className="text-sm sm:text-[15px] text-gray-700 leading-relaxed font-normal mb-6">
                {post.content.intro}
              </p>

              {/* Dynamic Content Sections */}
              <div className="space-y-7">
                {post.content.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-[#0B132A] tracking-tight">
                      {section.heading}
                    </h2>

                    {section.paragraphs.map((p, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal"
                      >
                        {p}
                      </p>
                    ))}

                    {/* Section Image if present */}
                    {section.image && (
                      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden my-5 bg-gray-100 image-shine">
                        <Image
                          src={section.image}
                          alt={section.heading}
                          fill
                          sizes="(max-width: 1024px) 100vw, 68vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Essential Travel Tips Box */}
              {post.content.tips && post.content.tips.length > 0 && (
                <div className="my-8 p-5 sm:p-6 rounded-xl bg-gray-50 border border-gray-200">
                  <h3 className="text-base sm:text-lg font-bold text-[#0B132A] mb-3 flex items-center gap-2">
                    <Tag className="w-4 h-4 text-[#064E3B]" />
                    <span>Essential Travel Tips for this Journey</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {post.content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Conclusion Section */}
              <div className="pt-2 pb-5">
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal">
                  {post.content.conclusion}
                </p>
              </div>

              {/* Tags & Social Share Row */}
              <div className="py-5 border-y border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 mr-1">
                    Tags:
                  </span>
                  {(post.tags || ["Sundarban", "Wildlife", "Tiger Trail"]).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-medium cursor-pointer hover:bg-amber-100/70 transition-colors"
                    >
                      <Tag className="w-2.5 h-2.5 text-amber-500 fill-amber-500 shrink-0" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>

                {/* Social Share Icons */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share:</span>
                  </span>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on X"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  >
                    <FaXTwitter className="w-3 h-3" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#1877F2] hover:text-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  >
                    <FaFacebookF className="w-3 h-3" />
                  </a>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on WhatsApp"
                    className="w-7 h-7 rounded-full bg-gray-100 hover:bg-[#25D366] hover:text-white flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  >
                    <FaWhatsapp className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Mint Green Call-to-Action Card */}
              <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#064E3B] mb-1">
                    Looking for a Custom Sundarban Tour Package?
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-normal max-w-md">
                    Get in touch with our certified naturalists and resort booking specialists to plan your private safari.
                  </p>
                </div>
                <Link
                  href="/contact-us"
                  className="px-6 py-2.5 rounded-full bg-[#064E3B] hover:bg-[#053B2D] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all whitespace-nowrap cursor-pointer shrink-0"
                >
                  Contact Us
                </Link>
              </div>
            </article>

            {/* ─── Right Column: Sidebar (4 cols) ─── */}
            <aside className="lg:col-span-4 space-y-7 lg:sticky lg:top-24 text-left">
              {/* 1. Search Bar Widget */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search Here..."
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-lg border border-gray-200 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#1877F2] transition-colors"
                  />
                  <button
                    type="button"
                    aria-label="Search"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1877F2] cursor-pointer"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2. Recent Posts Widget */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Recent Posts
                  </h4>
                  <div className="h-0.5 w-10 bg-[#064E3B] mt-1.5 mb-4" />
                </div>
                <div className="space-y-3.5">
                  {recentPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blogs/${rPost.slug}`}
                      className="flex items-center gap-3 group cursor-pointer bg-[#F8FAFC] hover:bg-emerald-50/50 p-2 rounded-lg border border-gray-100 transition-colors"
                    >
                      <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gray-100 image-shine">
                        <Image
                          src={rPost.image}
                          alt={rPost.title}
                          fill
                          sizes="56px"
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-gray-800 group-hover:text-[#1877F2] transition-colors line-clamp-2 leading-snug">
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
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Categories
                  </h4>
                  <div className="h-0.5 w-10 bg-[#064E3B] mt-1.5 mb-3" />
                </div>
                <div className="divide-y divide-gray-100">
                  {categories.map((cat, idx) => (
                    <Link
                      key={idx}
                      href="/blogs"
                      className="flex items-center justify-between text-xs sm:text-sm text-gray-600 hover:text-[#1877F2] transition-colors py-2 cursor-pointer group"
                    >
                      <span className="font-medium">{cat.name}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* 4. Contact Info Widget */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Contact Info
                  </h4>
                  <div className="h-0.5 w-10 bg-[#064E3B] mt-1.5 mb-3.5" />
                </div>
                <div className="space-y-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900">+91 70014 56789</p>
                      <p className="text-[11px] text-gray-400">Toll Free: 1800 456 7890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">booking@krikotrip.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#064E3B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-normal text-gray-600">Kolkata, West Bengal, India</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. Follow Us Social Widget with Green Circular Buttons */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Follow Us
                  </h4>
                  <div className="h-0.5 w-10 bg-[#064E3B] mt-1.5 mb-3.5" />
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-[#064E3B] hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-8 h-8 rounded-full bg-[#064E3B] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/?text=Sundarban"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-8 h-8 rounded-full bg-[#064E3B] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 6. Subscribe to Our Newsletter (Dark Green Card from Screenshot) */}
              <div className="bg-[#064E3B] text-white rounded-xl p-5 shadow-sm text-left">
                <h4 className="text-sm sm:text-base font-bold text-white mb-1.5">
                  Subscribe to Our Newsletter
                </h4>
                <p className="text-xs text-emerald-100/90 font-normal leading-relaxed mb-3.5">
                  Get the latest updates and travel guides right in your inbox.
                </p>
                <div className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 rounded-md bg-[#075944] border border-white/20 text-white placeholder:text-gray-300 text-xs focus:outline-none focus:bg-[#096a52] transition-colors font-normal"
                  />
                  <button
                    type="button"
                    className="w-full py-2 rounded-md bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ─── Bottom Section: 2 Related Blog Posts matching screenshot ─── */}
        <section className="bg-[#F8FAFC] py-8 sm:py-16 border-t border-gray-200">
          <div className="container">
            {/* Header: Subtitle & Title */}
            <div className="mb-8 text-left">

              <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132A] mt-2 tracking-tight">
                Related Blog Posts
              </h2>
            </div>

            {/* 2-Column Responsive Grid matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7">
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
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                    </Link>

                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                      <span className="px-2.5 py-0.5 rounded-md bg-white text-gray-800 text-[11px] font-bold tracking-wide uppercase shadow-xs border border-gray-100">
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
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                          <span>{rPost.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 mb-2.5">
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
                            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#FFF9EE] border border-[#FEEFD6] text-[#78350F] text-xs font-semibold cursor-pointer hover:bg-amber-100/70 transition-colors"
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
                        className="text-[13px] sm:text-[13.5px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors cursor-pointer"
                      >
                        Read Article
                      </Link>
                      <Link
                        href={`/blogs/${rPost.slug}`}
                        aria-label={`Read article: ${rPost.title}`}
                        className="text-gray-900 group-hover:text-[#1877F2] transition-transform duration-200 group-hover:translate-x-1 cursor-pointer flex items-center justify-center p-1"
                      >
                        <ArrowRight className="w-4 h-4 stroke-[2]" />
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
