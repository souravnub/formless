import { $Enums, Prisma, UserNotification } from "@prisma/client";

export interface SendNotificationProps {
    userType: $Enums.RoleType;
    notificationId: string;
}
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
    | { success: true; notifications: Prisma.UserNotificationGetPayload<{ include: { notification: true } }>[] }
    | { success: false; message: string };
