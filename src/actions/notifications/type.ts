import { $Enums, Prisma } from "@prisma/client";

export interface SendNotificationProps {
    userType: $Enums.RoleType;
    notificationId: string;
}

export type UserNotification = Prisma.UserNotificationGetPayload<{ include: { notification: true } }>;

export type CreateNotificationRes =
    | {
          success: true;
          message: string;
          id: string;
      }
    | {
          success: false;
          message: string;
      };

export type GetNotificationsRes =
    | { success: true; userNotifications: UserNotification[] }
    | { success: false; message: string };
