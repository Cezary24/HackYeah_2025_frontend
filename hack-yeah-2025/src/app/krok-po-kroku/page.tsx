import Image from "next/image";
import Link from "next/link";

interface Scenario {
  id: string;
  title: string;
  icon: string;
}

const scenarios: Scenario[] = [
  {
    id: "powodz",
    title: "Powódź",
    icon: "/assets/flood.png",
  },
  {
    id: "pozar",
    title: "Pożar",
    icon: "/assets/fire.png",
  },
  {
    id: "atak-drona",
    title: "Nalot dronów",
    icon: "/assets/dron.png",
  },
];

export default function KrokPoKrokuPage() {
  return (
    <main className="bg-gray-50 min-h-full p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Krok po kroku
        </h1>

        <div className="flex flex-col gap-3">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/krok-po-kroku/${scenario.id}`}
              className="bg-white rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 text-blue-500">
                  <div className="relative w-10 h-10">
                    <Image
                      src={scenario.icon}
                      alt={scenario.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                  {scenario.title}
                </h2>
              </div>
              <svg
                className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
