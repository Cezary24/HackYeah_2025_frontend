"use client";

import Image from "next/image";

const officialNews = [
  {
    id: 1,
    title: "Powódź woj. kujawskie",
    date: "23.03.2025",
    image: "/assets/komunikaty/flood_kujawskie.png",
  },
  {
    id: 2,
    title: "Pożar w Siemianowicach Śląskich",
    date: "13.01.2025",
    image: "/assets/komunikaty/fire_siemianowice.png",
  },
];

const regionalNews = [
  {
    id: 1,
    title: "Pożar w Elblągu",
    date: "17.05.2025",
    image: "/assets/komunikaty/fire_siemianowice.png",
  },
];

export default function DronAlertPage() {
  return (
    <main className="min-h-screen w-full flex flex-col p-4 sm:p-6 bg-gray-50">
      <div className="mx-auto w-full max-w-4xl flex-1 flex flex-col">
        {/* Oficjalne komunikaty */}
        <section className="mb-6">
          <h2 className="text-xl font-bold mb-4 px-2">Oficjalne komunikaty</h2>
          <div className="space-y-4">
            {officialNews.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Z Twojego regionu */}
        <section className="mb-20">
          <h2 className="text-xl font-bold mb-4 px-2">Z Twojego regionu</h2>
          <div className="space-y-4">
            {regionalNews.map((news) => (
              <article
                key={news.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">{news.title}</h3>
                  <span className="text-sm text-gray-500">{news.date}</span>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
