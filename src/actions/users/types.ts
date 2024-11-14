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
