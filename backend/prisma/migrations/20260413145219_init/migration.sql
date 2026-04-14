-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `clientes` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `telefone` VARCHAR(191) NOT NULL,
    `tipoInteresse` ENUM('COMPRAR', 'ALUGAR') NOT NULL,
    `valorMinimo` DECIMAL(10, 2) NOT NULL,
    `valorMaximo` DECIMAL(10, 2) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NULL,
    `bairrosPreferidos` JSON NOT NULL,
    `tiposImovel` JSON NOT NULL,
    `observacoes` TEXT NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `origem` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `clientes_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imoveis` (
    `id` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `tipoImovel` ENUM('CASA', 'APARTAMENTO', 'TERRENO', 'SOBRADO', 'OUTRO') NOT NULL,
    `operacao` ENUM('VENDA', 'ALUGUEL') NOT NULL,
    `valor` DECIMAL(10, 2) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `cep` VARCHAR(191) NULL,
    `quartos` INTEGER NOT NULL DEFAULT 0,
    `vagas` INTEGER NOT NULL DEFAULT 0,
    `areaM2` DECIMAL(8, 2) NULL,
    `descricao` TEXT NULL,
    `fotos` JSON NOT NULL,
    `publicado` BOOLEAN NOT NULL DEFAULT false,
    `destaque` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `imoveis_slug_key`(`slug`),
    INDEX `imoveis_cidade_operacao_idx`(`cidade`, `operacao`),
    INDEX `imoveis_publicado_idx`(`publicado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `match_logs` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `canal` VARCHAR(191) NOT NULL,
    `status` ENUM('PENDENTE', 'ENVIADO', 'FALHOU') NOT NULL DEFAULT 'PENDENTE',
    `erro` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `match_logs_clienteId_idx`(`clienteId`),
    INDEX `match_logs_imovelId_idx`(`imovelId`),
    INDEX `match_logs_clienteId_createdAt_idx`(`clienteId`, `createdAt`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `negociacoes` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NOT NULL,
    `imovelId` VARCHAR(191) NOT NULL,
    `responsavelId` VARCHAR(191) NULL,
    `etapa` ENUM('PRIMEIRO_CONTATO', 'VISITA_AGENDADA', 'PROPOSTA', 'ANALISE', 'FECHADO', 'PERDIDO') NOT NULL DEFAULT 'PRIMEIRO_CONTATO',
    `valorProposta` DECIMAL(10, 2) NULL,
    `observacoes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `negociacoes_clienteId_idx`(`clienteId`),
    INDEX `negociacoes_imovelId_idx`(`imovelId`),
    INDEX `negociacoes_responsavelId_idx`(`responsavelId`),
    INDEX `negociacoes_etapa_idx`(`etapa`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atividades` (
    `id` VARCHAR(191) NOT NULL,
    `negociacaoId` VARCHAR(191) NOT NULL,
    `responsavelId` VARCHAR(191) NULL,
    `tipo` ENUM('LIGACAO', 'EMAIL', 'WHATSAPP', 'VISITA', 'REUNIAO', 'OUTRO') NOT NULL,
    `descricao` TEXT NOT NULL,
    `dataAgendada` DATETIME(3) NULL,
    `concluida` BOOLEAN NOT NULL DEFAULT false,
    `dataConclusao` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `atividades_negociacaoId_idx`(`negociacaoId`),
    INDEX `atividades_responsavelId_idx`(`responsavelId`),
    INDEX `atividades_concluida_idx`(`concluida`),
    INDEX `atividades_dataAgendada_idx`(`dataAgendada`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anotacoes` (
    `id` VARCHAR(191) NOT NULL,
    `clienteId` VARCHAR(191) NULL,
    `negociacaoId` VARCHAR(191) NULL,
    `conteudo` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `anotacoes_clienteId_idx`(`clienteId`),
    INDEX `anotacoes_negociacaoId_idx`(`negociacaoId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `etiquetas` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `cor` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `etiquetas_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cliente_etiquetas` (
    `clienteId` VARCHAR(191) NOT NULL,
    `etiquetaId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `cliente_etiquetas_clienteId_idx`(`clienteId`),
    INDEX `cliente_etiquetas_etiquetaId_idx`(`etiquetaId`),
    PRIMARY KEY (`clienteId`, `etiquetaId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `match_logs` ADD CONSTRAINT `match_logs_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `match_logs` ADD CONSTRAINT `match_logs_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `imoveis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `imoveis`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `negociacoes` ADD CONSTRAINT `negociacoes_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `atividades` ADD CONSTRAINT `atividades_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacoes` ADD CONSTRAINT `anotacoes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `anotacoes` ADD CONSTRAINT `anotacoes_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacoes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente_etiquetas` ADD CONSTRAINT `cliente_etiquetas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cliente_etiquetas` ADD CONSTRAINT `cliente_etiquetas_etiquetaId_fkey` FOREIGN KEY (`etiquetaId`) REFERENCES `etiquetas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
