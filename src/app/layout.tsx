import type { Metadata } from "next";
import "./globals.css";
import ReduxProvider from "./hooks/reduxProvider";
import ThemeProvider, { ThemeScript } from "@/app/components/theme-provider";
import ToastProvider from "@/app/components/toast-provider";

export const metadata: Metadata = {
  title: "Smart Control",
  description: "IOT Smart Control",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="antialiased text-[12px] text-[var(--text-secondary)]">
        <ThemeScript />
        <ThemeProvider>
          <ReduxProvider>
            <ToastProvider>{children}</ToastProvider>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
