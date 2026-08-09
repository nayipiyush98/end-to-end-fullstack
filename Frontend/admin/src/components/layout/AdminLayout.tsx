import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "./AdminSidebar"
import { Outlet } from "react-router-dom"
import { Header } from "./header"
import { TopNav } from "./top-nav"
import { ModeToggle } from "../mode-toggle"
import { Main } from "./main"
import { ProfileDropdown } from "../profile-dropdown"

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
        <div className="relative flex min-w-0 flex-1 flex-col">
            <Header>
                <TopNav links={topNav} className='me-auto' />
                <ModeToggle />
                <ProfileDropdown />
            </Header>
          <Main>
            <Outlet />
          </Main>
        </div>
    </SidebarProvider>
  )
}


const topNav = [
  {
    title: 'Overview',
    href: 'dashboard/overview',
    isActive: true,
    disabled: false,
  },
  {
    title: 'Customers',
    href: 'dashboard/customers',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Products',
    href: 'dashboard/products',
    isActive: false,
    disabled: true,
  },
  {
    title: 'Settings',
    href: 'dashboard/settings',
    isActive: false,
    disabled: true,
  },
];