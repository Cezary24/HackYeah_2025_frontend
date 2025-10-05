export interface StepDetailItem {
  title: string;
  description: string;
  icon?: string;
}

export interface Step {
  number: number;
  title: string;
  description: string;
  image: string;
  linkText: string;
  linkHref: string;
  detailedInfo?: {
    introduction: string;
    items: StepDetailItem[];
    tips?: string[];
  };
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
        detailedInfo: {
          introduction:
            "Przygotuj plecak ewakuacyjny z najważniejszymi rzeczami, które mogą Ci się przydać podczas ewakuacji do schronu. Pamiętaj, że liczy się czas - pakuj tylko najważniejsze rzeczy.",
          items: [
            {
              title: "Dokumenty osobiste",
              description:
                "Dowód osobisty, paszport, polisa ubezpieczeniowa, książeczka zdrowia. Zabezpiecz je w wodoodpornej torebce.",
            },
            {
              title: "Leki i apteczka",
              description:
                "Przepisane leki, podstawowa apteczka pierwszej pomocy, bandaże, plastry, środki dezynfekujące.",
            },
            {
              title: "Woda i jedzenie",
              description:
                "Butelki z wodą (min. 2L na osobę), energetyczne batoniki, konserwy, suchy prowiant na 48 godzin.",
            },
            {
              title: "Odzież i ciepło",
              description:
                "Zmiana ubrań, ciepła kurtka, koc termiczny, odzież przeciwdeszczowa, wygodne obuwie.",
            },
            {
              title: "Latarka i radio",
              description:
                "Latarka LED z zapasowymi bateriami, radio przenośne na baterie, powerbank do telefonu.",
            },
            {
              title: "Środki higieny",
              description:
                "Podstawowe środki higieny osobistej, chusteczki nawilżane, papier toaletowy, mydło.",
            },
            {
              title: "Gotówka",
              description:
                "Mała ilość gotówki w niskich nominałach - terminale płatnicze mogą nie działać.",
            },
            {
              title: "Kluczowe kontakty",
              description:
                "Lista ważnych numerów telefonów zapisana na kartce (rodzina, służby ratunkowe, sąsiedzi).",
            },
          ],
          tips: [
            "Regularnie sprawdzaj i aktualizuj zawartość plecaka ewakuacyjnego",
            "Trzymaj plecak w łatwo dostępnym miejscu",
            "Upewnij się, że wszyscy domownicy wiedzą, gdzie jest plecak",
            "Nie pakuj zbyt wiele - plecak powinien być lekki i wygodny do noszenia",
          ],
        },
      },
      {
        number: 2,
        title: "Poszukaj schronienia",
        description: "Udaj się do najbliższego schronu",
        image: "/assets/bunker.png",
        linkText: "Schronienia w Twoim obszarze >>",
        linkHref: "/map-alert",
        detailedInfo: {
          introduction:
            "W przypadku ataku dronów najważniejsze jest szybkie znalezienie schronienia. Sprawdź wcześniej lokalizacje schronów w Twojej okolicy, aby wiedzieć dokąd się udać.",
          items: [
            {
              title: "Oficjalne schrony",
              description:
                "Sprawdź mapę schronów publicznych w Twojej okolicy. To najlepsze miejsce schronienia - są wyposażone w niezbędne systemy wsparcia życia.",
            },
            {
              title: "Piwnice budynków",
              description:
                "Jeśli nie możesz dotrzeć do schronu, udaj się do piwnicy budynku. Unikaj okien i zewnętrznych ścian.",
            },
            {
              title: "Parkingi podziemne",
              description:
                "Wielopoziomowe parkingi podziemne mogą stanowić tymczasowe schronienie. Im niższy poziom, tym bezpieczniej.",
            },
            {
              title: "Stacje metra",
              description:
                "W miastach z metrem, stacje mogą służyć jako schronienie. Udaj się na perony, z dala od wejść.",
            },
            {
              title: "Unikaj przeszkleń",
              description:
                "Trzymaj się z dala od okien, przeszkleń i drzwi zewnętrznych. W razie eksplozji szkło może stanowić poważne zagrożenie.",
            },
            {
              title: "Wybierz wewnętrzne pomieszczenia",
              description:
                "Jeśli nie ma dostępu do piwnicy, wybierz pomieszczenie bez okien w centrum budynku (łazienka, korytarz).",
            },
          ],
          tips: [
            "Zawsze miej przygotowany plan ewakuacji z domu i miejsca pracy",
            "Poznaj lokalizację najbliższych schronów już dziś",
            "W drodze do schronu poruszaj się szybko, ale uważaj na otoczenie",
            "Pomóż osobom starszym i niepełnosprawnym w dotarciu do bezpiecznego miejsca",
          ],
        },
      },
      {
        number: 3,
        title: "Zachowaj spokój",
        description: "Postępuj zgodnie z instrukcjami służb ratunkowych",
        image: "/assets/alert.png",
        linkText: "Więcej informacji >>",
        linkHref: "/instrukcje",
        detailedInfo: {
          introduction:
            "W sytuacji zagrożenia najważniejsze jest zachowanie spokoju i postępowanie zgodnie z instrukcjami służb ratunkowych. Panika może prowadzić do błędnych decyzji.",
          items: [
            {
              title: "Słuchaj komunikatów RCB",
              description:
                "Monitoruj komunikaty Rządowego Centrum Bezpieczeństwa na telefonie i w radio. To oficjalne źródło informacji.",
            },
            {
              title: "Nie wychodź bez pozwolenia",
              description:
                "Pozostań w schronieniu dopóki służby nie ogłoszą zniesienia alarmu. Przedwczesne wyjście może być niebezpieczne.",
            },
            {
              title: "Zachowaj ciszę",
              description:
                "W schronie zachowuj spokój i ciszę. Pozwól innym skupić się na komunikatach i instrukcjach.",
            },
            {
              title: "Oszczędzaj zasoby",
              description:
                "Gospodaruj wodą, jedzeniem i energią w telefonie. Nie wiadomo jak długo będziesz w schronieniu.",
            },
            {
              title: "Pomóż innym",
              description:
                "Jeśli możesz, pomagaj innym osobom w schronie. Wspólnie łatwiej przetrwać trudną sytuację.",
            },
            {
              title: "Nie rozpowszechniaj plotek",
              description:
                "Dziel się tylko zweryfikowanymi informacjami. Fake newsy mogą powodować panikę.",
            },
          ],
          tips: [
            "Oddychaj głęboko jeśli czujesz się zestresowany",
            "Jeśli masz dzieci, staraj się je uspokoić i odwrócić ich uwagę",
            "Ufaj służbom ratunkowym - są przeszkolone do radzenia sobie z takimi sytuacjami",
            "Po wyjściu ze schronu sprawdź czy nie ma niewybuchu w okolicy",
          ],
        },
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
        detailedInfo: {
          introduction:
            "Natychmiastowe powiadomienie służb ratunkowych to kluczowy element w walce z pożarem. Każda sekunda się liczy.",
          items: [
            {
              title: "998 - Straż Pożarna",
              description:
                "Numer dedykowany do zgłaszania pożarów. Połączenie jest priorytetowe.",
            },
            {
              title: "112 - Numer alarmowy",
              description:
                "Europejski numer alarmowy łączący ze wszystkimi służbami ratunkowymi. Działa nawet bez zasięgu Twojego operatora.",
            },
            {
              title: "Podaj dokładną lokalizację",
              description:
                "Ulica, numer budynku, piętro, kod pocztowy. Im dokładniej, tym szybsza pomoc.",
            },
            {
              title: "Opisz sytuację",
              description:
                "Co się pali, jak duży jest pożar, czy są osoby w zagrożeniu, czy są osoby ranne.",
            },
            {
              title: "Pozostań na linii",
              description:
                "Nie rozłączaj się pierwszy. Dyżurny może potrzebować dodatkowych informacji.",
            },
            {
              title: "Powiadom sąsiadów",
              description:
                "Po zgłoszeniu poinformuj sąsiadów o zagrożeniu, szczególnie starszych i niepełnosprawnych.",
            },
          ],
          tips: [
            "Zachowaj spokój podczas rozmowy - mów wyraźnie i spokojnie",
            "Miej zawsze przy telefonie adres miejsca, w którym przebywasz",
            "Jeśli nie możesz mówić (zagrożenie), pozostań na linii - służby zlokalizują połączenie",
            "Nauczysz dzieci jak zadzwonić pod numer alarmowy",
          ],
        },
      },
      {
        number: 2,
        title: "Opuść budynek",
        description: "Nie korzystaj z windy, używaj schodów",
        image: "/assets/step_by_step.png",
        linkText: "Zasady ewakuacji >>",
        linkHref: "/instrukcje",
        detailedInfo: {
          introduction:
            "Szybka i bezpieczna ewakuacja to najważniejszy element przetrwania w pożarze. Przestrzegaj podstawowych zasad bezpieczeństwa.",
          items: [
            {
              title: "Sprawdź drzwi przed otwarciem",
              description:
                "Dotknij drzwi grzbietem dłoni. Jeśli są gorące, nie otwieraj - szukaj innego wyjścia.",
            },
            {
              title: "Poruszaj się nisko",
              description:
                "Toksyczny dym unosi się do góry. Poruszaj się w kucki lub czworakach, tam gdzie jest więcej tlenu.",
            },
            {
              title: "Nie używaj windy",
              description:
                "Winda może zatrzymać się między piętrami lub otworzyć się na piętrze objętym pożarem. Zawsze używaj schodów.",
            },
            {
              title: "Zamknij drzwi za sobą",
              description:
                "Zamykanie drzwi spowalnia rozprzestrzenianie ognia i dymu.",
            },
            {
              title: "Nie zbieraj rzeczy",
              description:
                "Życie jest ważniejsze niż przedmioty. Ewakuuj się natychmiast bez pakowania.",
            },
            {
              title: "Pomóż innym",
              description:
                "Jeśli to bezpieczne, pomóż dzieciom, starszym osobom i osobom niepełnosprawnym.",
            },
          ],
          tips: [
            "Poznaj drogi ewakuacyjne w swoim budynku zanim zajdzie taka potrzeba",
            "Jeśli jest dużo dymu, przyłóż do ust i nosa mokrą tkaninę",
            "Nie wracaj po rzeczy - wyjdź i czekaj na strażaków",
            "Jeśli nie możesz wyjść, zamknij się w pokoju i uszczelnij szpary",
          ],
        },
      },
      {
        number: 3,
        title: "Nie wracaj do budynku",
        description: "Czekaj na przybycie służb ratunkowych",
        image: "/assets/danger.png",
        linkText: "Więcej informacji >>",
        linkHref: "/instrukcje",
        detailedInfo: {
          introduction:
            "Po ewakuacji pozostań w bezpiecznej odległości od budynku. Wracanie do płonącego budynku to najczęstsza przyczyna ofiar śmiertelnych.",
          items: [
            {
              title: "Odejdź na bezpieczną odległość",
              description:
                "Oddal się co najmniej 100 metrów od budynku. Mogą wybuchać okna, spadać elementy konstrukcji.",
            },
            {
              title: "Nie wracaj po rzeczy",
              description:
                "Nigdy nie wracaj do płonącego budynku, nawet po dokumenty, pieniądze czy telefon. To nie jest warte Twojego życia.",
            },
            {
              title: "Sprawdź czy wszyscy wyszli",
              description:
                "Policz domowników. Jeśli kogoś brakuje, natychmiast powiadom strażaków - nie wchodź sam.",
            },
            {
              title: "Udziel pierwszej pomocy",
              description:
                "Jeśli ktoś jest ranny lub nadychał się dymu, udziel pierwszej pomocy i wezwij karetkę.",
            },
            {
              title: "Współpracuj ze służbami",
              description:
                "Odpowiadaj na pytania strażaków, udzielaj im informacji o budynku i osobach wewnątrz.",
            },
            {
              title: "Czekaj na pozwolenie wejścia",
              description:
                "Wejdź z powrotem do budynku dopiero gdy strażacy potwierdzą, że jest bezpiecznie.",
            },
          ],
          tips: [
            "Jeśli Twoje ubranie się zapaliło: zatrzymaj się, upadnij i turlaj",
            "Zadymienie może powodować dezorientację - ufaj strażakom",
            "Dokumentuj szkody zdjęciami dla ubezpieczenia (z bezpiecznej odległości)",
            "Szukaj pomocy psychologicznej jeśli pożar był traumatycznym doświadczeniem",
          ],
        },
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
        detailedInfo: {
          introduction:
            "W przypadku zagrożenia powodzią priorytetem jest jak najszybsze przeniesienie się na wyższy poziom. Woda może podnosić się bardzo szybko.",
          items: [
            {
              title: "Monitoruj ostrzeżenia",
              description:
                "Śledź komunikaty służb hydrologicznych, RCB i lokalnych władz. Reaguj na każde ostrzeżenie poważnie.",
            },
            {
              title: "Nie czekaj do ostatniej chwili",
              description:
                "Ewakuuj się natychmiast po otrzymaniu komunikatu. W przypadku wątpliwości lepiej ewakuować się prewencyjnie.",
            },
            {
              title: "Idź na wyższe piętro",
              description:
                "Jeśli mieszkasz w domu wielopiętrowym, udaj się na najwyższe piętro lub poddasze.",
            },
            {
              title: "Szukaj wzniesień",
              description:
                "Jeśli to możliwe, udaj się na pagórki lub inne naturalne wzniesienia terenu.",
            },
            {
              title: "Unikaj piwnic i parteru",
              description:
                "Piwnice i pomieszczenia na parterze są najbardziej zagrożone zalaniem.",
            },
            {
              title: "Posłuchaj sygnału ewakuacji",
              description:
                "Jeśli władze zarządzą ewakuację, podporządkuj się instrukcjom służb ratunkowych.",
            },
          ],
          tips: [
            "Przygotuj wcześniej plan ewakuacji dla swojej rodziny",
            "Oznacz na mapie najbliższe bezpieczne miejsca",
            "Jeśli masz zwierzęta, zabierz je ze sobą",
            "Wyłącz gaz, prąd i wodę przed opuszczeniem domu",
          ],
        },
      },
      {
        number: 2,
        title: "Zabierz dokumenty i leki",
        description: "Zapakuj najważniejsze rzeczy wodoodporne",
        image: "/assets/bunker.png",
        linkText: "Lista rzeczy >>",
        linkHref: "/instrukcje",
        detailedInfo: {
          introduction:
            "Podczas ewakuacji przed powodzią zabierz tylko najważniejsze rzeczy zabezpieczone przed wodą. Nie trać czasu na pakowanie zbędnych przedmiotów.",
          items: [
            {
              title: "Dokumenty w wodoodpornym opakowaniu",
              description:
                "Dowody osobiste, akty urodzenia, dokumenty nieruchomości, polisy ubezpieczeniowe. Zapakuj je w szczelny worek foliowy lub pojemnik.",
            },
            {
              title: "Leki i historia choroby",
              description:
                "Wszystkie przepisane leki, recepty, informacje o alergiach i przewlekłych chorobach.",
            },
            {
              title: "Pieniądze i karty",
              description:
                "Gotówka, karty płatnicze i bankowe. Zabezpiecz je przed zamoczeniem.",
            },
            {
              title: "Telefon i ładowarka",
              description:
                "Naładowany telefon komórkowy, powerbank, ładowarka. To Twoje łącze ze światem.",
            },
            {
              title: "Woda i jedzenie",
              description:
                "Butelki z wodą pitną, trwałe jedzenie niepodlegające zepsuciu.",
            },
            {
              title: "Ubrania zmienne",
              description:
                "Ciepłe, suche ubrania w wodoodpornej torbie. Kurtka przeciwdeszczowa, gumowe buty.",
            },
          ],
          tips: [
            "Przygotuj wodoodporny plecak ewakuacyjny z wyprzedzeniem",
            "Zrób cyfrowe kopie ważnych dokumentów i zapisz je w chmurze",
            "Nie bierz cennych przedmiotów - życie jest najważniejsze",
            "Zabezpiecz ważne rzeczy na wyższych półkach przed ewakuacją",
          ],
        },
      },
      {
        number: 3,
        title: "Unikaj wody",
        description: "Nie wchodź do wody, może być elektrycznie naładowana",
        image: "/assets/danger.png",
        linkText: "Zagrożenia >>",
        linkHref: "/instrukcje",
        detailedInfo: {
          introduction:
            "Woda powodziowa niesie ze sobą wiele zagrożeń - od porażenia prądem, przez zanieczyszczenia, po ukryte przeszkody. Unikaj kontaktu z nią za wszelką cenę.",
          items: [
            {
              title: "Ryzyko porażenia prądem",
              description:
                "Woda może być pod napięciem z powodu zalanych instalacji elektrycznych. Nawet płytka woda może być śmiertelnie niebezpieczna.",
            },
            {
              title: "Nie przechodź przez wodę",
              description:
                "Nawet 15 cm wody może Cię przewrócić. 60 cm wody może ponieść samochód. Nie ryzykuj.",
            },
            {
              title: "Nie jeźdź przez zalane drogi",
              description:
                "Nie wiesz jak głęboka jest woda ani czy droga pod nią nie jest zniszczona. Zawróć i znajdź alternatywną trasę.",
            },
            {
              title: "Uważaj na zanieczyszczenia",
              description:
                "Woda powodziowa zawiera ścieki, chemikalia, bakterie i inne niebezpieczne substancje. Kontakt może wywołać choroby.",
            },
            {
              title: "Zwracaj uwagę na prąd wody",
              description:
                "Szybko płynąca woda jest bardzo silna. Może porwać człowieka i przedmioty, powodując obrażenia.",
            },
            {
              title: "Po opadnięciu wody bądź ostrożny",
              description:
                "Nawet po opadnięciu wody zachowaj ostrożność. Konstrukcje mogą być uszkodzone, a woda pozostawia zanieczyszczenia.",
            },
          ],
          tips: [
            "Pamiętaj: Turn Around, Don't Drown (Zawróć, nie toń)",
            "Jeśli musisz iść przez wodę, użyj kija do sprawdzania głębokości",
            "Nigdy nie pływaj w wodzie powodziowej",
            "Po kontakcie z wodą powodziową umyj się dokładnie mydłem",
          ],
        },
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
