-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.4.3 - MySQL Community Server - GPL
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para imovelsmatch
CREATE DATABASE IF NOT EXISTS `imovelsmatch` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `imovelsmatch`;

-- Copiando estrutura para tabela imovelsmatch.anotacoes
CREATE TABLE IF NOT EXISTS `anotacoes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clienteId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `negociacaoId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `conteudo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `anotacoes_clienteId_idx` (`clienteId`),
  KEY `anotacoes_negociacaoId_idx` (`negociacaoId`),
  CONSTRAINT `anotacoes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `anotacoes_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.anotacoes: ~0 rows (aproximadamente)
DELETE FROM `anotacoes`;

-- Copiando estrutura para tabela imovelsmatch.atividades
CREATE TABLE IF NOT EXISTS `atividades` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `negociacaoId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsavelId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `tipo` enum('LIGACAO','EMAIL','WHATSAPP','VISITA','REUNIAO','OUTRO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `dataAgendada` datetime(3) DEFAULT NULL,
  `concluida` tinyint(1) NOT NULL DEFAULT '0',
  `dataConclusao` datetime(3) DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `atividades_negociacaoId_idx` (`negociacaoId`),
  KEY `atividades_responsavelId_idx` (`responsavelId`),
  KEY `atividades_concluida_idx` (`concluida`),
  KEY `atividades_dataAgendada_idx` (`dataAgendada`),
  CONSTRAINT `atividades_negociacaoId_fkey` FOREIGN KEY (`negociacaoId`) REFERENCES `negociacoes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `atividades_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.atividades: ~0 rows (aproximadamente)
DELETE FROM `atividades`;

-- Copiando estrutura para tabela imovelsmatch.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoInteresse` enum('COMPRAR','ALUGAR') COLLATE utf8mb4_unicode_ci NOT NULL,
  `valorMinimo` decimal(10,2) NOT NULL,
  `valorMaximo` decimal(10,2) NOT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bairrosPreferidos` json NOT NULL,
  `tiposImovel` json NOT NULL,
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `origem` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `clientes_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.clientes: ~2 rows (aproximadamente)
DELETE FROM `clientes`;
INSERT INTO `clientes` (`id`, `nome`, `email`, `telefone`, `tipoInteresse`, `valorMinimo`, `valorMaximo`, `cidade`, `estado`, `bairrosPreferidos`, `tiposImovel`, `observacoes`, `ativo`, `origem`, `createdAt`, `updatedAt`) VALUES
	('0fe37271-b4e7-4570-983c-f5e038dda77b', 'Roberto Almeida', 'roberto.almeida@email.com', '(31) 93456-7890', 'COMPRAR', 250000.00, 350000.00, 'Belo Horizonte', NULL, '"Barreiro,Venda Nova"', '"apartamento"', 'Aposentado, busca apartamento térreo', 1, NULL, '2026-04-16 20:53:58.242', '2026-04-16 20:53:58.242'),
	('39aa0b6f-0562-42d8-91e2-2c3abbccf6a5', 'Ana Pereira', 'ana.pereira@email.com', '(41) 99876-4321', 'ALUGAR', 1500.00, 2000.00, 'Curitiba', NULL, '"Batel,Bigorrilho,Água Verde"', '"apartamento,kitnet"', 'Estudante de medicina, precisa de local tranquilo', 1, NULL, '2026-04-16 20:53:58.138', '2026-04-16 20:53:58.138'),
	('7ae44289-2930-45d0-bb33-57e5728196a2', 'Fernanda Lima', 'fernanda.lima@email.com', '(21) 92345-6789', 'ALUGAR', 5000.00, 8000.00, 'Rio de Janeiro', NULL, '"Barra da Tijuca,Recreio"', '"casa,condominio"', 'Família grande, precisa de 4 quartos', 1, NULL, '2026-04-16 20:53:58.188', '2026-04-16 20:53:58.188'),
	('9a55bccc-42c0-4d63-a109-ad27a4cbd161', 'Jo�o Silva', 'joao@gmail.com', '11999999999', 'COMPRAR', 200000.00, 500000.00, 'S�o Paulo', 'SP', '["Centro", "Jardins"]', '["CASA", "APARTAMENTO"]', NULL, 1, NULL, '2026-04-13 19:45:30.359', '2026-04-13 19:45:30.359'),
	('a24c58fe-784d-4b38-9501-f54d792c5576', 'João Silva', 'joao.silva@email.com', '(11) 98765-4321', 'COMPRAR', 300000.00, 500000.00, 'São Paulo', NULL, '"Vila Mariana,Paraíso,Jardins"', '"apartamento,casa"', 'Procura apartamento de 2 quartos próximo ao metrô', 1, NULL, '2026-04-16 20:53:58.003', '2026-04-16 20:53:58.003'),
	('ae64c3ed-181a-44e3-ba33-b41f8e510cb9', 'Pedro Costa', 'pedro.costa@email.com', '(11) 91234-5678', 'COMPRAR', 1000000.00, 2000000.00, 'São Paulo', NULL, '"Jardins,Moema,Brooklin"', '"casa,sobrado"', 'Procura casa de luxo com piscina', 1, NULL, '2026-04-16 20:53:58.159', '2026-04-16 20:53:58.159'),
	('b3def818-a5cc-4226-9b12-205d1eeb5d11', 'ALEX XAVIER ROSA', 'axavier34@gmail.com', '35999380696', 'COMPRAR', 250000.00, 650000.00, 'São Lourenço', 'MG', '["Estação", "Centro", "Federal", "Vila Nova"]', '["Residencial"]', NULL, 1, NULL, '2026-04-14 13:21:15.291', '2026-04-14 13:21:15.291'),
	('b564106d-83d4-4ab5-8575-1c1cd4a97fcb', 'Carlos Oliveira', 'carlos.oliveira@email.com', '(31) 98765-1234', 'COMPRAR', 400000.00, 600000.00, 'Belo Horizonte', NULL, '"Savassi,Lourdes,Funcionários"', '"casa,sobrado"', 'Precisa de quintal para crianças e pets', 1, NULL, '2026-04-16 20:53:58.109', '2026-04-16 20:53:58.109'),
	('c584fa23-31ff-4e4e-9793-00b7f5b76144', 'Marcos Rodrigues', 'marcos.rodrigues@email.com', '(51) 95678-9012', 'COMPRAR', 450000.00, 700000.00, 'Porto Alegre', NULL, '"Moinhos de Vento,Bela Vista"', '"apartamento,cobertura"', 'Executivo, quer cobertura próximo ao trabalho', 1, NULL, '2026-04-16 20:53:58.291', '2026-04-16 20:53:58.291'),
	('df91ba34-b24e-418f-be89-8d10ab93a8c2', 'Maria Santos', 'maria.santos@email.com', '(21) 99876-5432', 'ALUGAR', 2000.00, 3000.00, 'Rio de Janeiro', NULL, '"Copacabana,Ipanema,Leblon"', '"apartamento"', 'Quero vista para o mar, aceita animais de estimação', 1, NULL, '2026-04-16 20:53:58.084', '2026-04-16 20:53:58.084'),
	('e1504f5c-f9cf-4a60-a30b-99823aad2695', 'Luciana Ferreira', 'luciana.ferreira@email.com', '(85) 96789-0123', 'ALUGAR', 2500.00, 3500.00, 'Fortaleza', NULL, '"Meireles,Aldeota"', '"apartamento,flat"', 'Professora universitária, quer perto da praia', 1, NULL, '2026-04-16 20:53:58.316', '2026-04-16 20:53:58.316'),
	('fe28c8f6-b280-444c-98ca-3c1aa51539c3', 'Juliana Martins', 'juliana.martins@email.com', '(41) 94567-8901', 'ALUGAR', 800.00, 1200.00, 'Curitiba', NULL, '"Centro,Cristo Rei"', '"kitnet,quarto"', 'Estagiária, orçamento limitado', 1, NULL, '2026-04-16 20:53:58.274', '2026-04-16 20:53:58.274');

-- Copiando estrutura para tabela imovelsmatch.cliente_etiquetas
CREATE TABLE IF NOT EXISTS `cliente_etiquetas` (
  `clienteId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `etiquetaId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`clienteId`,`etiquetaId`),
  KEY `cliente_etiquetas_clienteId_idx` (`clienteId`),
  KEY `cliente_etiquetas_etiquetaId_idx` (`etiquetaId`),
  CONSTRAINT `cliente_etiquetas_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cliente_etiquetas_etiquetaId_fkey` FOREIGN KEY (`etiquetaId`) REFERENCES `etiquetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.cliente_etiquetas: ~0 rows (aproximadamente)
DELETE FROM `cliente_etiquetas`;

-- Copiando estrutura para tabela imovelsmatch.etiquetas
CREATE TABLE IF NOT EXISTS `etiquetas` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `etiquetas_nome_key` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.etiquetas: ~0 rows (aproximadamente)
DELETE FROM `etiquetas`;

-- Copiando estrutura para tabela imovelsmatch.imoveis
CREATE TABLE IF NOT EXISTS `imoveis` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `titulo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipoImovel` enum('CASA','APARTAMENTO','TERRENO','SOBRADO','OUTRO') COLLATE utf8mb4_unicode_ci NOT NULL,
  `operacao` enum('VENDA','ALUGUEL') COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `endereco` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bairro` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cep` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quartos` int NOT NULL DEFAULT '0',
  `vagas` int NOT NULL DEFAULT '0',
  `areaM2` decimal(8,2) DEFAULT NULL,
  `descricao` text COLLATE utf8mb4_unicode_ci,
  `fotos` json NOT NULL,
  `publicado` tinyint(1) NOT NULL DEFAULT '0',
  `destaque` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `imoveis_slug_key` (`slug`),
  KEY `imoveis_cidade_operacao_idx` (`cidade`,`operacao`),
  KEY `imoveis_publicado_idx` (`publicado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.imoveis: ~0 rows (aproximadamente)
DELETE FROM `imoveis`;
INSERT INTO `imoveis` (`id`, `titulo`, `slug`, `tipoImovel`, `operacao`, `valor`, `endereco`, `bairro`, `cidade`, `estado`, `cep`, `quartos`, `vagas`, `areaM2`, `descricao`, `fotos`, `publicado`, `destaque`, `createdAt`, `updatedAt`) VALUES
	('15e7672f-a7b7-43c3-87d0-93aea9a37508', 'Casa Família Barra da Tijuca', 'casa-familia-barra-da-tijuca', 'CASA', 'ALUGUEL', 7500.00, 'Avenida das Américas, 5000', 'Barra da Tijuca', 'Rio de Janeiro', 'RJ', '22640-102', 4, 4, 350.00, 'Casa em condomínio fechado, 4 quartos, piscina', '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"]', 1, 0, '2026-04-16 21:12:50.140', '2026-04-16 21:12:50.140'),
	('2104ec38-0ea3-49e4-bf91-49978ea88e08', 'Apartamento Estudante Água Verde', 'apartamento-estudante-agua-verde', 'APARTAMENTO', 'ALUGUEL', 1800.00, 'Rua República Argentina, 321', 'Água Verde', 'Curitiba', 'PR', '80610-260', 1, 1, 35.00, 'Studio compacto, próximo à UTFPR e shopping', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 1, 0, '2026-04-16 21:12:50.118', '2026-04-16 21:12:50.118'),
	('4d85d321-c546-49d5-8405-ab65da487711', 'Casa com Quintal Savassi', 'casa-quintal-savassi', 'CASA', 'VENDA', 550000.00, 'Rua da Bahia, 789', 'Savassi', 'Belo Horizonte', 'MG', '30140-010', 3, 2, 150.00, 'Casa térrea com 3 quartos, quintal amplo, churrasqueira', '["https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800"]', 1, 1, '2026-04-16 21:12:50.107', '2026-04-16 21:12:50.107'),
	('61315604-cdab-40ba-a8ad-7c0574334583', 'Apto Econômico Barreiro', 'apto-economico-barreiro', 'APARTAMENTO', 'VENDA', 280000.00, 'Rua dos Aposentados, 50', 'Barreiro', 'Belo Horizonte', 'MG', '30640-010', 2, 1, 55.00, 'Apartamento simples, 2 quartos, próximo ao comércio', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 1, 0, '2026-04-16 21:12:50.150', '2026-04-16 21:12:50.150'),
	('75f4a91a-4c8f-4b5e-9bb4-efd00c2a84e4', 'Apartamento Vista Mar Copacabana', 'apartamento-vista-mar-copacabana', 'APARTAMENTO', 'ALUGUEL', 2800.00, 'Avenida Atlântica, 456', 'Copacabana', 'Rio de Janeiro', 'RJ', '22010-000', 1, 0, 45.00, 'Lindo apartamento com vista para o mar, 1 quarto, reformado', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]', 1, 1, '2026-04-16 21:12:50.091', '2026-04-16 21:12:50.091'),
	('859e3bce-3781-4a18-9e21-5ea6e5095a70', 'Apartamento Moderno Vila Mariana', 'apartamento-moderno-vila-mariana', 'APARTAMENTO', 'VENDA', 480000.00, 'Rua dos Estudantes, 123', 'Vila Mariana', 'São Paulo', 'SP', '04120-000', 2, 1, 75.00, 'Apartamento de 2 quartos, varanda gourmet, próximo ao metrô', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 1, 1, '2026-04-16 21:12:49.903', '2026-04-16 21:12:49.903'),
	('d01cf33c-9b9d-48fd-b159-9417057ef5c9', 'Mansão Jardins', 'mansao-jardins', 'CASA', 'VENDA', 5000000.00, 'Rua Oscar Freire, 1000', 'Jardins', 'São Paulo', 'SP', '01426-001', 5, 6, 800.00, 'Casa de luxo com 5 suítes, piscina, academia', '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"]', 1, 1, '2026-04-16 21:12:50.130', '2026-04-16 21:12:50.130'),
	('d5734600-0029-4a77-83b9-1941596d2f0c', 'Cobertura Luxo Moinhos', 'cobertura-luxo-moinhos', 'APARTAMENTO', 'VENDA', 650000.00, 'Rua Padre Chagas, 200', 'Moinhos de Vento', 'Porto Alegre', 'RS', '90570-080', 3, 3, 280.00, 'Cobertura duplex, 3 suítes, terraço com vista panorâmica', '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800"]', 1, 1, '2026-04-16 21:12:50.173', '2026-04-16 21:12:50.173'),
	('e2b5daae-338e-4d40-ae3a-70c1fd09864c', 'Kitnet Centro Curitiba', 'kitnet-centro-curitiba', 'APARTAMENTO', 'ALUGUEL', 900.00, 'Rua XV de Novembro, 100', 'Centro', 'Curitiba', 'PR', '80020-310', 1, 0, 25.00, 'Kitnet básico, próximo à universidade federal', '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"]', 1, 0, '2026-04-16 21:12:50.160', '2026-04-16 21:12:50.160'),
	('f1256257-8fab-4cc9-9a1b-0934562113ff', 'Flat Beira Mar Meireles', 'flat-beira-mar-meireles', 'APARTAMENTO', 'ALUGUEL', 3200.00, 'Avenida Beira Mar, 3000', 'Meireles', 'Fortaleza', 'CE', '60165-120', 1, 1, 50.00, 'Flat mobiliado, serviços de hotelaria, vista para o mar', '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"]', 1, 1, '2026-04-16 21:12:50.182', '2026-04-16 21:12:50.182');

-- Copiando estrutura para tabela imovelsmatch.match_logs
CREATE TABLE IF NOT EXISTS `match_logs` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clienteId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imovelId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `canal` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('PENDENTE','ENVIADO','FALHOU') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDENTE',
  `erro` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `match_logs_clienteId_idx` (`clienteId`),
  KEY `match_logs_imovelId_idx` (`imovelId`),
  KEY `match_logs_clienteId_createdAt_idx` (`clienteId`,`createdAt`),
  CONSTRAINT `match_logs_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `match_logs_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `imoveis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.match_logs: ~0 rows (aproximadamente)
DELETE FROM `match_logs`;

-- Copiando estrutura para tabela imovelsmatch.negociacoes
CREATE TABLE IF NOT EXISTS `negociacoes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `clienteId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imovelId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `responsavelId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `etapa` enum('PRIMEIRO_CONTATO','VISITA_AGENDADA','PROPOSTA','ANALISE','FECHADO','PERDIDO') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PRIMEIRO_CONTATO',
  `valorProposta` decimal(10,2) DEFAULT NULL,
  `observacoes` text COLLATE utf8mb4_unicode_ci,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `negociacoes_clienteId_idx` (`clienteId`),
  KEY `negociacoes_imovelId_idx` (`imovelId`),
  KEY `negociacoes_responsavelId_idx` (`responsavelId`),
  KEY `negociacoes_etapa_idx` (`etapa`),
  CONSTRAINT `negociacoes_clienteId_fkey` FOREIGN KEY (`clienteId`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `negociacoes_imovelId_fkey` FOREIGN KEY (`imovelId`) REFERENCES `imoveis` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `negociacoes_responsavelId_fkey` FOREIGN KEY (`responsavelId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.negociacoes: ~0 rows (aproximadamente)
DELETE FROM `negociacoes`;
INSERT INTO `negociacoes` (`id`, `clienteId`, `imovelId`, `responsavelId`, `etapa`, `valorProposta`, `observacoes`, `createdAt`, `updatedAt`) VALUES
	('030db3bf-20b4-441f-98fa-037921a57728', 'a24c58fe-784d-4b38-9501-f54d792c5576', '859e3bce-3781-4a18-9e21-5ea6e5095a70', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PRIMEIRO_CONTATO', 480000.00, '🎯 MATCH: Cliente interessado, aguardando visita', '2026-04-16 21:17:23.863', '2026-04-16 21:17:23.863'),
	('0c77a710-54c4-4e19-8ab8-46ebe89ada5f', 'a24c58fe-784d-4b38-9501-f54d792c5576', '859e3bce-3781-4a18-9e21-5ea6e5095a70', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PRIMEIRO_CONTATO', 480000.00, '🎯 MATCH: Cliente interessado, aguardando visita', '2026-04-16 21:12:50.196', '2026-04-16 21:12:50.196'),
	('0f9614b2-a8a8-411a-9901-feb30a37be40', 'b564106d-83d4-4ab5-8575-1c1cd4a97fcb', '4d85d321-c546-49d5-8405-ab65da487711', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PROPOSTA', 550000.00, '🎯 MATCH: Proposta de 520k enviada, aguardando resposta', '2026-04-16 21:31:17.967', '2026-04-16 21:31:17.967'),
	('125400ea-686c-4877-90e6-b2cdad2e9771', 'df91ba34-b24e-418f-be89-8d10ab93a8c2', '75f4a91a-4c8f-4b5e-9bb4-efd00c2a84e4', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'VISITA_AGENDADA', NULL, '🎯 MATCH: Visita marcada para próxima semana', '2026-04-16 21:12:50.232', '2026-04-16 21:12:50.232'),
	('20e118ca-43fd-486f-b9c1-90c80a530d6d', 'a24c58fe-784d-4b38-9501-f54d792c5576', '859e3bce-3781-4a18-9e21-5ea6e5095a70', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PRIMEIRO_CONTATO', 480000.00, '🎯 MATCH: Cliente interessado, aguardando visita', '2026-04-16 21:16:57.124', '2026-04-16 21:16:57.124'),
	('2fdde7fd-62f4-48dc-a327-270462c0b4d3', '39aa0b6f-0562-42d8-91e2-2c3abbccf6a5', '2104ec38-0ea3-49e4-bf91-49978ea88e08', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'ANALISE', NULL, '🎯 MATCH: Negociando valor do aluguel', '2026-04-16 21:31:17.987', '2026-04-16 21:31:17.987'),
	('43687077-6d53-487d-9e5f-9856fa19c65f', 'a24c58fe-784d-4b38-9501-f54d792c5576', '859e3bce-3781-4a18-9e21-5ea6e5095a70', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PRIMEIRO_CONTATO', 480000.00, '🎯 MATCH: Cliente interessado, aguardando visita', '2026-04-16 21:31:17.829', '2026-04-16 21:31:17.829'),
	('4477645e-e085-4630-b5da-3b66e98c9e52', 'b564106d-83d4-4ab5-8575-1c1cd4a97fcb', '4d85d321-c546-49d5-8405-ab65da487711', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PROPOSTA', 550000.00, '🎯 MATCH: Proposta de 520k enviada, aguardando resposta', '2026-04-16 21:16:57.163', '2026-04-16 21:16:57.163'),
	('5ad7939d-11cd-4422-9158-2be9ee06137d', '39aa0b6f-0562-42d8-91e2-2c3abbccf6a5', '2104ec38-0ea3-49e4-bf91-49978ea88e08', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'ANALISE', NULL, '🎯 MATCH: Negociando valor do aluguel', '2026-04-16 21:16:57.176', '2026-04-16 21:16:57.176'),
	('60f16806-bee1-43d6-b13d-e9191c19641a', 'b564106d-83d4-4ab5-8575-1c1cd4a97fcb', '4d85d321-c546-49d5-8405-ab65da487711', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'PROPOSTA', 550000.00, '🎯 MATCH: Proposta de 520k enviada, aguardando resposta', '2026-04-16 21:17:23.893', '2026-04-16 21:17:23.893'),
	('6bf60092-9a13-4413-a38f-f3e6eea890b1', 'df91ba34-b24e-418f-be89-8d10ab93a8c2', '75f4a91a-4c8f-4b5e-9bb4-efd00c2a84e4', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'VISITA_AGENDADA', NULL, '🎯 MATCH: Visita marcada para próxima semana', '2026-04-16 21:17:23.879', '2026-04-16 21:17:23.879'),
	('9aba7201-0976-432c-9c6c-d22500c9e3bf', 'df91ba34-b24e-418f-be89-8d10ab93a8c2', '75f4a91a-4c8f-4b5e-9bb4-efd00c2a84e4', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'VISITA_AGENDADA', NULL, '🎯 MATCH: Visita marcada para próxima semana', '2026-04-16 21:31:17.920', '2026-04-16 21:31:17.920'),
	('e7ce9f2c-3271-4357-811c-f1c8cd515135', '39aa0b6f-0562-42d8-91e2-2c3abbccf6a5', '2104ec38-0ea3-49e4-bf91-49978ea88e08', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'ANALISE', NULL, '🎯 MATCH: Negociando valor do aluguel', '2026-04-16 21:17:23.911', '2026-04-16 21:17:23.911'),
	('f7611260-a40e-4b99-8842-88497ff5282d', 'df91ba34-b24e-418f-be89-8d10ab93a8c2', '75f4a91a-4c8f-4b5e-9bb4-efd00c2a84e4', '40dcd4e3-7779-464c-9747-fee6d1460cc8', 'VISITA_AGENDADA', NULL, '🎯 MATCH: Visita marcada para próxima semana', '2026-04-16 21:16:57.141', '2026-04-16 21:16:57.141');

-- Copiando estrutura para tabela imovelsmatch.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ativo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  `role` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'USER',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch.users: ~0 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `ativo`, `createdAt`, `updatedAt`, `role`) VALUES
	('40dcd4e3-7779-464c-9747-fee6d1460cc8', 'Administrador', 'admin@imoveis.com', '$2b$10$LhxS1tr3fbpkWQAIELUz9e3Q94bG1LIToYG36SXpGu9AAfm31NfFi', 1, '2026-04-16 14:40:07.223', '2026-04-16 14:40:07.223', 'USER'),
	('e83424f3-accf-42d5-98a8-4890a872feea', 'Admin', 'admin@test.com', '$2b$10$4xM07dvl.9luECpLryyNyO/RE5mTn/V1a3eTMa49EoM1nSZzet1nK', 1, '2026-04-13 21:01:14.360', '2026-04-13 21:01:14.360', 'USER');

-- Copiando estrutura para tabela imovelsmatch._prisma_migrations
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Copiando dados para a tabela imovelsmatch._prisma_migrations: ~2 rows (aproximadamente)
DELETE FROM `_prisma_migrations`;
INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
	('124385ba-8e7d-4de8-a975-a671016258e1', 'da306e4f4f50eb46119ec9231820d9f52ad5a700e7c9346b3cf5dd56a6da9aff', '2026-04-13 14:52:24.481', '20260413145219_init', NULL, NULL, '2026-04-13 14:52:19.177', 1),
	('a20255ee-e0b2-4b1a-97a5-cc57e9f611c6', '2cb600a3325e03a314a2e207e067ed5949d9f4ceeff8098d4cf08b817b0ef413', '2026-04-13 20:55:15.156', '20260413205515_add_user_role', NULL, NULL, '2026-04-13 20:55:15.068', 1);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
