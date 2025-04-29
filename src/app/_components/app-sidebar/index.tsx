// src/app/_components/app-sidebar/index.tsx

"use client";

import { useState } from 'react'; // Now useState will work because this is a client component
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import NavHeader from "@/app/_components/app-sidebar/nav-header";
import NavUser from "@/app/_components/app-sidebar/nav-user";

// Define AppSidebarProps to be the props of Sidebar
type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

const AppSidebar = ({ ...props }: AppSidebarProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(prevState => !prevState);

  return (
    <Sidebar {...props} className={isOpen ? 'sidebar-open' : 'sidebar-closed'}>
      <SidebarHeader>
        <NavHeader />

      </SidebarHeader>
      <SidebarContent>
        {/* Sidebar content goes here */}
      </SidebarContent>
      <SidebarFooter>
        <Separator />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
