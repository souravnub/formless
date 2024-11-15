// TODO: create socket connection and listen for notification-events
// TODO: fetchNotifications when there is a new notification event on socket

"use client";
import { getUserNotifications } from "@/actions/notifications";
import { UserNotification } from "@/actions/notifications/type";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import NotificationsContainer from "./notificationsContainer";
import { useSocketContext } from "@/providers";

const NotificationDialog = () => {
    const socket = useSocketContext();
    const [isOpen, setIsOpen] = useState(false);

    const [userNotifications, setUserNotifications] = useState<UserNotification[]>([]);
    const [areThereNewNotifications, setAreThereNewNotifications] = useState(false);

    async function fetchNotifications() {
        const getNotificationsRes = await getUserNotifications();
        if (getNotificationsRes.success) {
            setUserNotifications(getNotificationsRes.userNotifications);
        }
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        socket?.on("new-notification", () => {
            setAreThereNewNotifications(true);
            fetchNotifications();
        });
    }, [socket]);

    useEffect(() => {
        if (isOpen) setAreThereNewNotifications(false);
    }, [isOpen]);

    return (
        <Popover onOpenChange={setIsOpen} open={isOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="ghost"
                    className={`relative border rounded-full h-auto p-2 ${!isOpen && "text-primary/60"}`}
                >
                    <Bell className="size-4" />
                    {areThereNewNotifications && (
                        <div className="absolute  top-0  right-0 bg-blue-500 rounded-full w-2.5 aspect-square"></div>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[30rem] mx-10 p-0 mt-1">
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

                        <NotificationsContainer
                            refetchNotifications={fetchNotifications}
                            userNotifications={userNotifications.filter(
                                (userNotification) => !userNotification.isArchived
                            )}
                        />
                    </TabsContent>

                    <TabsContent value="archive" className="mt-0">
                        <DropdownMenuSeparator className="bg-primary/10" />

                        <NotificationsContainer
                            refetchNotifications={fetchNotifications}
                            userNotifications={userNotifications.filter(
                                (userNotification) => userNotification.isArchived
                            )}
                        />
                    </TabsContent>
                </Tabs>

                <DropdownMenuSeparator />
            </PopoverContent>
        </Popover>
    );
};

export default NotificationDialog;
