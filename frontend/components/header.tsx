import Link from "next/link"
import { Users, Home, UserCheck } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>

          <span className="text-lg font-semibold tracking-tight text-foreground">
            SafeEntry
          </span>
        </Link>

        <nav className="flex items-center gap-2">

          <Link
            href="/"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Home className="h-4 w-4" />
            <span>Início</span>
          </Link>

          <Link
            href="/visitors"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <UserCheck className="h-4 w-4" />
            <span>Visitantes</span>
          </Link>

        </nav>
      </div>
    </header>
  )
}