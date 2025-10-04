import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenario, getAllScenarioIds } from "../scenarios";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const ids = getAllScenarioIds();
  return ids.map((slug) => ({ slug }));
}

export default function ScenarioDetailPage({ params }: PageProps) {
  const scenario = getScenario(params.slug);

  if (!scenario) {
    notFound();
  }

  return (
    <main className="bg-white p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/krok-po-kroku"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 text-sm"
        >
          ← Powrót do scenariuszy
        </Link>

        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          {scenario.title}
        </h1>
        <p className="text-gray-600 mb-8">{scenario.subtitle}</p>

        <div className="relative">
          {scenario.steps.map((step, index) => (
            <div key={step.number} className="relative flex gap-6 pb-12">
              {index < scenario.steps.length - 1 && (
                <div className="absolute left-[15px] top-[40px] bottom-0 w-[2px] bg-blue-400" />
              )}

              <div className="relative flex-shrink-0">
                <div className="w-[30px] h-[30px] rounded-full bg-white border-2 border-blue-500 flex items-center justify-center text-sm font-semibold text-blue-500 z-10">
                  {step.number}
                </div>
              </div>

              <div className="flex-1 pt-0">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                  {step.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>

                <div className="bg-gray-50 rounded-lg p-6 mb-4 flex items-center justify-center">
                  <div className="relative w-32 h-32">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <Link
                  href={step.linkHref}
                  className="text-blue-600 text-sm hover:text-blue-700 hover:underline inline-block"
                >
                  {step.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
