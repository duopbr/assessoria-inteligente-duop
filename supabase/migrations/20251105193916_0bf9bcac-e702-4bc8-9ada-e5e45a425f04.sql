-- Adicionar coluna email na tabela assessores
ALTER TABLE assessores 
ADD COLUMN IF NOT EXISTS email TEXT;

-- Adicionar índice para melhorar performance de buscas
CREATE INDEX IF NOT EXISTS idx_assessores_email ON assessores(email);

-- Adicionar comentário na coluna
COMMENT ON COLUMN assessores.email IS 'Email opcional do lead para enhanced conversions';