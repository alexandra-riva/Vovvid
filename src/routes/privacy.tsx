import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { useSite } from "@/lib/site";
import { content } from "@/lib/content";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Integritet · VovvID" },
      {
        name: "description",
        content:
          "Så hanterar VovvID din e-post, din roll och ditt område när du går med i betan.",
      },
      { property: "og:title", content: "Integritet · VovvID" },
      {
        property: "og:description",
        content:
          "Så hanterar VovvID din e-post, din roll och ditt område när du går med i betan.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { lang } = useSite();
  const t = content[lang].privacyPage;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl">{t.title}</h1>
        <p className="mt-8 text-[17px]">{t.text}</p>
        <Link
          to="/"
          className="mt-12 inline-block text-[15px] text-accent hover:opacity-80"
        >
          {t.back}
        </Link>
      </main>
    </div>
  );
}
