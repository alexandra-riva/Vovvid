import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import VovvIdWag from "./VovvIdWag";
import { useSite } from "@/lib/site";
import { content } from "@/lib/content";

export function Header() {
  const { lang, setLang, theme, toggleTheme } = useSite();
  const t = content[lang];

  return (
    <header className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-7">
      <Link to="/" aria-label="VovvID" className="min-w-0 shrink-0">
        <VovvIdWag
          key={theme}
          variant={theme === "day" ? "light" : "wine"}
          height={40}
        />
      </Link>

      <div className="flex shrink-0 items-center gap-5">
        <div className="flex items-center gap-1 text-[13px] tracking-wide">
          <button
            type="button"
            onClick={() => setLang("sv")}
            aria-pressed={lang === "sv"}
            className={
              lang === "sv"
                ? "text-accent"
                : "text-secondary-foreground transition-colors hover:text-foreground"
            }
          >
            SV
          </button>
          <span className="text-border">/</span>
          <button
            type="button"
            onClick={() => setLang("en")}
            aria-pressed={lang === "en"}
            className={
              lang === "en"
                ? "text-accent"
                : "text-secondary-foreground transition-colors hover:text-foreground"
            }
          >
            EN
          </button>
        </div>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "day" ? t.nav.themeNight : t.nav.themeDay}
          className="text-foreground transition-opacity hover:opacity-70"
        >
          {theme === "day" ? (
            <Moon size={16} strokeWidth={1.5} />
          ) : (
            <Sun size={16} strokeWidth={1.5} />
          )}
        </button>
      </div>
    </header>
  );
}
