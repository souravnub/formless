import { archiveNotification } from "@/actions/notifications";
import { UserNotification } from "@/actions/notifications/type";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { Archive, CircleAlert, Info, TriangleAlert } from "lucide-react";
import Link from "next/link";

type NotificationProps = { userNotification: UserNotification; refetchNotifications: () => Promise<void> };

function NotificationBody({ refetchNotifications, userNotification }: NotificationProps) {
    const {
        notification: { description, type },
        createdAt,
        userId,
        notificationId,
        isArchived,
    } = userNotification;
    const createdAtDate = new Date(createdAt);
    const dateNow = new Date();
    const duration = formatDistance(createdAtDate, dateNow, { addSuffix: true });

    const typeVariants =
        type === "ERROR"
            ? { icon: <CircleAlert className="stroke-red-500 size-5" />, containerClasses: "bg-red-100 border-red-100" }
            : type === "WARNING"
            ? {
                  icon: <TriangleAlert className="stroke-yellow-600 size-5" />,
                  containerClasses: "bg-orange-100 border-orange-100",
              }
            : { icon: <Info className="stroke-blue-500 size-5" />, containerClasses: "bg-blue-100 border-blue-100" };

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

const Notification = (props: NotificationProps) => {
    const { isArchived, userId, notificationId } = props.userNotification;

    if (props.userNotification.notification.link) {
        return (
            <div className="relative group">
                <Link href={props.userNotification.notification.link}>
                    <NotificationBody {...props} />
                </Link>
                {!isArchived && (
                    <Button
                        type="submit"
                        onClick={async () => {
                            await archiveNotification(userId, notificationId);
                            await props.refetchNotifications();
                        }}
                        variant={"ghost"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-auto p-2 ml-auto rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Archive className="size-5 stroke-2" />
                    </Button>
                )}
            </div>
        );
    }

    return (
        <div className="relative group">
            <NotificationBody {...props} />
            {!isArchived && (
                <Button
                    type="submit"
                    onClick={async () => {
                        await archiveNotification(userId, notificationId);
                        await props.refetchNotifications();
                    }}
                    variant={"ghost"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-auto p-2 ml-auto rounded-full opacity-0 group-hover:opacity-100 group-focus-within:opacity-100"
                >
                    <Archive className="size-5 stroke-2" />
                </Button>
            )}
        </div>
    );
};

export default Notification;
