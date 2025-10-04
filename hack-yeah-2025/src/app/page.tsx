"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const items: Array<{
    title: string;
    icon: string;
    href: string;
    variant?: "default" | "danger";
  }> = [
    {
      title: "Krok po kroku",
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
  const [isDanger, setDanger] = useState(true);
  const [isSos, setSos] = useState(false);

  return (
    <main className="min-h-dvh p-3 sm:p-4">
      <div className="mx-auto w-full max-w-sm rounded-md bg-white p-4 ">
        <h1 className="sr-only">Home</h1>

        {isDanger && (
          <div className="rounded-md bg-red-100 px-4 py-3 text-red-800">
            <div className="flex items-center justify-between">
              <span className="font-semibold">Wysokie zagrożenie</span>
              <Image
                src="/assets/alert.png"
                alt="Alert"
                width={24}
                height={24}
              />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={
                item.variant === "danger"
                  ? "flex items-center justify-between rounded-xl bg-red-200 px-4 py-5 text-red-900"
                  : "flex items-center justify-between rounded-xl bg-white px-4 py-5 shadow"
              }
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={32}
                  height={32}
                />
                <span className="font-medium">{item.title}</span>
              </div>
              <span className="text-xl">›</span>
            </Link>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Oficjalne komunikaty</h2>
          <article className="mt-3 h-40 rounded-xl bg-neutral-200 p-4" />
        </section>
      </div>
    </main>
  );
}
