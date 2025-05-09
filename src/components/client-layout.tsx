"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import BackgroundAnimation from "@/components/background-animation";
import { AuthProvider } from "@/contexts/AuthContext";

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
    pathname.startsWith("/verificar-email");

  return (
    <AuthProvider>
      {!isAuthPage && <BackgroundAnimation />}
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </AuthProvider>
  );
}
