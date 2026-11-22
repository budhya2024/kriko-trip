import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Share2,
  Tag,
  User,
} from 'lucide-react'
import { FaFacebookF, FaWhatsapp, FaXTwitter } from 'react-icons/fa6'
import { Footer, Header } from '@/components/shared'
import BlogViewTracker from '@/components/blogs/BlogViewTracker'
import NewsletterForm from '@/components/blogs/NewsletterForm'
import {
  getBlogBySlug,
  getBlogCategories,
  getBlogSlugs,
} from '@/lib/api/server/blogs'

interface BlogDetailsPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getBlogSlugs()
  if (!slugs || slugs.length === 0) {
    return [{ slug: 'sundarban-winter-luxury-tour-package' }]
  }
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const res = await getBlogBySlug(slug)
  if (!res || !res.data) {
    return { title: 'Blog Not Found | KrikoTrip' }
  }

  const post = res.data
  return {
    title: post.seoTitle || `${post.title} | KrikoTrip Blog`,
    description: post.metaDescription || post.excerpt,
    alternates: {
      canonical: post.canonicalUrl || undefined,
    },
  }
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const { slug } = await params
  const [blogRes, categories] = await Promise.all([
    getBlogBySlug(slug),
    getBlogCategories(),
  ])

  if (!blogRes || !blogRes.data) {
    notFound()
  }

  const post = blogRes.data
  const recentPosts = blogRes.recent || []
  const relatedPosts = blogRes.related || []

  const formatDate = (dateStr: string | null | undefined): string => {
    if (!dateStr) return 'Recent'
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <BlogViewTracker slug={slug} />
      <Header />

      <main className="flex-1">
        <section className="relative w-full overflow-hidden bg-black h-[240px] sm:h-[280px] lg:h-[350px] flex items-center">
          <div className="absolute inset-0 z-0">
            <Image
              src={
                post.coverUrl ||
                'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80'
              }
              alt={post.coverAlt || post.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center scale-105"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>

          <div className="container relative z-20 text-left px-6 sm:px-10 lg:px-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <nav
                  aria-label="Breadcrumb"
                  className="flex items-center gap-2 text-xs sm:text-[13px] text-white/80 mb-3 font-normal"
                >
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                  <span className="text-white/40">/</span>
                  <Link href="/blogs" className="hover:text-white transition-colors">
                    Blogs
                  </Link>
                  <span className="text-white/40">/</span>
                  <span className="text-sky-300 font-medium truncate max-w-xs sm:max-w-md">
                    {post.title}
                  </span>
                </nav>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-snug">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        <div className="container py-8 sm:py-10 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <article className="lg:col-span-8 text-left">
              <div className="flex items-center gap-3 text-xs sm:text-sm shrink-0 self-start md:self-center pb-2">
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-1.5 font-medium transition-colors cursor-pointer text-gray-500 hover:text-[#00285C]"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Blogs</span>
                </Link>
              </div>

              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl lg:text-[25px] font-bold text-[#00285C] tracking-tight leading-snug mb-3.5">
                  {post.title}
                </h1>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-200/80">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#004D40]">
                      <User className="w-3.5 h-3.5 text-teal-800 shrink-0 stroke-[2.2]" />
                      <span>{post.author.name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-400 mt-1 font-normal">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span className="text-gray-300">|</span>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-3 h-3 text-amber-500 shrink-0" strokeWidth={2} />
                        <span>{post.readTimeMinutes} Min Read</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {(post.tags && post.tags.length > 0
                      ? post.tags
                      : [post.category.name]
                    ).map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF9E6] text-[#B45309] text-xs font-medium border border-[#FDE68A]/60 shadow-2xs"
                      >
                        <Tag className="w-3 h-3 text-[#D97706] fill-[#D97706]" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative w-full aspect-[16/10] overflow-hidden mb-6 image-shine cursor-pointer rounded-xl bg-gray-100">
                <Image
                  src={
                    post.coverUrl ||
                    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80'
                  }
                  alt={post.coverAlt || post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className="object-cover"
                />
              </div>

              <div className="prose prose-slate max-w-none text-left">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => (
                      <h2 className="text-xl sm:text-2xl font-bold text-[#0B132A] tracking-tight mt-8 mb-3.5">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-base sm:text-lg font-bold text-[#0B132A] mt-6 mb-2.5">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-normal mb-4">
                        {children}
                      </p>
                    ),
                    blockquote: ({ children }) => (
                      <div className="bg-blue-50/80 border-l-4 border-[#03ADFF] p-5 sm:p-6 rounded-r-xl my-6 text-[#00285C]">
                        <div className="text-xs sm:text-sm font-medium leading-relaxed italic text-[#00285C]">
                          {children}
                        </div>
                      </div>
                    ),
                    ul: ({ children }) => (
                      <ul className="space-y-2.5 my-4 pl-5 list-disc text-xs sm:text-sm text-gray-700">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="space-y-2.5 my-4 pl-5 list-decimal text-xs sm:text-sm text-gray-700">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    img: ({ src, alt }) => (
                      <span className="block relative w-full aspect-[16/9] rounded-xl overflow-hidden my-6 bg-gray-100 image-shine">
                        <Image
                          src={typeof src === 'string' ? src : ''}
                          alt={typeof alt === 'string' ? alt : ''}
                          fill
                          sizes="(max-width: 1024px) 100vw, 68vw"
                          className="object-cover"
                        />
                      </span>
                    ),
                  }}
                >
                  {post.contentMarkdown}
                </ReactMarkdown>
              </div>

              <div className="py-5 mt-8 border-y border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden relative bg-gray-100 border border-gray-200 shrink-0">
                    <Image
                      src={
                        post.author.avatarUrl ||
                        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                      }
                      alt={post.author.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 leading-none">Written by</p>
                    <p className="text-sm font-bold text-[#00285C] mt-1">
                      {post.author.name}
                    </p>
                  </div>
                </div>

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

            <aside className="lg:col-span-4 space-y-7 lg:sticky lg:top-24 text-left">
              {recentPosts.length > 0 && (
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
                        key={rPost.id}
                        href={`/blogs/${rPost.slug}`}
                        className="flex items-center gap-3 group cursor-pointer bg-[#F8FAFC] hover:bg-blue-50/50 p-2 rounded-lg border border-gray-100 transition-colors"
                      >
                        <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-gray-100 image-shine">
                          <Image
                            src={
                              rPost.coverUrl ||
                              'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=150&q=80'
                            }
                            alt={rPost.coverAlt || rPost.title}
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
                            <span>{formatDate(rPost.publishedAt)}</span>
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {categories.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200/90 p-5 shadow-xs">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-[#0B132A]">
                      Categories
                    </h4>
                    <div className="h-0.5 w-10 bg-[#03ADFF] mt-1.5 mb-3" />
                  </div>
                  <div className="divide-y divide-gray-100">
                    {categories.map((cat) => (
                      <Link
                        key={cat.id}
                        href="/blogs"
                        className="flex items-center justify-between text-xs sm:text-sm text-gray-600 hover:text-[#1877F2] transition-colors py-2 cursor-pointer group"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                          <span>({cat.postCount})</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

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
                    href={`https://wa.me/?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="w-8 h-8 rounded-full bg-[#00285C] hover:bg-[#25D366] text-white flex items-center justify-center transition-colors cursor-pointer shadow-xs"
                  >
                    <FaWhatsapp className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              <NewsletterForm source="blog_sidebar" />
            </aside>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section className="bg-[#F8FAFC] py-8 sm:py-16">
            <div className="container">
              <div className="mb-8 text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-[#00285C] mt-2 tracking-tight">
                  Related Stories & Guides
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((rPost) => (
                  <article
                    key={rPost.id}
                    className="bg-white rounded-2xl border border-gray-200/90 transition-colors duration-200 overflow-hidden flex flex-col group h-full cursor-pointer hover:border-gray-300"
                  >
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-100 cursor-pointer image-shine">
                      <Link href={`/blogs/${rPost.slug}`} className="block w-full h-full relative cursor-pointer">
                        <Image
                          src={
                            rPost.coverUrl ||
                            'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80'
                          }
                          alt={rPost.coverAlt || rPost.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />
                      </Link>

                      <div className="absolute top-3.5 left-3.5 z-10 pointer-events-none">
                        <span className="px-2.5 py-0.5 rounded-md bg-white text-gray-800 text-[11px] font-bold tracking-wide uppercase shadow-xs border border-gray-100">
                          {rPost.badgeLabel || rPost.category.name || 'TRAVEL GUIDE'}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between text-left">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-normal mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <div className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 rounded-full overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                              <Image
                                src={
                                  rPost.author.avatarUrl ||
                                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
                                }
                                alt={rPost.author.name}
                                fill
                                sizes="24px"
                                className="object-cover rounded-full"
                              />
                            </div>
                            <span className="font-semibold text-gray-800">
                              {rPost.author.name}
                            </span>
                          </div>
                          <span className="text-gray-300 font-light">|</span>
                          <span>{formatDate(rPost.publishedAt)}</span>
                          <span className="text-gray-300 font-light">|</span>
                          <div className="flex items-center gap-1.5 text-gray-500 font-normal">
                            <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" strokeWidth={2} />
                            <span>{rPost.readTimeMinutes} Min Read</span>
                          </div>
                        </div>

                        <h3 className="text-[17px] sm:text-[18px] font-semibold text-[#0B132A] group-hover:text-[#1877F2] transition-colors leading-snug line-clamp-2 mb-2.5">
                          <Link href={`/blogs/${rPost.slug}`} className="cursor-pointer">
                            {rPost.title}
                          </Link>
                        </h3>

                        <p className="text-xs sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 font-normal mb-4">
                          {rPost.excerpt}
                        </p>
                      </div>

                      <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                        <Link
                          href={`/blogs/${rPost.slug}`}
                          className="text-[13px] sm:text-[13.5px] font-bold text-[#0B132A] group-hover:text-[#1877F2] transition-colors cursor-pointer"
                        >
                          Read Story
                        </Link>
                        <Link
                          href={`/blogs/${rPost.slug}`}
                          aria-label={`Read story: ${rPost.title}`}
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
        )}
      </main>

      <Footer />
    </div>
  )
}
