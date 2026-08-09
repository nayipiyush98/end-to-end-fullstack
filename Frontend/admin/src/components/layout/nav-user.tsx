import { Link } from "react-router-dom"
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import useDialogState from "@/hooks/use-dialog-state"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

import { SignOutDialog } from "@/components/sign-out-dialog"

type NavUserProps = {
  user: {
    name: string
    email: string
    avatar: string
  }
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar()
  const [open, setOpen] = useDialogState()

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>

            {/* =========================
                User Button / Trigger
            ========================== */}
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="
                    data-[state=open]:bg-sidebar-accent
                    data-[state=open]:text-sidebar-accent-foreground
                  "
                />
              }
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                />

                <AvatarFallback className="rounded-lg">
                  {user.name
                    .split(" ")
                    .map((name) => name[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {user.name}
                </span>

                <span className="truncate text-xs">
                  {user.email}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4" />
            </DropdownMenuTrigger>

            {/* =========================
                Dropdown Content
            ========================== */}
            <DropdownMenuContent
              className="min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >

              {/* =========================
                  User Information
              ========================== */}
              <DropdownMenuGroup>
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={user.avatar}
                        alt={user.name}
                      />

                      <AvatarFallback className="rounded-lg">
                        {user.name
                          .split(" ")
                          .map((name) => name[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user.name}
                      </span>

                      <span className="truncate text-xs">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
              </DropdownMenuGroup>


              <DropdownMenuSeparator />

              {/* =========================
                  Account Menu
              ========================== */}
              <DropdownMenuGroup>

                <DropdownMenuItem
                  render={
                    <Link to="/settings/account">
                      <BadgeCheck />
                      <span>Account</span>
                    </Link>
                  }
                />

                <DropdownMenuItem
                  render={
                    <Link to="/settings/notifications">
                      <Bell />
                      <span>Notifications</span>
                    </Link>
                  }
                />

              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              {/* =========================
                  Logout
              ========================== */}
              <DropdownMenuItem
                variant="destructive"
                onClick={() => setOpen(true)}
              >
                <LogOut />
                <span>Sign out</span>
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {/* =========================
          Sign Out Confirmation
      ========================== */}
      <SignOutDialog
        open={!!open}
        onOpenChange={setOpen}
      />
    </>
  )
}