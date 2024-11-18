import { archiveNotification } from "@/actions/notifications";
import { Button } from "@/components/ui/button";
import { Archive } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import NotificationBody, { NotificationProps } from "./notificationBody";

const NotificationWrapper = ({ link, children }: { link: string | null; children: ReactNode }) => {
    // will check if the notification have a link, if it does then it will return us a link else div
    if (link) {
        return <Link href={link}>{children}</Link>;
    }
    return children;
};

const Notification = (props: NotificationProps) => {
    const { isArchived, userId, notificationId } = props.userNotification;

    return (
        <div className="relative group">
            <NotificationWrapper link={props.userNotification.notification.link}>
                <NotificationBody {...props} />
            </NotificationWrapper>

            {!isArchived && (
                <Button
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
