import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { NextAuthProvider } from "@/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Formless",
    description:
        "Transform your form management. Streamline physical forms into a sleek digital format with ease—no more clutter, just efficient and intuitive handling.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <NextAuthProvider>
                <body className={`${inter.className} antialiased`}>
                    {children}

                    <Toaster />
                </body>
            </NextAuthProvider>
        </html>
    );
}
