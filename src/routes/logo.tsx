import { createFileRoute } from "@tanstack/react-router";
import VovvIdWag from "@/components/VovvIdWag";

export const Route = createFileRoute("/logo")({
  head: () => ({
    meta: [
      { title: "VovvID — Logotyp" },
      { name: "description", content: "VovvID-logotypen på sand och vin." },
      { property: "og:title", content: "VovvID — Logotyp" },
      { property: "og:description", content: "VovvID-logotypen på sand och vin." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LogoPage,
});

function LogoPage() {
  return (
    <div className="grid min-h-screen sm:grid-cols-2">
      <section className="flex items-center justify-center bg-sand p-16">
        <VovvIdWag variant="light" height={96} />
      </section>
      <section className="flex items-center justify-center bg-wine p-16">
        <VovvIdWag variant="wine" height={96} />
      </section>
    </div>
  );
}
