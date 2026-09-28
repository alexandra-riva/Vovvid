CREATE TABLE public.beta_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  role text NOT NULL CHECK (role IN ('owner','sitter','both')),
  area text,
  language text NOT NULL DEFAULT 'sv' CHECK (language IN ('sv','en')),
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.beta_signups TO anon;
GRANT INSERT ON public.beta_signups TO authenticated;
GRANT ALL ON public.beta_signups TO service_role;

ALTER TABLE public.beta_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join the beta"
ON public.beta_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email ~* '^[A-Za-z0-9._%%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  AND length(email) <= 254
  AND (area IS NULL OR length(area) <= 120)
);
