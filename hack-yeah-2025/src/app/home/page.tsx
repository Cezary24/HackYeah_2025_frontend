"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [isDanger] = useState(false);
  return (
    <main className="min-h-dvh p-3 sm:p-4">
      <div className="mx-auto w-full max-w-sm rounded-md bg-white p-4 ">
        <h1 className="sr-only">Home</h1>
        {isDanger && (
          <div className="rounded-md bg-red-400 px-4 py-3 text-center font-semibold text-white">
            <div> Wysokie zagrożenie w Twoim regionie</div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { title: "Krok po kroku", href: "/krok-po-kroku" },
            { title: "Dron alert", href: "/dron-alert" },
            { title: "Instrukcje", href: "/instrukcje" },
            { title: "SOS", href: "/sos" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-between rounded-xl bg-neutral-200 p-4 transition-colors hover:bg-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-400"
            >
              <div className="h-20 w-20 rounded-sm bg-neutral-500" />
              <span className="mt-3 font-bold">{item.title}</span>
            </Link>
          ))}
        </div>

        <section className="mt-8">
          <h2 className="text-lg font-semibold">Oficjalne komunikaty</h2>
          <article className="mt-3 h-40 rounded-xl bg-neutral-200 p-4" />
          <div className="mt-2 flex items-center justify-between text-sm text-neutral-500">
            <span className="font-semibold text-black">Tytuł artykułu</span>
            <time dateTime="2025-03-23">23.03.2025</time>
          </div>
        </section>
      </div>
    </main>
  );
}
