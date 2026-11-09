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
  User,
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
        {/* ─── TOP BREADCRUMB & TITLE HERO BANNER (With Background Image, Black Layer & 350px Desktop Height) ─── */}
        <section className="relative w-full overflow-hidden bg-black h-[240px] sm:h-[280px] lg:h-[350px] flex items-center">
          {/* Background Image with Black Layer Above */}
          <div className="absolute inset-0 z-0">
            <Image
              src={post.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"}
              alt={post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
            {/* Black Layer Above Image */}
            <div className="absolute inset-0 bg-black/60" />
          </div>

          {/* Decorative Subtle Concentric Rings */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full border border-white/10 pointer-events-none z-10" />
          <div className="absolute -bottom-24 -right-12 w-64 h-64 rounded-full border border-white/5 pointer-events-none z-10" />

          {/* Content Container */}
          <div className="container relative z-20 text-left px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                {/* Breadcrumb Navigation on Top */}
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-xs sm:text-[13px] text-white/80 mb-3 font-normal"
                >
                  <Link
                    href="/"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </Link>
                  <span className="text-white/40">/</span>
                  <Link
                    href="/blogs"
                    className="hover:text-white transition-colors"
                  >
                    Blogs
                  </Link>
                  <span className="text-white/40">/</span>
                  <span className="text-sky-300 font-medium truncate max-w-xs sm:max-w-md">
                    {post.title}
                  </span>
                </nav>

                {/* Hero Title */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  {post.title}
                </h1>
              </div>

              {/* Quick Actions on Right */}
              <div className="flex items-center gap-3 text-xs sm:text-sm shrink-0 self-start md:self-center">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer backdrop-blur-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-white/70" />
                  <span>Back to Blogs</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Main Container (Article on Left 68%, Sidebar on Right 32%) ─── */}
        <div className="container py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* ─── Left Column: Main Article Content (8 cols) ─── */}
            <article className="lg:col-span-8 text-left">
              {/* Blog Title & Meta Details Matching Reference Format */}
              <div className="mb-6">
                {/* Article Heading (Small, Clean Font Size) */}
                <h1 className="text-xl sm:text-2xl lg:text-[25px] font-bold text-[#00285C] tracking-tight leading-snug mb-3.5">
                  {post.title}
                </h1>

                {/* Meta Row: Author & Date on Left, Tags on Right */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/80">
                  {/* Left: Author & Date/Reading Time in 2 Stacked Lines */}
                  <div>
                    {/* Line 1: Author */}
                    <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-[#004D40]">
                      <User className="w-3.5 h-3.5 text-teal-800 shrink-0 stroke-[2.2]" />
                      <span>{post.author.name}</span>
                    </div>

                    {/* Line 2: Date & Read Time */}
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400 mt-1 font-normal">
                      <span>{post.date}</span>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3 text-amber-500 shrink-0" strokeWidth={2} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: Tag Pills Matching Screenshot */}
                  <div className="flex flex-wrap items-center gap-2">
                    {(post.tags && post.tags.length > 0
                      ? post.tags
                      : [post.category || "Sundarban", "Wildlife", "Tiger Trail"]
                    ).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9E6] text-[#B45309] text-[11px] sm:text-xs font-medium border border-[#FDE68A]/60 shadow-2xs"
                      >
                        <Tag className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {/* Main Featured Image with Diagonal Shine Hover Effect */}
              <div className="relative w-full aspect-[16/10]  overflow-hidden mb-6   image-shine cursor-pointer">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className="object-cover"
                />
              </div>

              {/* Brand Logo Palette Callout Quote Box */}
              <div className="bg-blue-50/80 border-l-4 border-[#03ADFF] p-5 sm:p-6 rounded-r-xl my-6 text-[#00285C]">
                <div className="flex items-start gap-3">
                  <Quote className="w-5 h-5 text-[#03ADFF] shrink-0 mt-0.5 opacity-90" />
                  <p className="text-xs sm:text-sm font-medium leading-relaxed italic text-[#00285C]">
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
                    <Tag className="w-4 h-4 text-[#03ADFF]" />
                    <span>Essential Travel Tips for this Journey</span>
                  </h3>
                  <ul className="space-y-2.5">
                    {post.content.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 leading-normal">
                        <CheckCircle2 className="w-4 h-4 text-[#03ADFF] shrink-0 mt-0.5" />
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

              {/* Author Info & Social Share Row */}
              <div className="py-5 border-y border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100 border border-gray-200 shrink-0">
                    <Image
                      src={post.author.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 leading-none">Written by</p>
                    <p className="text-sm font-bold text-[#00285C] mt-1">{post.author.name}</p>
                  </div>
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


            </article>

            {/* ─── Right Column: Sidebar (4 cols) ─── */}
            <aside className="lg:col-span-4 space-y-7 lg:sticky lg:top-24 text-left">


              {/* 2. Recent Posts Widget */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Recent Posts
                  </h4>
                  <div className="h-0.5 w-10 bg-[#03ADFF] mt-1.5 mb-4" />
                </div>
                <div className="space-y-3.5">
                  {recentPosts.map((rPost) => (
                    <Link
                      key={rPost.slug}
                      href={`/blogs/${rPost.slug}`}
                      className="flex items-center gap-3 group cursor-pointer bg-[#F8FAFC] hover:bg-blue-50/50 p-2 rounded-lg border border-gray-100 transition-colors"
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
                  <div className="h-0.5 w-10 bg-[#03ADFF] mt-1.5 mb-3" />
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


              {/* 5. Follow Us Social Widget with Navy & Sky Blue Circular Buttons */}
              <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                    Follow Us
                  </h4>
                  <div className="h-0.5 w-10 bg-[#03ADFF] mt-1.5 mb-3.5" />
                </div>
                <div className="flex items-center gap-2.5">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="w-8 h-8 rounded-full bg-[#00285C] hover:bg-[#03ADFF] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaFacebookF className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="w-8 h-8 rounded-full bg-[#00285C] hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaXTwitter className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://wa.me/?text=Sundarban"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-8 h-8 rounded-full bg-[#00285C] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* 6. Subscribe to Our Newsletter (Brand Navy Blue Card) */}
              <div className="bg-[#00285C] text-white rounded-xl p-5 shadow-sm text-left">
                <h4 className="text-sm sm:text-base font-semibold text-white mb-1.5">
                  Subscribe to Our Newsletter
                </h4>
                <p className="text-xs text-blue-100/90 font-normal leading-relaxed mb-3.5">
                  Get the latest updates and travel guides right in your inbox.
                </p>
                <div className="space-y-2.5">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-3 rounded-md bg-[#083570] border border-white/20 text-white placeholder:text-blue-100 text-xs focus:outline-none focus:bg-[#0a4187] transition-colors font-normal"
                  />
                  <button
                    type="button"
                    className="w-full py-3 rounded-md bg-[#03ADFF] hover:bg-[#0092db] text-white text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {/* ─── Bottom Section: 2 Related Blog Posts matching screenshot ─── */}
        <section className="bg-[#F8FAFC] py-8 sm:py-16">
          <div className="container">
            {/* Header: Subtitle & Title */}
            <div className="mb-8 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#00285C] mt-2 tracking-tight">
                Related Blog Posts
              </h2>
            </div>

            {/* 2-Column Responsive Grid matching screenshot */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
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
                      {/* Meta Line: Author Avatar (Circle) & Name | Date | Clock Read Time */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-normal mb-2.5">
                        <div className="flex items-center gap-1.5">
                          <div className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                            <Image
                              src={rPost.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"}
                              alt={rPost.author?.name || "Author"}
                              fill
                              sizes="24px"
                              className="object-cover rounded-full"
                            />
                          </div>
                          <span className="font-semibold text-gray-800">
                            {rPost.author?.name || "KrikoTrip"}
                          </span>
                        </div>
                        <span className="text-gray-300 font-light">|</span>
                        <span>{rPost.date}</span>
                        <span className="text-gray-300 font-light">|</span>
                        <div className="flex items-center gap-1.5 text-gray-500 font-normal">
                          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                          <span>{rPost.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0B132A] group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 mb-2.5">
                        <Link href={`/blogs/${rPost.slug}`} className="cursor-pointer">
                          {rPost.title}
                        </Link>
                      </h3>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-normal mb-4">
                        {rPost.excerpt}
                      </p>
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
