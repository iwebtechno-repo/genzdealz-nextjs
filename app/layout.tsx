import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { NavbarWrapper } from "@/components/navbar-wrapper";
import { AuthProvider } from "@/lib/auth-context";
import { IconThemeProvider } from "@/lib/morphy-ui/icon-theme-context";

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
          <IconThemeProvider defaultWeight="regular">
            <AuthProvider>
              <NavbarWrapper />
              <main className="pt-28">{children}</main>
            </AuthProvider>
          </IconThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
