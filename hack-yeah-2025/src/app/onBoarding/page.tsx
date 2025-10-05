"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const slides = [
  {
    title: "Bądź zawsze gotowy",
    description:
      "Crisis Assistant pomoże Ci przygotować się na sytuacje kryzysowe.",
    image: "/assets/onBoarding/backpack.png",
  },
  {
    title: "Instrukcje krok po kroku",
    description:
      "Czytelne i treściwe instrukcje pomogą Ci zachować zimną krew.",
    image: "/assets/onBoarding/steps_intro.png",
  },
  {
    title: "Mapa zagrożeń",
    description: "Bądź na czasie z zagrożeniami naturalnymi i zewnętrznymi.",
    image: "/assets/onBoarding/poland.png",
  },
];

export default function OnBoardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Ukończono onboarding - zapisz w localStorage i przekieruj
      localStorage.setItem("onboardingCompleted", "true");
      router.push("/");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingCompleted", "true");
    router.push("/");
  };

  const slide = slides[currentSlide];

  return (
    <main className="h-screen w-full flex flex-col bg-white">
      {/* Numer slajdu */}
      <div className="flex-shrink-0 pt-6 px-8">
        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300">
          <span className="text-lg font-semibold text-gray-700">
            {currentSlide + 1}
          </span>
        </div>
      </div>

      {/* Treść slajdu */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-8">
        {/* Ilustracja */}
        <div className="w-full max-w-md mb-8">
          <div className="relative w-full flex items-center justify-center">
            <Image
              src={slide.image}
              alt={slide.title}
              width={currentSlide === 1 ? 280 : 240}
              height={currentSlide === 1 ? 280 : 240}
              className="object-contain"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>

        {/* Tytuł */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center px-4">
          {slide.title}
        </h1>

        {/* Opis */}
        <p className="text-base text-gray-600 text-center max-w-md px-4">
          {slide.description}
        </p>
      </div>

      {/* Kontrolki */}
      <div className="flex-shrink-0 pb-8 px-8 pb-safe">
        {/* Wskaźniki slajdów */}
        <div className="flex justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-gray-800 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Przyciski */}
        <div className="space-y-3">
          <button
            onClick={handleNext}
            className="w-full py-4 bg-blue-600 text-white rounded-lg font-semibold text-base hover:bg-blue-700 transition-colors shadow-sm"
          >
            {currentSlide < slides.length - 1 ? "Dalej" : "Rozpocznij"}
          </button>

          {currentSlide < slides.length - 1 && (
            <button
              onClick={handleSkip}
              className="w-full py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors"
            >
              Pomiń
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
