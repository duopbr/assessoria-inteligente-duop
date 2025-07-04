
-- Create new Assessores table with proper columns
CREATE TABLE public.Assessores (
  id SERIAL PRIMARY KEY,
  nome TEXT NOT NULL,
  Celular TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.Assessores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts on Assessores" 
ON public.Assessores 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads on Assessores" 
ON public.Assessores 
FOR SELECT 
USING (true);
