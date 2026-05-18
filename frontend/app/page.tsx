import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResidentsList } from "@/components/residents-list"


export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ResidentsList />
        </div>
      </main>
      <Footer />
    </div>
  )
}
