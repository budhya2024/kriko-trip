import { Footer, Header, PageHeader } from '@/components/shared'
import BlogListClient from '@/components/blogs/BlogListClient'
import { getBlogCategories, getBlogs } from '@/lib/api/server/blogs'

export const metadata = {
  title: 'Travel Inspirations & Holiday Guides | KrikoTrip Blog',
  description:
    'A curated collection of destination guides, authentic travel stories, and expert holiday planning tips across India and exotic islands.',
}

export default async function BlogListPage() {
  const [blogsResponse, categories] = await Promise.all([
    getBlogs({ limit: 100 }),
    getBlogCategories(),
  ])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <PageHeader
          title="Travel Inspirations"
          subtitle="A curated collection of destination guides, authentic travel stories, and expert holiday planning tips."
          breadcrumb="Blogs"
          bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=2000&q=80"
        />

        <BlogListClient
          initialPosts={blogsResponse.items}
          categories={categories}
        />
      </main>

      <Footer />
    </div>
  )
}
