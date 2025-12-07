"use client";
import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "next-themes";
import { ReactNode } from "react";

const ToastProvider = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();
  return (
    <>
      {children}
      <Toaster
        richColors
        theme={(theme as "dark" | "light" | "system") || "dark"}
      />
    </>
  );
};

export default ToastProvider;
