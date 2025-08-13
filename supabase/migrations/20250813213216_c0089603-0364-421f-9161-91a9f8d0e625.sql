-- CRITICAL SECURITY FIX: Restrict access to all customer data tables
-- This will immediately secure all sensitive customer information

-- First, drop the existing permissive policies that allow public access
DROP POLICY IF EXISTS "Anyone can view calculator data" ON public."Calculadoras";
DROP POLICY IF EXISTS "Anyone can insert calculator data" ON public."Calculadoras";
DROP POLICY IF EXISTS "Allow public reads on Assessores" ON public.assessores;
DROP POLICY IF EXISTS "Allow public inserts on Assessores" ON public.assessores;
DROP POLICY IF EXISTS "Allow public reads" ON public.checkout_submissions;
DROP POLICY IF EXISTS "Allow public inserts" ON public.checkout_submissions;
DROP POLICY IF EXISTS "Allow public read access to pix_phone_submissions" ON public.pix_phone_submissions;
DROP POLICY IF EXISTS "Allow public insert" ON public.pix_phone_submissions;

-- Enable RLS on B2C table (it was enabled but had no policies)
ALTER TABLE public."B2C" ENABLE ROW LEVEL SECURITY;

-- Create restrictive admin-only policies for all sensitive tables
-- These will block all public access until authentication is implemented

-- Calculadoras table - Admin only access
CREATE POLICY "Admin only access to Calculadoras" 
ON public."Calculadoras" 
FOR ALL 
USING (false)
WITH CHECK (false);

-- Assessores table - Admin only access  
CREATE POLICY "Admin only access to Assessores"
ON public.assessores
FOR ALL
USING (false) 
WITH CHECK (false);

-- Checkout submissions table - Admin only access
CREATE POLICY "Admin only access to checkout_submissions"
ON public.checkout_submissions
FOR ALL
USING (false)
WITH CHECK (false);

-- PIX phone submissions table - Admin only access
CREATE POLICY "Admin only access to pix_phone_submissions" 
ON public.pix_phone_submissions
FOR ALL
USING (false)
WITH CHECK (false);

-- B2C table - Admin only access
CREATE POLICY "Admin only access to B2C"
ON public."B2C"
FOR ALL
USING (false)
WITH CHECK (false);

-- Create a function to check if user is admin (will be updated when auth is implemented)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  -- For now, return false to block all access
  -- This will be updated when authentication is implemented
  RETURN false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create audit log table for tracking data access
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  action TEXT NOT NULL,
  user_id UUID,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ip_address INET,
  user_agent TEXT,
  details JSONB
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admin only access to audit_logs"
ON public.audit_logs
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Create function to log data access
CREATE OR REPLACE FUNCTION public.log_data_access()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_logs (table_name, action, timestamp, details)
  VALUES (TG_TABLE_NAME, TG_OP, NOW(), row_to_json(NEW));
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add audit triggers to all sensitive tables
DROP TRIGGER IF EXISTS audit_calculadoras ON public."Calculadoras";
CREATE TRIGGER audit_calculadoras
  AFTER INSERT OR UPDATE OR DELETE ON public."Calculadoras"
  FOR EACH ROW EXECUTE FUNCTION public.log_data_access();

DROP TRIGGER IF EXISTS audit_assessores ON public.assessores;
CREATE TRIGGER audit_assessores
  AFTER INSERT OR UPDATE OR DELETE ON public.assessores
  FOR EACH ROW EXECUTE FUNCTION public.log_data_access();

DROP TRIGGER IF EXISTS audit_checkout_submissions ON public.checkout_submissions;
CREATE TRIGGER audit_checkout_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.checkout_submissions
  FOR EACH ROW EXECUTE FUNCTION public.log_data_access();

DROP TRIGGER IF EXISTS audit_pix_phone_submissions ON public.pix_phone_submissions;
CREATE TRIGGER audit_pix_phone_submissions
  AFTER INSERT OR UPDATE OR DELETE ON public.pix_phone_submissions
  FOR EACH ROW EXECUTE FUNCTION public.log_data_access();