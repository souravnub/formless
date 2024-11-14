"use client";
import React, { useEffect, useState } from "react";
import {
   DropdownMenu,
   DropdownMenuCheckboxItem,
   DropdownMenuContent,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { Button } from "../ui/button";

const Notifications = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [newNotifications, setNewNotifications] = useState(true);

   useEffect(() => {
      if (isOpen) setNewNotifications(false);
   }, [isOpen]);

   return (
      <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
         <DropdownMenuTrigger asChild>
            <Button
               variant="ghost"
               className={`relative border rounded-full h-auto p-2 ${!isOpen && "text-primary/60"}`}
            >
               <Bell className="size-4" />
               {newNotifications && (
                  <div className="absolute  top-0  right-0 bg-blue-500 rounded-full w-2.5 aspect-square"></div>
               )}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="min-w-96 mx-10 p-0 px-2 mt-1">
            <Tabs defaultValue="inbox">
               <TabsList className="flex gap-3 bg-transparent px-2 p-0">
                  <TabsTrigger
                     value="inbox"
                     className="flex-1 rounded-none data-[state=active]:border-b-primary border-y-2 border-transparent data-[state=active]:shadow-none"
                  >
                     Inbox
                  </TabsTrigger>
                  <TabsTrigger
                     value="archive"
                     className="flex-1 rounded-none data-[state=active]:border-b-primary border-y-2 border-transparent data-[state=active]:shadow-none"
                  >
                     Archive
                  </TabsTrigger>
               </TabsList>
            </Tabs>
            <DropdownMenuSeparator />

            <span>hello</span>
         </DropdownMenuContent>
      </DropdownMenu>
   );
};

export default Notifications;
