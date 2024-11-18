import React from "react";
import { UserNotification } from "@/actions/notifications/type";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { CircleAlert, Info, TriangleAlert } from "lucide-react";

export type NotificationProps = { userNotification: UserNotification; refetchNotifications: () => Promise<void> };

function NotificationBody({ userNotification }: NotificationProps) {
    const {
        notification: { description, type },
        createdAt,
    } = userNotification;

    const createdAtDate = new Date(createdAt);
    const dateNow = new Date();
    const duration = formatDistance(createdAtDate, dateNow, { addSuffix: true });

    const typeVariants =
        type === "ERROR"
            ? {
                  icon: <CircleAlert className="stroke-red-500 size-5" />,
                  containerClasses: "bg-red-100 border-red-100",
              }
            : type === "WARNING"
            ? {
                  icon: <TriangleAlert className="stroke-yellow-600 size-5" />,
                  containerClasses: "bg-orange-100 border-orange-100",
              }
            : {
                  icon: <Info className="stroke-blue-500 size-5" />,
                  containerClasses: "bg-blue-100 border-blue-100",
              };

    return (
        <div className="py-5 px-2 hover:bg-accent/30 flex gap-4 items-center group">
            <div className={cn(`w-fit p-2 rounded-full bg-opacity-40 border`, typeVariants.containerClasses)}>
                {typeVariants.icon}
            </div>
            <div>
                <p className="text-sm font-medium pr-14">{description}</p>
                <span className="text-primary/60 text-sm">{duration}</span>
            </div>
        </div>
    );
}

export default NotificationBody;
