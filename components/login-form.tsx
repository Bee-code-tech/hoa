import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold text-brand-light">Login to your account</h1>
          <p className="text-brand-light/80 text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email" className="text-brand-light">Email</FieldLabel>
          <input
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            required 
            className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password" className="text-brand-light">Password</FieldLabel>
            <a
              href="/forgot-password"
              className="ml-auto text-brand-accent text-sm underline-offset-4 hover:text-brand-accent/80"
            >
              Forgot your password?
            </a>
          </div>
          <input
            id="password" 
            type="password" 
            required
            className="w-full px-3 py-2 border border-brand-accent/30 rounded-md focus:border-brand-accent focus:ring-brand-accent focus:outline-none bg-brand-secondary/20 text-brand-light placeholder-brand-light/70"
          />
        </Field>
        <Field>
          <Button 
            type="submit"
            className="w-full bg-brand-accent hover:bg-brand-accent/90 text-brand-light py-2 px-4 rounded-md transition-colors duration-200"
          >
            Login
          </Button>
        </Field>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-brand-light/30"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-brand-primary/90 text-brand-light/70">Or continue with</span>
          </div>
        </div>
        <Field>
          <Button 
            type="button"
            className="w-full border border-brand-accent/30 text-brand-light hover:bg-brand-accent/10 py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path
                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                fill="currentColor"
              />
            </svg>
            Login with Google
          </Button>
          <FieldDescription className="text-center text-brand-light/80 text-sm mt-4">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-brand-accent underline underline-offset-4 hover:text-brand-accent/80">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}