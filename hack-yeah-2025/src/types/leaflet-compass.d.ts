declare module "leaflet-compass" {
  import * as L from "leaflet";

  interface CompassOptions extends L.ControlOptions {
    autoActive?: boolean;
    showDigit?: boolean;
    textErr?: string;
    callErr?: () => void;
    angleOffset?: number;
  }

  namespace Control {
    class Compass extends L.Control {
      constructor(options?: CompassOptions);
      getAngle(): number;
      setAngle(angle: number): void;
      activate(): void;
      deactivate(): void;
    }
  }
}

declare module "leaflet" {
  namespace Control {
    class Compass extends L.Control {
      constructor(options?: import("leaflet-compass").CompassOptions);
    }
  }
}
