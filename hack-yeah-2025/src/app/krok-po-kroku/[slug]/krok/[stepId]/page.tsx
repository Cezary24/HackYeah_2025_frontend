import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getScenario } from "../../../scenarios";

interface PageProps {
  params: {
    slug: string;
    stepId: string;
  };
}

export default function StepDetailPage({ params }: PageProps) {
  const scenario = getScenario(params.slug);

  if (!scenario) {
    notFound();
  }

  const stepNumber = parseInt(params.stepId);
  const step = scenario.steps.find((s) => s.number === stepNumber);

  if (!step || !step.detailedInfo) {
    notFound();
  }

  return (
    <main className="bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6">
          <Link
            href={`/krok-po-kroku/${params.slug}`}
            className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <svg
              className="w-5 h-5 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Powrót do {scenario.title}
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-2xl font-bold text-blue-600">
                {step.number}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">
                {step.title}
              </h1>
              <p className="text-lg text-gray-600">{step.description}</p>
            </div>
          </div>

          {/* Hero Image */}
          <div className="bg-white rounded-2xl p-8 shadow-sm flex items-center justify-center mb-6">
            <div className="relative w-48 h-48">
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Introduction */}
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg mb-8">
            <p className="text-gray-800 leading-relaxed">
              {step.detailedInfo.introduction}
            </p>
          </div>
        </div>

        {/* Detailed Items */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Szczegółowe informacje
          </h2>
          <div className="space-y-4">
            {step.detailedInfo.items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {index + 1}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        {step.detailedInfo.tips && step.detailedInfo.tips.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Przydatne wskazówki
            </h2>
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <svg
                  className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">
                  Pamiętaj:
                </h3>
              </div>
              <ul className="space-y-3">
                {step.detailedInfo.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-gray-800">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
          <Link
            href={`/krok-po-kroku/${params.slug}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors text-center"
          >
            Wróć do wszystkich kroków
          </Link>
          <Link
            href="/krok-po-kroku"
            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-xl transition-colors text-center"
          >
            Zobacz inne scenariusze
          </Link>
        </div>
      </div>
    </main>
  );
}
