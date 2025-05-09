"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activePage, setActivePage] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Redirecionar para login se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const navigationItems = [
    {
      id: "home",
      label: "Dashboard",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
      href: "/dashboard",
    },
    {
      id: "profile",
      label: "Perfil",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      href: "/dashboard/profile",
    },
    {
      id: "partners",
      label: "Parceiros",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 17.5v-12A2.5 2.5 0 0 0 17.5 3h-11A2.5 2.5 0 0 0 4 5.5v12A2.5 2.5 0 0 0 6.5 20h11a2.5 2.5 0 0 0 2.5-2.5Z" />
          <circle cx="12" cy="9" r="2" />
          <path d="M12 11v2" />
          <path d="M11 16h2" />
        </svg>
      ),
      href: "/dashboard/partners",
    },
    {
      id: "chats",
      label: "Conversas",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      href: "/dashboard/chats",
    },
    {
      id: "settings",
      label: "Config",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
      href: "/dashboard/settings",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar - Desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex w-64 flex-col">
          <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
            <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
              <div className="flex flex-shrink-0 items-center px-4">
                <h1 className="text-xl font-bold text-pink-500">
                  <span className="logo-gradient-ai">AI</span>
                  <span className="logo-gradient-to">to</span>
                  <span className="logo-gradient-love">Love</span>
                </h1>
              </div>
              <nav className="mt-8 flex-1 space-y-1 px-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`
                      group flex items-center px-2 py-2 text-sm font-medium rounded-md
                      ${
                        activePage === item.id
                          ? "bg-purple-50 text-purple-600"
                          : "text-gray-600 hover:bg-purple-50 hover:text-purple-600"
                      }
                    `}
                    onClick={() => setActivePage(item.id)}
                  >
                    <span className="mr-3 flex-shrink-0">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                <button
                  onClick={logout}
                  className="group flex w-full items-center px-2 py-2 text-sm font-medium text-red-500 rounded-md hover:bg-red-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sair
                </button>
              </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                </div>
                <div className="ml-3 w-full">
                  <p className="text-sm font-medium text-gray-700 truncate">
                    {user?.name || "Usuário"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.plan ? `Plano ${user.plan}` : "Plano básico"}
                  </p>
                </div>
                <Link
                  href="/dashboard/profile"
                  className="ml-1 flex-shrink-0 text-gray-400 hover:text-gray-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu - Top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-pink-500">
            <span className="logo-gradient-ai">AI</span>
            <span className="logo-gradient-to">to</span>
            <span className="logo-gradient-love">Love</span>
          </h1>
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
            </div>
            <button
              onClick={logout}
              className="ml-2 rounded-md p-2 text-red-500 hover:bg-red-50"
              aria-label="Sair"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <main className="relative flex-1 overflow-y-auto focus:outline-none pb-16 md:pb-0">
          <div className="pt-14 md:pt-0">{children}</div>
        </main>
      </div>

      {/* Menu Móvel - Barra de Navegação Inferior */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-200 shadow-lg">
        <nav className="flex justify-between items-center px-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex flex-col items-center justify-center py-2 px-1 
                ${
                  activePage === item.id
                    ? "text-purple-600"
                    : "text-gray-500 hover:text-purple-600"
                }
              `}
              onClick={() => setActivePage(item.id)}
            >
              <span className="inline-flex items-center justify-center">
                {item.icon}
              </span>
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
