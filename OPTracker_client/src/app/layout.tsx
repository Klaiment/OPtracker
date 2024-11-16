import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";

/**
 * Metadata configuration for the application
 */
export const metadata: Metadata = {
  title: "OPTracker",
  description: "The OverPowered Torrent Tracker",
};

/**
 * Root layout component
 * Wraps all pages with necessary providers and global styles
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
