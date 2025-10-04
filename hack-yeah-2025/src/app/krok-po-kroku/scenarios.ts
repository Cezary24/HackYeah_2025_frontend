export interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
}

export interface ScenarioData {
  id: string;
  title: string;
  subtitle: string;
  steps: Step[];
}

export const scenariosData: Record<string, ScenarioData> = {
  "atak-drona": {
    id: "atak-drona",
    title: "Atak drona",
    subtitle: "Nalot dronów - postępowanie",
    steps: [
      {
        number: 1,
        title: "Zbierz potrzebne rzeczy",
        description: "Zapakuj niezbędne przedmioty do ewakuacji",
        image: "/assets/step_by_step.png",
        linkText: "Szczegółowe instrukcje >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Poszukaj schronienia",
        description: "Udaj się do najbliższego schronu",
        image: "/assets/bunker.png",
        linkText: "Schronienia w Twoim obszarze >>",
        linkHref: "/map-alert",
      },
      {
        number: 3,
        title: "Zachowaj spokój",
        description: "Postępuj zgodnie z instrukcjami służb ratunkowych",
        image: "/assets/alert.png",
        linkText: "Więcej informacji >>",
        linkHref: "/instrukcje",
      },
    ],
  },
  pozar: {
    id: "pozar",
    title: "Pożar",
    subtitle: "Postępowanie w przypadku pożaru",
    steps: [
      {
        number: 1,
        title: "Zadzwoń pod 998 lub 112",
        description: "Natychmiast powiadom straż pożarną",
        image: "/assets/alert.png",
        linkText: "Numery alarmowe >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Opuść budynek",
        description: "Nie korzystaj z windy, używaj schodów",
        image: "/assets/step_by_step.png",
        linkText: "Zasady ewakuacji >>",
        linkHref: "/instrukcje",
      },
      {
        number: 3,
        title: "Nie wracaj do budynku",
        description: "Czekaj na przybycie służb ratunkowych",
        image: "/assets/danger.png",
        linkText: "Więcej informacji >>",
        linkHref: "/instrukcje",
      },
    ],
  },
  "atak-chemiczny": {
    id: "atak-chemiczny",
    title: "Atak chemiczny",
    subtitle: "Postępowanie podczas ataku chemicznego",
    steps: [
      {
        number: 1,
        title: "Zabezpiecz drogi oddechowe",
        description: "Użyj maseczki lub wilgotnej tkaniny",
        image: "/assets/danger.png",
        linkText: "Jak zabezpieczyć się >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Udaj się do bezpiecznego miejsca",
        description: "Zamknij się w pomieszczeniu, uszczelnij okna i drzwi",
        image: "/assets/bunker.png",
        linkText: "Znajdź bezpieczne miejsce >>",
        linkHref: "/map-alert",
      },
      {
        number: 3,
        title: "Słuchaj komunikatów",
        description: "Postępuj zgodnie z instrukcjami służb",
        image: "/assets/alert.png",
        linkText: "Aktualne komunikaty >>",
        linkHref: "/news",
      },
    ],
  },
  "trzesienie-ziemi": {
    id: "trzesienie-ziemi",
    title: "Trzęsienie ziemi",
    subtitle: "Bezpieczne zachowanie podczas trzęsienia ziemi",
    steps: [
      {
        number: 1,
        title: "Schowaj się i osłoń",
        description: "Pod stołem lub przy wewnętrznej ścianie",
        image: "/assets/bunker.png",
        linkText: "Bezpieczne miejsca >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Trzymaj się mocno",
        description: "Chroń głowę i kark przed spadającymi przedmiotami",
        image: "/assets/step_by_step.png",
        linkText: "Jak się chronić >>",
        linkHref: "/instrukcje",
      },
      {
        number: 3,
        title: "Po wstrząsach sprawdź otoczenie",
        description: "Uważaj na uszkodzenia i opuść budynek ostrożnie",
        image: "/assets/alert.png",
        linkText: "Co robić później >>",
        linkHref: "/instrukcje",
      },
    ],
  },
  powodz: {
    id: "powodz",
    title: "Powódź",
    subtitle: "Postępowanie w przypadku powodzi",
    steps: [
      {
        number: 1,
        title: "Ewakuuj się na wyższy poziom",
        description: "Udaj się na wyższe piętro lub teren",
        image: "/assets/step_by_step.png",
        linkText: "Zasady ewakuacji >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Zabierz dokumenty i leki",
        description: "Zapakuj najważniejsze rzeczy wodoodporne",
        image: "/assets/bunker.png",
        linkText: "Lista rzeczy >>",
        linkHref: "/instrukcje",
      },
      {
        number: 3,
        title: "Unikaj wody",
        description: "Nie wchodź do wody, może być elektrycznie naładowana",
        image: "/assets/danger.png",
        linkText: "Zagrożenia >>",
        linkHref: "/instrukcje",
      },
    ],
  },
  "atak-terrorystyczny": {
    id: "atak-terrorystyczny",
    title: "Atak terrorystyczny",
    subtitle: "Jak zachować się podczas ataku terrorystycznego",
    steps: [
      {
        number: 1,
        title: "Uciekaj",
        description: "Opuść miejsce zdarzenia jak najszybciej",
        image: "/assets/step_by_step.png",
        linkText: "Drogi ewakuacji >>",
        linkHref: "/instrukcje",
      },
      {
        number: 2,
        title: "Schowaj się",
        description: "Jeśli nie możesz uciec, znajdź kryjówkę",
        image: "/assets/bunker.png",
        linkText: "Bezpieczne miejsca >>",
        linkHref: "/map-alert",
      },
      {
        number: 3,
        title: "Zadzwoń pod 112",
        description: "Powiadom służby o zagrożeniu",
        image: "/assets/alert.png",
        linkText: "Numer alarmowy >>",
        linkHref: "/sos",
      },
    ],
  },
};

export function getScenario(slug: string): ScenarioData | null {
  return scenariosData[slug] || null;
}

export function getAllScenarioIds(): string[] {
  return Object.keys(scenariosData);
}
