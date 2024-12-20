"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      enableSystem
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>
      <ToasterProvider />
    </ThemeProvider>
  );
}

function ToasterProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      richColors
      closeButton
      position="top-center"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}

function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChat = pathname.startsWith("/chat");

  if (isChat) {
    return children;
  }

  return (
    <section className="flex w-full flex-col">
      <Header />
      <main className="grow">{children}</main>
    </section>
  );
}
