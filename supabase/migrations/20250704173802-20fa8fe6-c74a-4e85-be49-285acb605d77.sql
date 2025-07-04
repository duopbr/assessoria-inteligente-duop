
-- Enable Row Level Security on Assessores table
ALTER TABLE public.Assessores ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts (anyone can insert data)
CREATE POLICY "Allow public inserts on Assessores" 
ON public.Assessores 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow public reads (if needed for admin purposes)
CREATE POLICY "Allow public reads on Assessores" 
ON public.Assessores 
FOR SELECT 
USING (true);
