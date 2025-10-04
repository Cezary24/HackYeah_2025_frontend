"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const AlertIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

const MapIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
    />
  </svg>
);

const UserIcon = ({ isActive }: { isActive: boolean }) => (
  <svg
    className={`w-6 h-6 ${isActive ? "stroke-[2.5]" : "stroke-[2]"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: HomeIcon,
    },
    {
      name: "Alerty",
      href: "/dron-alert",
      icon: AlertIcon,
    },
    {
      name: "Mapa",
      href: "/map-alert",
      icon: MapIcon,
    },
    {
      name: "Profil",
      href: "/news",
      icon: UserIcon,
    },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-lg z-[9999] safe-bottom flex-shrink-0">
      <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`}
              >
                <Icon isActive={isActive} />
                <span className="text-xs font-medium mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
