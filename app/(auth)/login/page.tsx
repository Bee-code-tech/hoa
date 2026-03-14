import { LoginForm } from "@/components/login-form"
import logo from "@/assets/logo-dark.png"
import Link from "next/link"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 bg-muted">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <img src={logo.src} alt="Company Logo" className="max-h-12 w-auto" />
        </Link>
        <LoginForm />
      </div>
    </div>
  )
}
