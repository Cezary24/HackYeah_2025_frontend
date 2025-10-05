"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Typy danych
interface Answers {
  // Faza 1
  describes: string[];
  readiness: string;
  age: string;

  // Faza 2
  livingSituation: string;
  householdSize: string;
  locationType: string;
  locationThreats: string[];
  locationResources: string[];
  preparednessActions: string[];
  timeAvailability: string;
  socialNetwork: string;

  // Faza 3 (warunkowe)
  [key: string]: string | string[];
}

interface Categories {
  level1: string[];
  level2Tags: string[];
}

type Phase = 1 | 2 | 3;

export default function InterviewPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    describes: [],
    readiness: "",
    age: "",
    livingSituation: "",
    householdSize: "",
    locationType: "",
    locationThreats: [],
    locationResources: [],
    preparednessActions: [],
    timeAvailability: "",
    socialNetwork: "",
  });
  const [categories, setCategories] = useState<Categories>({
    level1: ["PODSTAWOWE GOSPODARSTWO DOMOWE"],
    level2Tags: [],
  });

  // Funkcja do obliczania kategorii Level 1 na podstawie Fazy 1
  const calculateLevel1Categories = () => {
    const cats: string[] = ["PODSTAWOWE GOSPODARSTWO DOMOWE"];

    if (answers.describes.includes("caregiver")) {
      cats.push("OPIEKUN");
    }
    if (answers.describes.includes("essential")) {
      cats.push("PRACOWNIK KLUCZOWY");
    }
    if (answers.describes.includes("skilled")) {
      cats.push("WYKWALIFIKOWANY WSPÓŁPRACOWNIK");
    }
    if (answers.describes.includes("organization")) {
      cats.push("CZŁONEK ORGANIZACJI");
    }
    if (answers.readiness === "community") {
      cats.push("WOLONTARIUSZ WSPÓLNOTOWY");
    }

    setCategories((prev) => ({ ...prev, level1: cats }));
  };

  // Funkcja do obliczania tagów Level 2
  const calculateLevel2Tags = () => {
    const tags: string[] = [];

    // Sytuacja mieszkaniowa
    if (answers.livingSituation === "alone") tags.push("Samotny");
    if (answers.livingSituation === "couple") tags.push("Para");
    if (answers.livingSituation === "nuclear") tags.push("Rodzina Nuklearna");
    if (answers.livingSituation === "multigenerational")
      tags.push("Wielopokoleniowe");

    // Wielkość gospodarstwa
    if (answers.householdSize === "1") tags.push("Solo");
    if (answers.householdSize === "2") tags.push("Małe gospodarstwo");
    if (answers.householdSize === "3-4") tags.push("Średnie gospodarstwo");
    if (answers.householdSize === "5-6") tags.push("Duże gospodarstwo");
    if (answers.householdSize === "7+") tags.push("Bardzo duże gospodarstwo");

    // Typ lokalizacji
    if (answers.locationType === "city-apartment")
      tags.push("Mieszkaniec Miasta");
    if (answers.locationType === "city-house") tags.push("Miasto + Ogród");
    if (answers.locationType === "suburbs") tags.push("Przedmieścia");
    if (answers.locationType === "rural") tags.push("Mieszkaniec Wsi");
    if (answers.locationType === "isolated") {
      tags.push("Izolacja", "Oddalony");
    }

    // Zagrożenia lokalizacyjne
    if (answers.locationThreats.includes("flood"))
      tags.push("Obszar zagrożony powodziami");
    if (answers.locationThreats.includes("border"))
      tags.push("Region przygraniczny");
    if (answers.locationThreats.includes("critical"))
      tags.push("Blisko infrastruktury krytycznej");
    if (answers.locationThreats.includes("remote"))
      tags.push("Oddalony/Izolowany");

    // Zasoby
    if (answers.locationResources.includes("basement"))
      tags.push("Przestrzeń magazynowa");
    if (answers.locationResources.includes("garage"))
      tags.push("Budynki dodatkowe");
    if (answers.locationResources.includes("garden"))
      tags.push("Możliwość uprawy");
    if (answers.locationResources.includes("heating"))
      tags.push("Alternatywne zasoby");
    if (answers.locationResources.includes("water")) tags.push("Własna woda");

    // Poziom przygotowania
    const prepCount = answers.preparednessActions.length;
    if (prepCount <= 2) tags.push("Nowy w Przygotowaniu");
    else if (prepCount <= 5) tags.push("Średniozaawansowany");
    else tags.push("Zaawansowany Prepper");

    // Dostępność czasu
    if (answers.timeAvailability === "high")
      tags.push("Wysoka dostępność czasu");
    if (answers.timeAvailability === "moderate")
      tags.push("Umiarkowana dostępność");
    if (answers.timeAvailability === "limited") tags.push("Ograniczony czas");
    if (answers.timeAvailability === "minimal")
      tags.push("Minimalna dostępność");

    // Sieć społeczna
    if (answers.socialNetwork === "strong") tags.push("Silna sieć lokalna");
    if (answers.socialNetwork === "weak") tags.push("Słaba sieć lokalna");
    if (answers.socialNetwork === "building") tags.push("Budowanie sieci");
    if (answers.socialNetwork === "isolated") tags.push("Izolacja społeczna");

    setCategories((prev) => ({ ...prev, level2Tags: tags }));
  };

  // Definicje pytań dla każdej fazy
  const phase1Questions = [
    {
      id: "describes",
      question: "Które z poniższych Cię opisują?",
      subtitle: "Zaznacz wszystkie, które dotyczą",
      type: "checkbox",
      options: [
        {
          value: "caregiver",
          label: "Opiekuję się dziećmi, osobami starszymi lub zależnymi",
        },
        {
          value: "essential",
          label: "Pracuję w służbach ratunkowych lub infrastrukturze kluczowej",
        },
        {
          value: "skilled",
          label:
            "Mam specjalistyczne umiejętności (medyczne, techniczne, organizacyjne)",
        },
        {
          value: "organization",
          label:
            "Należę do organizacji (straż, koło łowieckie, stowarzyszenie)",
        },
      ],
    },
    {
      id: "readiness",
      question: "Gotowość do działania",
      type: "radio",
      options: [
        { value: "family", label: "Przygotowuję tylko moją rodzinę" },
        {
          value: "community",
          label: "Chcę też pomagać sąsiadom i społeczności",
        },
      ],
    },
    {
      id: "age",
      question: "Wiek",
      type: "radio",
      options: [
        { value: "15-25", label: "15-25 lat" },
        { value: "26-64", label: "26-64 lata" },
        { value: "65+", label: "65+ lat" },
      ],
    },
  ];

  const phase2Questions = [
    {
      id: "livingSituation",
      question: "Sytuacja mieszkaniowa",
      type: "radio",
      options: [
        { value: "alone", label: "Mieszkam sam/sama" },
        { value: "couple", label: "Mieszkam z partnerem (bez dzieci)" },
        { value: "nuclear", label: "Rodzina z dziećmi" },
        { value: "multigenerational", label: "Dom wielopokoleniowy" },
        { value: "other", label: "Inne wspólne mieszkanie" },
      ],
    },
    {
      id: "householdSize",
      question: "Wielkość gospodarstwa",
      type: "radio",
      options: [
        { value: "1", label: "1 osoba" },
        { value: "2", label: "2 osoby" },
        { value: "3-4", label: "3-4 osoby" },
        { value: "5-6", label: "5-6 osób" },
        { value: "7+", label: "7+ osób" },
      ],
    },
    {
      id: "locationType",
      question: "Typ lokalizacji",
      type: "radio",
      options: [
        { value: "city-apartment", label: "Miasto - blok/apartament" },
        { value: "city-house", label: "Miasto - dom z ogrodem" },
        { value: "suburbs", label: "Przedmieścia" },
        { value: "rural", label: "Wieś/gospodarstwo" },
        { value: "isolated", label: "Oddalona/izolowana lokalizacja" },
      ],
    },
    {
      id: "locationThreats",
      question: "Zagrożenia lokalizacyjne",
      subtitle: "Zaznacz wszystkie, które dotyczą",
      type: "checkbox",
      options: [
        { value: "flood", label: "Powodzie/podtopienia" },
        { value: "border", label: "Region przygraniczny (do 50km)" },
        { value: "critical", label: "Bliskość infrastruktury strategicznej" },
        { value: "remote", label: "Obszar oddalony (>30min służby)" },
        { value: "none", label: "Żadne z powyższych" },
      ],
    },
    {
      id: "locationResources",
      question: "Zasoby w miejscu zamieszkania",
      subtitle: "Zaznacz wszystkie, które posiadasz",
      type: "checkbox",
      options: [
        { value: "basement", label: "Piwnica/schron" },
        { value: "garage", label: "Garaż/budynki gospodarcze" },
        { value: "garden", label: "Ogród/możliwość uprawy" },
        { value: "heating", label: "Alternatywne ogrzewanie" },
        { value: "water", label: "Studnia/własne źródło wody" },
        { value: "none", label: "Tylko przestrzeń mieszkalna" },
      ],
    },
    {
      id: "preparednessActions",
      question: "Konkretne działania przygotowawcze",
      subtitle: "Zaznacz wszystkie, które już zrealizowałeś",
      type: "checkbox",
      options: [
        { value: "water", label: "Zapasy wody (3 dni)" },
        { value: "food", label: "Zapasy żywności (3 dni)" },
        { value: "firstaid", label: "Apteczka pierwszej pomocy" },
        { value: "radio", label: "Radio na baterie/korbkowe" },
        { value: "flashlight", label: "Latarka z zapasowymi bateriami" },
        { value: "plan", label: "Plan komunikacji rodzinnej" },
        { value: "gobag", label: "Plecak ewakuacyjny ('Go-Bag')" },
        { value: "cash", label: "Gotówka w małych nominałach" },
        { value: "documents", label: "Dokumenty w wodoodpornym pojemniku" },
        { value: "none", label: "Nic z powyższych" },
      ],
    },
    {
      id: "timeAvailability",
      question: "Dostępność czasu",
      type: "radio",
      options: [
        { value: "high", label: "Wysoka (kilka godzin tygodniowo)" },
        { value: "moderate", label: "Umiarkowana (raz w miesiącu)" },
        { value: "limited", label: "Ograniczona (tylko rodzina)" },
        { value: "minimal", label: "Minimalna (bardzo napięty grafik)" },
      ],
    },
    {
      id: "socialNetwork",
      question: "Sieć społeczna w okolicy",
      type: "radio",
      options: [
        {
          value: "strong",
          label: "Znam dobrze sąsiadów - moglibyśmy się wspierać",
        },
        { value: "weak", label: "Znam niektórych powierzchownie" },
        { value: "building", label: "Jestem nowy/a - buduję relacje" },
        { value: "isolated", label: "Nie znam sąsiadów / izolacja" },
      ],
    },
  ];

  const getCurrentQuestions = () => {
    if (phase === 1) return phase1Questions;
    if (phase === 2) return phase2Questions;
    return []; // Faza 3 będzie później
  };

  const currentQuestions = getCurrentQuestions();
  const totalQuestions = currentQuestions.length;
  const currentQ = currentQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  const handleAnswer = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxToggle = (questionId: string, value: string) => {
    const currentValues = (answers[questionId] as string[]) || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value];
    handleAnswer(questionId, newValues);
  };

  const canProceed = () => {
    if (!currentQ) return false;
    const answer = answers[currentQ.id];
    if (currentQ.type === "checkbox") {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer !== "" && answer !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Koniec fazy
      if (phase === 1) {
        calculateLevel1Categories();
        setPhase(2);
        setCurrentQuestion(0);
      } else if (phase === 2) {
        calculateLevel2Tags();
        // Przejście do podsumowania lub Fazy 3
        finishInterview();
      }
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (phase > 1) {
      setPhase((phase - 1) as Phase);
      const prevQuestions = phase === 2 ? phase1Questions : phase2Questions;
      setCurrentQuestion(prevQuestions.length - 1);
    }
  };

  const finishInterview = () => {
    // Zapisz wyniki
    localStorage.setItem("interviewCompleted", "true");
    localStorage.setItem("userCategories", JSON.stringify(categories));
    localStorage.setItem("userAnswers", JSON.stringify(answers));
    router.push("/");
  };

  if (!currentQ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-3xl mx-auto">
        {/* Nagłówek z fazą */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Wywiad Przygotowawczy
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Faza {phase} z 2 - Pytanie {currentQuestion + 1} z{" "}
                {totalQuestions}
              </p>
            </div>
            {phase > 1 || currentQuestion > 0 ? (
              <button
                onClick={handleBack}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium"
              >
                ← Wstecz
              </button>
            ) : null}
          </div>

          {/* Pasek postępu */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Karta z pytaniem */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6">
          {/* Numer pytania */}
          <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Pytanie {currentQuestion + 1}/{totalQuestions}
          </div>

          {/* Pytanie */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {currentQ.question}
          </h2>
          {currentQ.subtitle && (
            <p className="text-sm text-gray-600 mb-6">{currentQ.subtitle}</p>
          )}

          {/* Opcje odpowiedzi */}
          <div className="space-y-3">
            {currentQ.options.map((option) => {
              const isSelected =
                currentQ.type === "checkbox"
                  ? (answers[currentQ.id] as string[])?.includes(option.value)
                  : answers[currentQ.id] === option.value;

              if (currentQ.type === "checkbox") {
                return (
                  <label
                    key={option.value}
                    className={`flex items-start gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-md ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() =>
                        handleCheckboxToggle(currentQ.id, option.value)
                      }
                      className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-base text-gray-800 flex-1">
                      {option.label}
                    </span>
                  </label>
                );
              }

              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className={`w-full text-left p-4 border-2 rounded-xl transition-all hover:shadow-md ${
                    isSelected
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span className="text-base text-gray-800">
                      {option.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Przyciski nawigacji */}
        <div className="flex gap-3">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-4 rounded-xl font-semibold text-base shadow-lg transition-all ${
              canProceed()
                ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentQuestion === totalQuestions - 1
              ? phase === 2
                ? "Zakończ"
                : "Następna faza"
              : "Dalej"}
          </button>
        </div>

        {/* Informacja o zapisywaniu */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Twoje odpowiedzi są zapisywane lokalnie i nie są wysyłane na serwer
        </p>
      </div>
    </main>
  );
}
