import { $Enums } from "@prisma/client";

export type SearchUsersRes =
    | {
          success: true;
          data: {
              id: string;
              name: string;
              email: string;
              role: $Enums.RoleType;
          }[];
      }
    | {
          success: false;
          message: string;
      };

export interface CreateUserInput {
    name: string;
    email: string;
    role: "USER" | "SUPERVISOR";
    password: string;
}

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
