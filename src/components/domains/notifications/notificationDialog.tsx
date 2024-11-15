// TODO: create socket connection and listen for notification-events
// TODO: fetchNotifications when there is a new notification event on socket

"use client";
import React, { useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { Button } from "../../ui/button";
import Notification from "./notification";
import { getUserNotifications } from "@/actions/notifications";
import { UserNotification } from "@/actions/notifications/type";

const NotificationDialog = () => {
    const [isOpen, setIsOpen] = useState(false);

    const [userNotifications, setUserNotifications] = useState<UserNotification[]>([]);
    const [areThereNewNotifications, setAreThereNewNotifications] = useState(true);

    async function fetchNotifications() {
        const getNotificationsRes = await getUserNotifications();
        if (getNotificationsRes.success) {
            setUserNotifications(
                getNotificationsRes.userNotifications.map((userNotifications) => ({ ...userNotifications }))
            );
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        if (isOpen) setAreThereNewNotifications(false);
    }, [isOpen]);

    return (
        <DropdownMenu onOpenChange={setIsOpen} open={isOpen}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={`relative border rounded-full h-auto p-2 ${!isOpen && "text-primary/60"}`}
                >
                    <Bell className="size-4" />
                    {areThereNewNotifications && (
                        <div className="absolute  top-0  right-0 bg-blue-500 rounded-full w-2.5 aspect-square"></div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[30rem] mx-10 p-0 mt-1">
                <Tabs defaultValue="inbox">
                    <TabsList className="flex gap-3 bg-transparent p-0">
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

                    <TabsContent value="inbox" className="mt-0">
                        <DropdownMenuSeparator className="bg-primary/10" />
                        <div className="flex flex-col">
                            {userNotifications
                                .filter((userNotification) => !userNotification.isArchived)
                                .map((userNotification) => (
                                    <>
                                        <Notification
                                            key={userNotification.notification.id}
                                            userNotification={userNotification}
                                            refetchNotifications={fetchNotifications}
                                        />

                                        <DropdownMenuSeparator className="bg-primary/10" />
                                    </>
                                ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="archive" className="mt-0">
                        <DropdownMenuSeparator className="bg-primary/10" />
                        <div className="flex flex-col">
                            {userNotifications
                                .filter((userNotification) => userNotification.isArchived)
                                .map((userNotification) => (
                                    <>
                                        <Notification
                                            key={userNotification.notification.id}
                                            userNotification={userNotification}
                                            refetchNotifications={fetchNotifications}
                                        />
                                        <DropdownMenuSeparator className="bg-primary/10" />
                                    </>
                                ))}
                        </div>
                    </TabsContent>
                </Tabs>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDialog;
