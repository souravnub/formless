import { UserNotification } from "@/actions/notifications/type";
import React from "react";
import Notification from "./notification";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

const NotificationsContainer = ({
    userNotifications,
    refetchNotifications,
}: {
    userNotifications: UserNotification[];
    refetchNotifications: () => Promise<void>;
}) => {
    return (
        <div className="flex flex-col">
            {userNotifications.map((userNotification) => (
                <>
                    <Notification
                        key={userNotification.notification.id}
                        userNotification={userNotification}
                        refetchNotifications={refetchNotifications}
                    />
                    <DropdownMenuSeparator className="bg-primary/10" />
                </>
            ))}
        </div>
    );
};

export default NotificationsContainer;
