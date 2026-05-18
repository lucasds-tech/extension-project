export function Footer() {
  return (
    <footer className="border-t border-border bg-background py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          Copyright © {new Date().getFullYear()} Lucas Silva. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
