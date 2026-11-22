import { Header, Footer, PageHeader } from "@/components/shared"
import GalleryClient from "@/components/gallery/GalleryClient"
import { getGalleryCategories, getGalleryItems } from "@/lib/api/server/gallery"

export default async function GalleryPage() {
  const [categories, photos] = await Promise.all([
    getGalleryCategories(),
    getGalleryItems({ limit: 100 }),
  ])

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <Header />

      <main className="flex-1">
        <PageHeader
          title="Travel Gallery"
          subtitle="A visual celebration of unforgettable adventures, exotic landscapes, and world-class luxury destinations."
          breadcrumb="Gallery"
          bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2000&q=80"
        />

        <GalleryClient
          categories={categories}
          photos={photos}
        />
      </main>

      <Footer />
    </div>
  )
}
