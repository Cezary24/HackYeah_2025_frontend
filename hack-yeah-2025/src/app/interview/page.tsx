"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = 1 | 2;

export default function InterviewPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [birthYear, setBirthYear] = useState("1997");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [readiness, setReadiness] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const router = useRouter();

  const handleOptionToggle = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      // Zapisz dane i przekieruj
      localStorage.setItem("interviewCompleted", "true");
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen w-full flex flex-col bg-white p-6">
      <div className="max-w-2xl mx-auto w-full flex-1 flex flex-col">
        {/* Nagłówek */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {currentStep === 1 ? "Wywiad wstępny" : "Opowiedz nam o sobie"}
          </h1>
          <p className="text-sm text-gray-600">
            Odpowiedz na te 3 pytania, aby otrzymać spersonalizowaną pomoc.
          </p>
        </div>

        {/* Formularz */}
        <div className="flex-1 space-y-8">
          {currentStep === 1 ? (
            <>
              {/* Pytanie 1: Data urodzenia */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  1. Data urodzenia
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={birthYear}
                    onChange={(e) => setBirthYear(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Rok urodzenia"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Pytanie 2: Gotowość do działania */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  2. Gotowość do działania
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setReadiness("family")}
                    className={`w-full px-4 py-3 border rounded-lg text-left text-sm transition-colors ${
                      readiness === "family"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    Przygotuję tylko moją rodzinę
                  </button>
                  <button
                    onClick={() => setReadiness("community")}
                    className={`w-full px-4 py-3 border rounded-lg text-left text-sm transition-colors ${
                      readiness === "community"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    Chcę pomagać także sąsiadom i społeczności
                  </button>
                </div>
              </div>

              {/* Pytanie 3: Opcje */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  3. Które z poniższych dotyczy Ciebie?
                </label>
                <div className="space-y-3">
                  {[
                    "Opiekuję się dziećmi, osobami starszymi lub zależnymi",
                    "Pracuję w służbach ratunkowych lub infrastrukturze kluczowej",
                    "Jestem osobą niepełnosprawną",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionToggle(option)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 flex-1">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Pytanie 1: Wiek */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  1. Wiek
                </label>
                <div className="flex gap-3">
                  {["15-25", "26-64", "65+"].map((age) => (
                    <button
                      key={age}
                      onClick={() => setAgeGroup(age)}
                      className={`flex-1 px-4 py-3 border rounded-lg text-sm font-medium transition-colors ${
                        ageGroup === age
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {age}
                    </button>
                  ))}
                </div>
              </div>

              {/* Pytanie 2: Gotowość do działania */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  2. Gotowość do działania
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setReadiness("family")}
                    className={`w-full px-4 py-3 border rounded-lg text-left text-sm transition-colors ${
                      readiness === "family"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    Przygotuję tylko moją rodzinę
                  </button>
                  <button
                    onClick={() => setReadiness("community")}
                    className={`w-full px-4 py-3 border rounded-lg text-left text-sm transition-colors ${
                      readiness === "community"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-300 bg-white hover:border-gray-400"
                    }`}
                  >
                    <div className="mb-1">
                      Chcę pomagać także sąsiadom i społeczności
                    </div>
                    <div className="text-xs text-blue-600 underline">
                      Szczegółowe instrukcje &gt;&gt;
                    </div>
                  </button>
                </div>
              </div>

              {/* Pytanie 3: Opcje */}
              <div>
                <label className="block text-base font-semibold text-gray-900 mb-3">
                  3. Które z poniższych dotyczy Ciebie?
                </label>
                <div className="space-y-3">
                  {[
                    "Opiekuję się dziećmi, osobami starszymi lub zależnymi",
                    "Pracuję w służbach ratunkowych lub infrastrukturze kluczowej",
                    "Jestem osobą niepełnosprawną",
                  ].map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option)}
                        onChange={() => handleOptionToggle(option)}
                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 flex-1">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Przycisk Dalej */}
        <div className="pt-6 pb-8">
          <button
            onClick={handleNext}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
          >
            Dalej
          </button>
        </div>
      </div>
    </main>
  );
}
