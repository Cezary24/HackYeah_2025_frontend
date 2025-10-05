"use client";

import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const items: Array<{
    title: string;
    icon: string;
    href: string;
    variant?: "default" | "danger";
  }> = [
    {
      title: "Scenariusze awaryjne",
      icon: "/assets/step_by_step.png",
      href: "/krok-po-kroku",
    },
    { title: "Dron alert", icon: "/assets/dron.png", href: "/dron-alert" },
    {
      title: "Instrukcje",
      icon: "/assets/instructions.png",
      href: "/instrukcje",
    },
    {
      title: "Alert SOS",
      icon: "/assets/alert.png",
      href: "/sos",
      variant: "danger",
    },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col p-4 sm:p-6 bg-gray-50">
      <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col">
        <h1 className="sr-only">Home</h1>

        <div className="flex-1 flex flex-col gap-4 mb-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.variant === "danger"
                  ? "flex items-center justify-between rounded-xl bg-red-200 px-6 py-6 text-red-900 shadow-md hover:shadow-lg transition-shadow"
                  : "flex items-center justify-between rounded-xl bg-white px-6 py-6 shadow-md hover:shadow-lg transition-shadow"
              }
            >
              <div className="flex items-center gap-4">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
                <span className="font-medium text-lg">{item.title}</span>
              </div>
              <span className="text-2xl">›</span>
            </Link>
          ))}
        </div>

        <section className="bg-white rounded-xl p-6 shadow-md mb-4">
          <h2 className="text-xl font-semibold mb-4">Oficjalne komunikaty</h2>
          <article className="min-h-[200px] rounded-lg bg-gray-50 p-4 flex items-center justify-center text-gray-500">
            <span>Brak nowych komunikatów</span>
          </article>
        </section>
      </div>
    </main>
  );
}
