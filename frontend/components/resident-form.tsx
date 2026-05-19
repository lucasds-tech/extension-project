"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { mutate } from "swr"
import { ResidentFormData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Spinner } from "@/components/ui/spinner"
import { ArrowLeft, Save, UserPlus, UserPen, Home } from "lucide-react"

interface ResidentFormProps {
  initialData?: ResidentFormData & { id: string }
  mode: "create" | "edit"
}

export function ResidentForm({ initialData, mode }: ResidentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<ResidentFormData>({
    name: initialData?.name || "",
    lastName: initialData?.lastName || "",
    document: initialData?.document || "",
    residence: initialData?.residence || "",
  })
  const [errors, setErrors] = useState<Partial<ResidentFormData>>({})
  const [apiError, setApiError] = useState("")

  const validate = (): boolean => {
    const newErrors: Partial<ResidentFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Sobrenome é obrigatório"
    }
    if (!formData.document.trim()) {
      newErrors.document = "Documento é obrigatório"
    }
    if (!formData.residence.trim()) {
      newErrors.residence = "Residência é obrigatória"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)
    setApiError("")

    try {
      const API_URL =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1"

      const response =
        mode === "create"
          ? await fetch(`${API_URL}/residents`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            })
          : await fetch(`${API_URL}/residents/${initialData?.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formData),
            })

      if (!response.ok) {
        const errorMessage = await response.text()
        throw new Error(errorMessage || "Erro ao salvar morador.")
      }

      mutate(`${API_URL}/residents`)
      router.push("/")

    } catch (error: any) {
      setApiError(error.message || "Erro inesperado.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof ResidentFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const isEdit = mode === "edit"

  return (
    <Card className="mx-auto max-w-2xl border-border bg-card">
      <CardHeader className="border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            {isEdit ? (
              <UserPen className="h-5 w-5 text-primary" />
            ) : (
              <UserPlus className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <CardTitle className="text-xl text-foreground">
              {isEdit ? "Editar Morador" : "Novo Morador"}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {isEdit
                ? "Atualize as informações do morador"
                : "Preencha os dados para cadastrar um novo morador"}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {apiError && (
              <div className="mb-4 rounded-md border border-red-500 bg-red-100 p-3 text-sm text-red-700">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground">
              Nome
            </Label>
            <Input
              id="name"
              placeholder="Digite o nome"
              value={formData.name}
              onChange={handleChange("name")}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground ${
                errors.name ? "border-destructive" : ""
              }`}
            />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-foreground">
              Sobrenome
            </Label>
            <Input
              id="lastName"
              placeholder="Digite o sobrenome"
              value={formData.lastName}
              onChange={handleChange("lastName")}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground ${
                errors.lastName ? "border-destructive" : ""
              }`}
            />
            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="document" className="text-foreground">
              Documento (CPF)
            </Label>
            <Input
              id="document"
              placeholder="000.000.000-00"
              value={formData.document}
              onChange={handleChange("document")}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground ${
                errors.document ? "border-destructive" : ""
              }`}
            />
            {errors.document && <p className="text-sm text-destructive">{errors.document}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="residence" className="text-foreground">
              Residência
            </Label>
            <Input
              id="residence"
              placeholder="Ex: Apartamento 101, Bloco A"
              value={formData.residence}
              onChange={handleChange("residence")}
              className={`bg-input border-border text-foreground placeholder:text-muted-foreground ${
                errors.residence ? "border-destructive" : ""
              }`}
            />
            {errors.residence && <p className="text-sm text-destructive">{errors.residence}</p>}
          </div>

          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/")}
              className="border-border bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isSubmitting ? (
                <Spinner className="mr-2 h-4 w-4" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isEdit ? "Atualizar" : "Salvar"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
