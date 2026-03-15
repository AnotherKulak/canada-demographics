import type { Metadata } from "next";

import { ThemeProvider } from "../components/shared/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Canada Demographics",
  description:
    "A public intelligence hub for Canadian population and residency-status data.",
  icons: {
    icon: "/coat_of_arms_of_canada.svg",
    shortcut: "/coat_of_arms_of_canada.svg",
    apple: "/coat_of_arms_of_canada.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            Skip to main content
          </a>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
