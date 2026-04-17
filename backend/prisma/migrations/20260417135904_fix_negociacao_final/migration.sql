/*
  Warnings:

  - You are about to alter the column `etapa` on the `negociacoes` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `negociacoes` ADD COLUMN `dataFechamento` DATETIME(3) NULL,
    ADD COLUMN `motivoPerda` VARCHAR(191) NULL,
    ADD COLUMN `percentualMatch` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` ENUM('ATIVA', 'PAUSADA', 'FECHADA', 'PERDIDA', 'CANCELADA') NOT NULL DEFAULT 'ATIVA',
    MODIFY `etapa` ENUM('CONTATO_INICIAL', 'VISITA_AGENDADA', 'VISITA_REALIZADA', 'ANALISE', 'PROPOSTA', 'CONTRATO', 'FECHADO', 'PERDIDO') NOT NULL DEFAULT 'CONTATO_INICIAL';
