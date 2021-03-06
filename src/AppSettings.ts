import defaultSettings from "./defaultSettings";

export interface ITestElementSettings {
  atomic: number;
  enabled: boolean;
  stats: {
    times: number;
    right: number;
    wrong: number;
  };
}

export interface IValencesTestSettings {
  elements: ITestElementSettings[] | null;
}

export interface IPeriodicTableTestSettings {
  elements: ITestElementSettings[] | null;
}

export interface Settings {
  [key: string]: unknown;
  theme: string;
  locale: string;
  tests: {
    valences: IValencesTestSettings;
    periodicTable: IPeriodicTableTestSettings;
  };
}

class AppSettings {
  private static STORAGE_KEY = "atom:settings";

  public settings!: Settings;

  public loadSettings() {
    const appSettings = JSON.parse(
      localStorage.getItem(AppSettings.STORAGE_KEY) ?? "null"
    );

    if (!appSettings) {
      return this.setDefaultSettings();
    }

    this.settings = appSettings;
  }

  public save() {
    localStorage.setItem(
      AppSettings.STORAGE_KEY,
      JSON.stringify(this.settings)
    );
  }

  private setDefaultSettings() {
    this.settings = defaultSettings;
    this.save();
  }
}

export default new AppSettings();
