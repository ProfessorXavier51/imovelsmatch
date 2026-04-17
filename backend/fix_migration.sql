-- Script para corrigir a migration do enum
-- Executar no MySQL antes de rodar a migration

-- 1. Deletar negociações antigas (ambiente dev)
DELETE FROM atividades WHERE negociacaoId IS NOT NULL;
DELETE FROM negociacoes;

-- 2. Ou alternativa: atualizar valores antigos para novo enum
-- UPDATE negociacoes SET etapa = 'CONTATO_INICIAL' WHERE etapa = 'PRIMEIRO_CONTATO';
