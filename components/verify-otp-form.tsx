"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authService } from "@/services/auth.service"
import { authUtils } from "@/lib/auth-utils"
import { toast } from "react-hot-toast"
import { Loader2 } from "lucide-react"

export function VerifyOtpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
    }
  }, [searchParams])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste
      const pastedOtp = value.replace(/\D/g, "").slice(0, 4)
      setOtp(pastedOtp)
      const nextIndex = Math.min(pastedOtp.length, 3)
      inputRefs.current[nextIndex]?.focus()
      return
    }

    const newOtp = otp.split("")
    newOtp[index] = value
    const finalOtp = newOtp.join("").slice(0, 4)
    setOtp(finalOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!email || otp.length < 4) {
      toast.error("Please enter the 4-digit code")
      return
    }

    setIsLoading(true)
    try {
      const response = await authService.verifyOtp({ email, otp })
      toast.success("Email verified successfully!")
      
      // Store user and token using cookies
      if (response.data) {
        authUtils.setAuth(response.data.token, response.data.user)
        
        // Redirect based on user role
        if (response.data.user.role === "student") {
          router.push("/dashboard/my-courses")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (!email) return

    setIsResending(true)
    try {
      await authService.resendOtp(email)
      toast.success("A new OTP has been sent to your email.")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to resend OTP")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Verify your account</CardTitle>
          <CardDescription>
            Enter the verification code sent to {email || "your email"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {!searchParams.get("email") && (
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="otp">Verification Code</FieldLabel>
                <div className="flex gap-2 justify-center py-2">
                  {[0, 1, 2, 3].map((index) => (
                    <Input
                      key={index}
                      ref={(el) => { inputRefs.current[index] = el }}
                      type="text"
                      inputMode="numeric"
                      className="w-14 h-14 text-center text-xl font-bold"
                      maxLength={4}
                      value={otp[index] || ""}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                    />
                  ))}
                </div>
              </Field>
              <Field>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify OTP
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-full"
                  onClick={handleResendOtp}
                  disabled={isResending || !email}
                >
                  {isResending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Resend Code
                </Button>
                <FieldDescription className="text-center">
                  Back to <a href="/login" className="underline underline-offset-4 hover:text-primary">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
