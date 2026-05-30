import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/shared/components/Navbar/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import Footer from "@/shared/components/Footer/Footer";
import ToastProvider from "@/providers/toasts-provider";
import ScrollToTop from "@/shared/components/ScrollToTop";
import CaseDiscount from "@/shared/components/Banners/CasesDiscount";
import IPButton from "@/shared/components/IpButton";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Магазин донат-услуг | PandoraMC.ru",
  description: "Начни свое путешествие в мире Анархии!",
  icons: {
    icon: "/logo.png",
  },
};

export default function GlobalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} flex flex-col min-h-screen`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToastProvider>
            <div className="container flex-1">
              <IPButton />
              <Navbar />
              <CaseDiscount />
              {children}
            </div>
            <Footer />
            <ScrollToTop />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
