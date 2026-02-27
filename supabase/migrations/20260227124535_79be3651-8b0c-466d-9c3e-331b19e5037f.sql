
CREATE OR REPLACE FUNCTION public.sync_assessores_id_seq()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  PERFORM setval('public.assessores_id_seq', GREATEST(currval('public.assessores_id_seq'), NEW.id));
  RETURN NEW;
END;
$$;

CREATE TRIGGER sync_assessores_seq_after_insert
AFTER INSERT ON public.assessores
FOR EACH ROW
EXECUTE FUNCTION public.sync_assessores_id_seq();
