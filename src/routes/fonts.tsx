import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { content } from "@/lib/content";

export const Route = createFileRoute("/fonts")({
  head: () => ({
    meta: [
      { title: "VovvID — Typografi" },
      {
        name: "description",
        content: "Jämförelse av två typografipar för VovvID.",
      },
      { property: "og:title", content: "VovvID — Typografi" },
      {
        property: "og:description",
        content: "Jämförelse av två typografipar för VovvID.",
      },
      { name: "robots", content: "noindex" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Urbanist:wght@500;600;700&family=Epilogue:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: FontsPage,
});

const sv = content.sv;

/** Pairing A — current: Instrument Sans headings, Inter body (site defaults). */
const CURRENT = {
  label: "Nuvarande — Instrument Sans + Inter",
  vars: {
    "--font-display":
      '"Instrument Sans", ui-sans-serif, system-ui, sans-serif',
    "--font-sans": '"Inter", ui-sans-serif, system-ui, sans-serif',
  } as React.CSSProperties,
};

/** Pairing B — candidate: Urbanist headings, Epilogue body. */
const ALTERNATE = {
  label: "Alternativ — Urbanist + Epilogue",
  vars: {
    "--font-display": '"Urbanist", ui-sans-serif, system-ui, sans-serif',
    "--font-sans": '"Epilogue", ui-sans-serif, system-ui, sans-serif',
  } as React.CSSProperties,
};

type Mode = "desktop" | "mobile";

function FontsPage() {
  const [mode, setMode] = useState<Mode>("desktop");

  return (
    <div className="min-h-screen px-5 py-10">
      <header className="mx-auto max-w-3xl">
        <h1 className="text-3xl">Typografi — jämförelse</h1>
        <p className="mt-2 text-sm text-secondary-foreground">
          Samma text i båda paren. Byt mellan dator- och mobilbredd.
        </p>
        <div
          role="group"
          aria-label="Visningsbredd"
          className="mt-5 inline-flex rounded-[16px] border border-border p-1"
        >
          {(
            [
              ["desktop", "Dator"],
              ["mobile", "Mobil (375 px)"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              onClick={() => setMode(value)}
              aria-pressed={mode === value}
              className={`rounded-[12px] px-4 py-2 text-sm font-medium transition-colors ${
                mode === value
                  ? "bg-button text-button-foreground"
                  : "text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <div
        className={`mx-auto mt-10 grid gap-10 ${
          mode === "mobile" ? "grid-cols-2 items-start" : "max-w-3xl"
        }`}
      >
        <SamplePanel pairing={CURRENT} mode={mode} />
        <SamplePanel pairing={ALTERNATE} mode={mode} />
      </div>
    </div>
  );
}

function SamplePanel({
  pairing,
  mode,
}: {
  pairing: typeof CURRENT;
  mode: Mode;
}) {
  return (
    <section
      style={{ ...pairing.vars, fontFamily: "var(--font-sans)" }}
      className={`overflow-hidden rounded-[16px] border border-border bg-card ${
        mode === "mobile" ? "min-w-0" : ""
      }`}
    >
      <div className="border-b border-border px-5 py-3">
        <span className="text-xs font-medium tracking-wide text-secondary-foreground">
          {pairing.label}
        </span>
      </div>

      <div className="px-6 py-8">
        {/* Hero */}
        <h2 className="text-3xl sm:text-4xl">{sv.hero.title}</h2>
        <p className="mt-4">{sv.hero.text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-[16px] bg-button px-5 py-2.5 text-sm font-medium text-button-foreground">
            {sv.hero.ctaOwner}
          </span>
          <span className="rounded-[16px] border border-border px-5 py-2.5 text-sm font-medium text-foreground">
            {sv.hero.ctaSitter}
          </span>
        </div>
        <p className="mt-3 text-xs text-secondary-foreground">{sv.hero.note}</p>

        {/* Fee card */}
        <div className="mt-8 rounded-[16px] border border-border p-5">
          <h3 className="text-lg">{sv.fees.headline}</h3>
          <p className="mt-2 font-medium text-foreground">{sv.fees.owner}</p>
          <p className="mt-1 font-medium text-foreground">{sv.fees.sitter}</p>
          <p className="mt-3 text-xs text-secondary-foreground">
            {sv.fees.note}
          </p>
        </div>

        {/* Small print + form labels */}
        <div className="mt-8">
          <h3 className="text-lg">{sv.form.title}</h3>
          <p className="mt-2 text-sm">
            <span className="font-medium text-foreground">{sv.form.email}</span>
            {" · "}
            {sv.form.emailPlaceholder}
          </p>
          <p className="mt-1 text-sm">
            <span className="font-medium text-foreground">
              {sv.form.roleLabel}
            </span>
            {" · "}
            {sv.form.roles.owner} / {sv.form.roles.sitter} / {sv.form.roles.both}
          </p>
          <p className="mt-3 text-xs leading-relaxed text-secondary-foreground">
            {sv.form.privacy}
          </p>
        </div>
      </div>
    </section>
  );
}
