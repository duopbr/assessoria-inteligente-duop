-- Add UTM tracking columns to assessores table
ALTER TABLE public.assessores 
ADD COLUMN utm_source text,
ADD COLUMN utm_medium text;