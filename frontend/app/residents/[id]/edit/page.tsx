import { use } from "react"
import useSWR from "swr"
import { Resident } from "@/lib/types"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ResidentForm } from "@/components/resident-form"
import { Spinner } from "@/components/ui/spinner"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface EditResidentPageProps {
  params: Promise<{ id: string }>
}

export default function EditResidentPage({ params }: EditResidentPageProps) {
  const { id } = use(params)
  const router = useRouter()
  const { data: resident, error, isLoading } = useSWR<Resident>(`http://localhost:8080/api/v1/residents/${id}`, fetcher)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex flex-1 items-center justify-center py-8">
          <Spinner className="h-8 w-8 text-primary" />
        </main>
        <Footer />
      </div>
    )
  }

  if (error || !resident) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <Card className="mx-auto max-w-2xl border-destructive/50 bg-destructive/10">
              <CardContent className="p-6">
                <p className="text-center text-destructive">Morador não encontrado.</p>
                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={() => router.push("/")}
                    variant="outline"
                    className="border-border bg-secondary text-secondary-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <ResidentForm
            mode="edit"
            initialData={{
              id: resident.id,
              name: resident.name,
              lastName: resident.lastName,
              document: resident.document,
              residence: resident.residence
            }}
          />
        </div>
      </main>
      <Footer />
    </div>
  )
}
