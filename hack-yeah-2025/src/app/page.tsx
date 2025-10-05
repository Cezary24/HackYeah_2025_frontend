"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RcbService } from "@/services";
import type { RcbNews } from "@/services/rcb.service";

export default function Page() {
  const router = useRouter();
  const [allNews, setAllNews] = useState<RcbNews[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const onboardingCompleted = localStorage.getItem("onboardingCompleted");
    const interviewCompleted = localStorage.getItem("interviewCompleted");

    if (!onboardingCompleted) {
      router.push("/onBoarding");
    } else if (!interviewCompleted) {
      router.push("/interview");
    }
  }, [router]);

  // Pobierz dane z Supabase
  useEffect(() => {
    async function fetchNews() {
      try {
        const result = await RcbService.getAllNews();

        if (result.data) {
          setAllNews(result.data);
        }
      } catch (error) {
        console.error("Błąd pobierania komunikatów:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  const items: Array<{
    title: string;
    icon: string;
    href: string;
    variant?: "default" | "danger";
    disabled?: boolean;
  }> = [
    {
      title: "Scenariusze awaryjne",
      icon: "/assets/step_by_step.png",
      href: "/krok-po-kroku",
    },
    {
      title: "Dron alert",
      icon: "/assets/dron.png",
      href: "/dron-alert",
      disabled: true,
    },
    {
      title: "Instrukcje",
      icon: "/assets/instructions.png",
      href: "/instrukcje",
    },
    {
      title: "Zaktualizuj sytuację",
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
          {items.map((item) => {
            const baseClasses =
              item.variant === "danger"
                ? "flex items-center justify-between rounded-xl bg-red-200 px-6 py-6 text-red-900 shadow-md"
                : "flex items-center justify-between rounded-xl bg-white px-6 py-6 shadow-md";

            const disabledClasses = item.disabled
              ? "opacity-50 cursor-not-allowed"
              : "hover:shadow-lg transition-shadow";

            if (item.disabled) {
              return (
                <div
                  key={item.href}
                  className={`${baseClasses} ${disabledClasses}`}
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
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${baseClasses} ${disabledClasses}`}
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
            );
          })}
        </div>

        {/* Komunikaty RCB */}
        <section className="mb-20">
          <h2 className="text-xl font-bold mb-4 px-2">Komunikaty RCB</h2>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : allNews.length > 0 ? (
            <div className="space-y-4">
              {allNews.map((news) => (
                <a
                  key={news.id}
                  href={news.article_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-full h-48">
                    <Image
                      src={news.image_url}
                      alt={news.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <h3 className="font-medium text-gray-900">{news.title}</h3>
                    <span className="text-sm text-gray-500">{news.event}</span>
                  </div>
                </a>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Brak komunikatów
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
