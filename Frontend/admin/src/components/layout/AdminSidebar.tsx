import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader
} from "@/components/ui/sidebar";
import { sidebarData } from "./data/sidebar-data";
import { NavGroup } from "./nav-group";
import { NavUser } from "./nav-user";
import { AppTitle } from "./app-title";
import { useAuthStore } from "@/store/auth.store";

export function AppSidebar() {
  const admin = useAuthStore((state) => state.admin);

  return (
    <Sidebar>
      <SidebarHeader>
        <AppTitle />  
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            ...sidebarData.user,
            name: admin?.name ?? sidebarData.user.name,
            email: admin?.email ?? sidebarData.user.email,
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
