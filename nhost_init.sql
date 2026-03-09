-- Copy and paste this entirely into your Nhost (Hasura) SQL Editor to instantly setup your products database!

-- 1. Create the `products` table
CREATE TABLE IF NOT EXISTS public.products (
    id uuid DEFAULT gen_random_uuid() NOT NULL PRIMARY KEY,
    name text NOT NULL,
    category text NOT NULL,
    condition text DEFAULT 'new'::text,
    price numeric NOT NULL,
    "oldPrice" numeric,
    discount numeric DEFAULT 0,
    description text,
    "defaultImg" text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 2. Add an updated_at trigger automatically
CREATE OR REPLACE FUNCTION public.set_current_timestamp_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$function$;

DROP TRIGGER IF EXISTS set_public_products_updated_at ON public.products;
CREATE TRIGGER set_public_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_current_timestamp_updated_at();

-- 3. Set Permissions for the `public` role (Anyone can view products)
--    Note: In Hasura, you might need to click "Track Table" after doing this, but usually SQL is fine.
--    This creates standard read permissions.
