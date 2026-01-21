-- Add RLS policies for LP_Vendas table (same pattern as other tables)

-- Allow public insert
CREATE POLICY "Allow public insert to LP_Vendas"
ON public."LP_Vendas"
FOR INSERT
WITH CHECK (true);

-- Admin only read
CREATE POLICY "Admin only read LP_Vendas"
ON public."LP_Vendas"
FOR SELECT
USING (is_admin());

-- Admin only update
CREATE POLICY "Admin only update LP_Vendas"
ON public."LP_Vendas"
FOR UPDATE
USING (is_admin())
WITH CHECK (is_admin());

-- Admin only delete
CREATE POLICY "Admin only delete LP_Vendas"
ON public."LP_Vendas"
FOR DELETE
USING (is_admin());