import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { AuthProvider } from "@/lib/auth-context";
import { IconThemeProvider } from "@/lib/morphy-ui/icon-theme-context";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GenZDealZ.ai",
  description: "Your AI-powered shopping journey begins here",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster position="top-center" richColors closeButton />
          <IconThemeProvider defaultWeight="regular">
            <AuthProvider>
              <main>
                <div className="min-h-screen pb-28">{children}</div>
              </main>
              <NavbarWrapper />
            </AuthProvider>
          </IconThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
