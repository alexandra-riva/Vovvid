import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Reveal } from "@/components/Reveal";
import { TailCheck } from "@/components/TailCheck";
import { BetaForm, type Role } from "@/components/BetaForm";
import { useSite } from "@/lib/site";
import { content } from "@/lib/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VovvID — Trygg hundpassning. Rättvis för alla." },
      {
        name: "description",
        content:
          "BankID-verifierade hundvakter i Stockholm, 12 % avgift. Gå med i betan som startar i mars 2027.",
      },
      {
        property: "og:title",
        content: "VovvID — Trygg hundpassning. Rättvis för alla.",
      },
      {
        property: "og:description",
        content:
          "BankID-verifierade hundvakter i Stockholm, 12 % avgift. Gå med i betan som startar i mars 2027.",
      },
    ],
  }),
  component: Index,
});

/** Dog photos for "Our story". The row stays hidden until photos are added. */
const dogPhotos: { src: string; alt: string }[] = [];

function Index() {
  const { lang } = useSite();
  const t = content[lang];
  const [role, setRole] = useState<Role | null>(null);

  function chooseRole(next: Role) {
    setRole(next);
    document.getElementById("join")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-5xl px-6">
        {/* Hero */}
        <section className="py-20 sm:py-32">
          <h1 className="max-w-3xl text-[2.6rem] leading-[1.05] sm:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-[17px]">{t.hero.text}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => chooseRole("owner")}
              className="rounded-[16px] bg-button px-6 py-3.5 font-medium text-button-foreground transition-opacity hover:opacity-90"
            >
              {t.hero.ctaOwner}
            </button>
            <button
              type="button"
              onClick={() => chooseRole("sitter")}
              className="rounded-[16px] border border-border px-6 py-3.5 font-medium text-foreground transition-colors hover:border-accent"
            >
              {t.hero.ctaSitter}
            </button>
          </div>
          <p className="mt-8 text-[14px] text-secondary-foreground">
            {t.hero.note}
          </p>
        </section>

        {/* How it works */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.how.title}</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {t.how.steps.map((step) => (
              <div key={step.n}>
                <span className="text-[13px] text-accent">{step.n}</span>
                <h3 className="mt-3 text-[18px]">{step.title}</h3>
                <p className="mt-2 text-[16px]">{step.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Fair fees */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.fees.title}</h2>
          <p className="mt-10 text-[2.2rem] leading-tight font-semibold gradient-text sm:text-5xl">
            {t.fees.headline}
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-[16px] border border-border bg-card px-6 py-7">
              <p className="text-[18px] text-foreground">{t.fees.owner}</p>
            </div>
            <div className="rounded-[16px] border border-border bg-card px-6 py-7">
              <p className="text-[18px] text-foreground">{t.fees.sitter}</p>
            </div>
          </div>
          <p className="mt-8 text-[14px] text-secondary-foreground">
            {t.fees.note}
          </p>
        </Reveal>

        {/* Services */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.services.title}</h2>
          <p className="mt-8 text-[18px] text-foreground">
            {t.services.items.join(" · ")}
          </p>
        </Reveal>

        {/* For sitters */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.sitters.title}</h2>
          <ul className="mt-10 space-y-5">
            {t.sitters.items.map((item) => (
              <li key={item} className="flex gap-3">
                <TailCheck className="mt-1 h-4 w-4 shrink-0 text-accent" />
                <span className="min-w-0 text-[17px]">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Safety */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.safety.title}</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {t.safety.items.map((item) => (
              <p key={item} className="text-[17px] text-foreground">
                {item}
              </p>
            ))}
          </div>
        </Reveal>

        {/* Our story */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <h2 className="text-2xl sm:text-3xl">{t.story.title}</h2>
          <p className="mt-8 max-w-2xl text-[17px]">{t.story.text}</p>
          <p className="mt-8 text-[15px] text-secondary-foreground">
            {t.story.people.join(" · ")}
          </p>
          {dogPhotos.length > 0 ? (
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              {dogPhotos.map((photo) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  className="aspect-4/3 w-full rounded-[16px] object-cover"
                />
              ))}
            </div>
          ) : null}
        </Reveal>

        {/* Join the beta */}
        <Reveal className="border-t border-border py-20 sm:py-28">
          <div id="join" className="scroll-mt-16 max-w-xl">
            <h2 className="text-2xl sm:text-3xl">{t.form.title}</h2>
            <div className="mt-10">
              <BetaForm role={role} setRole={setRole} />
            </div>
          </div>
        </Reveal>
      </main>

      <footer className="mx-auto max-w-5xl border-t border-border px-6 py-10 text-[14px] text-secondary-foreground">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>{t.footer.line}</span>
            <span>·</span>
            <Link to="/privacy" className="text-accent hover:opacity-80">
              {t.footer.privacy}
            </Link>
          </p>
      </footer>
    </div>
  );
}
