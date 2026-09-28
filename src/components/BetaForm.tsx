import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSite } from "@/lib/site";
import { content } from "@/lib/content";

export type Role = "owner" | "sitter" | "both";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function BetaForm({
  role,
  setRole,
}: {
  role: Role | null;
  setRole: (role: Role) => void;
}) {
  const { lang } = useSite();
  const t = content[lang].form;

  const [email, setEmail] = useState("");
  const [area, setArea] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setError(t.invalidEmail);
      return;
    }

    setStatus("sending");
    const { error: insertError } = await supabase.from("beta_signups").insert({
      email: trimmed,
      role: role ?? "both",
      area: area.trim() || null,
      language: lang,
    });

    if (insertError) {
      console.error(insertError);
      setError(t.error);
      setStatus("idle");
      return;
    }

    setStatus("done");
  }

  if (status === "done") {
    return (
      <p className="rounded-[16px] border border-border bg-card px-6 py-8 text-center text-foreground">
        {t.thanks}
      </p>
    );
  }

  const roleKeys: Role[] = ["owner", "sitter", "both"];

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      <div>
        <label
          htmlFor="beta-email"
          className="block text-[13px] text-secondary-foreground"
        >
          {t.email}
        </label>
        <input
          id="beta-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder={t.emailPlaceholder}
          autoComplete="email"
          className="mt-2 w-full rounded-[16px] border border-border bg-card px-4 py-3 text-foreground outline-none placeholder:text-secondary-foreground focus:border-accent"
        />
      </div>

      <fieldset>
        <legend className="text-[13px] text-secondary-foreground">
          {t.roleLabel}
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {roleKeys.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRole(key)}
              aria-pressed={role === key}
              className={`rounded-[16px] border px-4 py-2 text-[15px] transition-colors ${
                role === key
                  ? "border-transparent bg-button text-button-foreground"
                  : "border-border text-body hover:border-accent"
              }`}
            >
              {t.roles[key]}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label
          htmlFor="beta-area"
          className="block text-[13px] text-secondary-foreground"
        >
          {t.area}
        </label>
        <input
          id="beta-area"
          type="text"
          value={area}
          onChange={(event) => setArea(event.target.value)}
          placeholder={t.areaPlaceholder}
          className="mt-2 w-full rounded-[16px] border border-border bg-card px-4 py-3 text-foreground outline-none placeholder:text-secondary-foreground focus:border-accent"
        />
      </div>

      {error ? <p className="text-[14px] text-accent">{error}</p> : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-[16px] bg-button px-6 py-3.5 font-medium text-button-foreground transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? t.submitting : t.submit}
      </button>

      <p className="text-[14px] text-secondary-foreground">{t.privacy}</p>
    </form>
  );
}
