import { NavUser } from "@/components/nav-user"
import { Separator } from "@/components/ui/separator"
import { SidebarMenu, SidebarTrigger } from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Admin",
    email: "admin@hoaservices.co.uk",
    avatar: "/avatars/admin.jpg",
  },
}

export function SiteHeader() {
  return (
    <header className="flex h-fit shrink-0 items-center gap-2 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 py-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-fit">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-3 data-[orientation=vertical]:h-6"
        />
        <h1 className="text-xl font-bold tracking-tight text-primary">Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Separator
            orientation="vertical"
            className="hidden h-6 mx-2 lg:block"
          />
          <div className="w-fit">
            <SidebarMenu>
              <NavUser user={data.user} />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
