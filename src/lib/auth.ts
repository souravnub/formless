import NextAuth, { Session } from "next-auth";
import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import prisma from "@/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        credentials({
            name: "email",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "Enter your email",
                },
                password: {
                    label: "password",
                    type: "text",
                    placeholder: "Enter your password",
                },
            },

            async authorize(credentials) {
                const user = await prisma.user.findFirst({
                    where: { email: credentials.email as string },
                });
                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user?.password || ""
                );

                if (user && isPasswordValid) {
                    return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt: ({ token, user }: { user: any; token: any }) => {
            if (user && user.role) token.role = user.role;

            return token;
        },
        session: ({ token, session }) => {
            session.user.role = token.role as "ADMIN" | "SUPERVISOR" | "USER";
            return session;
        },
    },
});
