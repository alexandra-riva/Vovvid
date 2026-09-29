import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "sv" | "en";
export type Theme = "day" | "night";

type SiteState = {
  lang: Lang;
  theme: Theme;
  setLang: (lang: Lang) => void;
  toggleTheme: () => void;
};

const SiteContext = createContext<SiteState | null>(null);

const THEME_KEY = "vovvid-theme";
const LANG_KEY = "vovvid-lang";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("sv");
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const storedLang = localStorage.getItem(LANG_KEY);
    if (storedLang === "sv" || storedLang === "en") setLangState(storedLang);

    const storedTheme = localStorage.getItem(THEME_KEY);
    if (storedTheme === "day" || storedTheme === "night") {
      setTheme(storedTheme);
    } else {
      // First visit: follow the clock — night (wine) from 19:00 to 07:00.
      const hour = new Date().getHours();
      if (hour >= 19 || hour < 7) setTheme("night");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("night", theme === "night");
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    localStorage.setItem(LANG_KEY, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next = current === "day" ? "night" : "day";
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  return (
    <SiteContext.Provider value={{ lang, theme, setLang, toggleTheme }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error("useSite must be used inside SiteProvider");
  return context;
}
