import type { Metadata } from "next";
import "./globals.css";
import ClientWrapper from "@/components/ClientWrapper";
import Header from "@/components/layout/Header";
import { ThemeProvider } from "@/contexts/ThemeContext";

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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme') || 'dark';
                document.documentElement.className = theme;
              } catch {}
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ClientWrapper>
            <Header />
            {children}
          </ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
