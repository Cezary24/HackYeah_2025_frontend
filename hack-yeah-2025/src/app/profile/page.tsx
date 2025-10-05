"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">(
    "medium"
  );
  const [highContrast, setHighContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <main className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
        {/* Profil użytkownika */}
        <div className="flex items-start gap-4 mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-300 rounded-full flex-shrink-0"></div>
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">
              Jan Kowalski
            </h1>
            <p className="text-sm sm:text-base text-gray-600">39 lat</p>
            <p className="text-sm sm:text-base text-gray-600">Wrocław</p>
          </div>
        </div>

        {/* Integracja z mObywatel */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="text-sm sm:text-base">
              Integracja z aplikacją mObywatel
            </span>
            <div className="w-5 h-5 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-3 h-3 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Ułatwienia dostępu */}
        <div className="mb-8">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            Ułatwienia dostępu
          </h2>

          {/* Wielkość czcionki */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm sm:text-base text-gray-700">
              Wielkość czcionki
            </span>
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setFontSize("small")}
                className={`text-sm font-medium ${
                  fontSize === "small"
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize("medium")}
                className={`text-base font-medium ${
                  fontSize === "medium"
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize("large")}
                className={`text-lg font-medium ${
                  fontSize === "large"
                    ? "text-gray-900"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                A+
              </button>
            </div>
          </div>

          {/* Większy kontrast */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm sm:text-base text-gray-700">
              Większy kontrast
            </span>
            <button
              onClick={() => setHighContrast(!highContrast)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                highContrast ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  highContrast ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Czytnik ekranu */}
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-700">
              Czytnik ekranu
            </span>
            <button
              onClick={() => setScreenReader(!screenReader)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                screenReader ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  screenReader ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Preferencje */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6">
            Preferencje
          </h2>

          {/* Powiadomienia push */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm sm:text-base text-gray-400">
              Powiadomienia push
            </span>
            <button
              onClick={() => setPushNotifications(!pushNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                pushNotifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          {/* Powiadomienia e-mail */}
          <div className="flex items-center justify-between">
            <span className="text-sm sm:text-base text-gray-400">
              Powiadomienia e-mail
            </span>
            <button
              onClick={() => setEmailNotifications(!emailNotifications)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                emailNotifications ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
