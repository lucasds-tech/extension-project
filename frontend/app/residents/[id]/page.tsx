import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResidentView } from "@/components/resident-view"

interface ResidentPageProps {
  params: Promise<{ id: string }>
}

export default async function ResidentPage({ params }: ResidentPageProps) {
  const { id } = await params

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ResidentView id={id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
