-- Sincroniza a sequência para começar após o maior ID existente na tabela
SELECT setval('assessores_id_seq', COALESCE((SELECT MAX(id) FROM assessores), 0) + 1, false);