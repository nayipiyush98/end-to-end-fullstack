import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./AdminSidebar"
import { Outlet } from "react-router-dom"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
            <Outlet />
      </main>
    </SidebarProvider>
  )
}