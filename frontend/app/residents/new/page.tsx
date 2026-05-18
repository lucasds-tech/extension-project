import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResidentForm } from "@/components/resident-form"

export default function NewResidentPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ResidentForm mode="create" />
        </div>
      </main>
      <Footer />
    </div>
  )
}
