import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/shared/components/Navbar/Navbar";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "sonner";
import Footer from "@/shared/components/Footer/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Оплата Коинами | PandoraMC.ru",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={montserrat.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="container">
            <Navbar />
            {children}
          </div>
          <Footer />
        </ThemeProvider>
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}