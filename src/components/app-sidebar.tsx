"use client"

import * as React from "react"
import { ArchiveX, Command, File, Inbox, Send, Trash2, User } from "lucide-react"
import { NavUser } from "@/components/nav-user"
import { Label } from "@/components/ui/label"
import {getUser, getUsers} from "@/actions/users"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import { $Enums } from "@prisma/client"

interface User {
  id: string;
  name: string;
  email: string;
  role: $Enums.RoleType;
}
interface Chat {
  name: string;
  email: string;
  subject: string;
  date: string;
  teaser: string;
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  
  const [chats, setChats] = React.useState<Chat[]>([])
  const [users, setUsers] = React.useState<User[]>([]);
  const { setOpen } = useSidebar()
   // Function to transform users into mails format
   const transformUsersToChats = (users:User[]): Chat[] => {
    return users.map((user) => ({
      name: user.name,
      email: user.email,
      subject: "Start a Chat", // Placeholder subject
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Current time as a placeholder
      teaser: "This is the Start of your communications.", // Placeholder teaser
    }));
  };
  const populateUsers = async () => {
    const fetchData = async () => {
      const data = await getUsers();
      data.data && setUsers(data.data);
  };
  fetchData();
  }
  React.useEffect(() => {
    populateUsers();
  },[]);

  const authorizeChats = transformUsersToChats(users);
  React.useEffect(() => {
    setChats(authorizeChats);
  }, [users]);
  return (
    <Sidebar
      className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
      {...props}
    >
      {/* This is the first sidebar */}
      {/* We disable collapsible and adjust width to icon. */}
      {/* This will make the sidebar appear as icons. */}
      

      {/* This is the second sidebar */}
      {/* We disable collapsible and let it fill remaining space */}
      <Sidebar collapsible="offcanvas" className="hidden flex-1 md:flex">
        <SidebarContent>
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {chats.map((chat) => (
                <a
                  href="/admin/chat"
                  key={chat.email}
                  className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <div className="flex w-full items-center gap-2">
                    <span>{chat.name}</span>{" "}
                    <span className="ml-auto text-xs">{chat.date}</span>
                  </div>
                  <span className="font-medium">{chat.subject}</span>
                  <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                    {chat.teaser}
                  </span>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  )
}
