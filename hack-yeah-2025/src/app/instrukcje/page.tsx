import Image from "next/image";
import Link from "next/link";

interface Instruction {
  id: string;
  title: string;
  icon: string;
  pdfUrl: string;
}

const instructions: Instruction[] = [
  {
    id: "powodz",
    title: "Powódź",
    icon: "/assets/flood.png",
    pdfUrl:
      "https://www.gov.pl/attachment/5af47cd1-c51b-405a-8d2e-f066ed8c7e9d",
  },
  {
    id: "pozar",
    title: "Pożar",
    icon: "/assets/fire.png",
    pdfUrl:
      "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.gov.pl/attachment/dce442bf-7980-4b1b-9a2a-76d3ee4aaaf8&ved=2ahUKEwjJ553v9YuQAxVBBNsEHQ-wENgQFnoECBsQAQ&usg=AOvVaw0dnfEBXrY5AnkSycM_7k1_",
  },
  {
    id: "nalot-dronow",
    title: "Nalot dronów",
    icon: "/assets/dron.png",
    pdfUrl:
      "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.gov.pl/attachment/64c7377b-8ebb-4c19-a756-07ad3630f92c&ved=2ahUKEwjtpu6f9ouQAxUUQPEDHcmbJMkQFnoECBgQAQ&usg=AOvVaw39Eic3RQdJbc2nI_HSWMYP",
  },
];

export default function InstrukcjePage() {
  return (
    <main className="bg-gray-50 min-h-full p-4 sm:p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Instrukcje do pobrania
        </h1>

        <div className="flex flex-col gap-3">
          {instructions.map((instruction) => (
            <Link
              key={instruction.id}
              href={instruction.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="bg-white rounded-xl px-6 py-5 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 text-blue-500">
                  <div className="relative w-10 h-10">
                    <Image
                      src={instruction.icon}
                      alt={instruction.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
                <h2 className="text-lg font-medium text-gray-900">
                  {instruction.title}
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

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Kliknij aby pobrać instrukcję w formacie PDF</p>
        </div>
      </div>
    </main>
  );
}
