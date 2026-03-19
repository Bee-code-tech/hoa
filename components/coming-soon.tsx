"use client"

import { ConstructionIcon } from "lucide-react"

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
      <div className="mb-6 rounded-2xl bg-primary/10 p-4 text-primary">
        <ConstructionIcon className="size-12" />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="max-w-md text-lg text-muted-foreground">
        We&apos;re currently building this feature to give you the best experience possible. Stay tuned!
      </p>
      <div className="mt-8 flex gap-4">
        <div className="h-2 w-12 rounded-full bg-primary" />
        <div className="h-2 w-8 rounded-full bg-primary/30" />
        <div className="h-2 w-4 rounded-full bg-primary/10" />
      </div>
    </div>
  )
}
