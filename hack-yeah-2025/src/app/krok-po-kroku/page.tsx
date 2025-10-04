import Image from "next/image";
import Link from "next/link";

interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

const scenarios: Scenario[] = [
  {
    id: "atak-drona",
    title: "Atak drona",
    description: "Postępowanie w przypadku ataku dronów",
    icon: "/assets/dron.png",
    color: "bg-red-50 border-red-200 hover:bg-red-100",
  },
  {
    id: "pozar",
    title: "Pożar",
    description: "Co zrobić w przypadku pożaru",
    icon: "/assets/alert.png",
    color: "bg-orange-50 border-orange-200 hover:bg-orange-100",
  },
  {
    id: "atak-chemiczny",
    title: "Atak chemiczny",
    description: "Jak postępować podczas ataku chemicznego",
    icon: "/assets/danger.png",
    color: "bg-yellow-50 border-yellow-200 hover:bg-yellow-100",
  },
  {
    id: "trzesienie-ziemi",
    title: "Trzęsienie ziemi",
    description: "Bezpieczne zachowanie podczas trzęsienia ziemi",
    icon: "/assets/alert.png",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    id: "powodz",
    title: "Powódź",
    description: "Postępowanie w przypadku powodzi",
    icon: "/assets/alert.png",
    color: "bg-cyan-50 border-cyan-200 hover:bg-cyan-100",
  },
  {
    id: "atak-terrorystyczny",
    title: "Atak terrorystyczny",
    description: "Jak zachować się podczas ataku terrorystycznego",
    icon: "/assets/danger.png",
    color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
  },
];

export default function KrokPoKrokuPage() {
  return (
    <main className="bg-white p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-                                                         bold text-gray-900 mb-4">
          Scenariusze awaryjne
        </h1>
        <p className="text-gray-600 mb-8">
          Wybierz scenariusz, aby zobaczyć szczegółowe instrukcje postępowania
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {scenarios.map((scenario) => (
            <Link
              key={scenario.id}
              href={`/krok-po-kroku/${scenario.id}`}
              className={`${scenario.color} border-2 rounded-xl p-5 transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="relative w-16 h-16">
                    <Image
                      src={scenario.icon}
                      alt={scenario.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {scenario.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {scenario.description}
                  </p>
                  <div className="mt-2 text-blue-600 text-sm font-medium">
                    Zobacz instrukcje →
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
