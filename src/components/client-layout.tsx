"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundAnimation from "@/components/background-animation";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlanProvider } from "@/contexts/PlanContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/recuperar-senha" ||
    pathname.startsWith("/verificar-email") ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/");

  return (
    <AuthProvider>
      <PlanProvider>
        {!isAuthPage && <BackgroundAnimation />}
        {!isAuthPage && <Header />}
        {children}
        {!isAuthPage && <Footer />}
      </PlanProvider>
    </AuthProvider>
  );
}
