"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { RcbService } from "@/services";
import type { RcbNews } from "@/services/rcb.service";

export default function DronAlertPage() {
  const [allNews, setAllNews] = useState<RcbNews[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <main className="min-h-screen w-full flex flex-col p-4 sm:p-6 bg-gray-50">
      <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col">
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
