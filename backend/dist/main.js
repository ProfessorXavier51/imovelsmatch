/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.module.ts"
/*!***************************!*\
  !*** ./src/app.module.ts ***!
  \***************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
const cache_manager_1 = __webpack_require__(/*! @nestjs/cache-manager */ "@nestjs/cache-manager");
const throttler_1 = __webpack_require__(/*! @nestjs/throttler */ "@nestjs/throttler");
const nest_winston_1 = __webpack_require__(/*! nest-winston */ "nest-winston");
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const cliente_module_1 = __webpack_require__(/*! ./presentation/modules/cliente.module */ "./src/presentation/modules/cliente.module.ts");
const auth_module_1 = __webpack_require__(/*! ./presentation/modules/auth.module */ "./src/presentation/modules/auth.module.ts");
const imovel_module_1 = __webpack_require__(/*! ./presentation/modules/imovel.module */ "./src/presentation/modules/imovel.module.ts");
const upload_module_1 = __webpack_require__(/*! ./presentation/modules/upload.module */ "./src/presentation/modules/upload.module.ts");
const match_module_1 = __webpack_require__(/*! ./presentation/modules/match.module */ "./src/presentation/modules/match.module.ts");
const dashboard_module_1 = __webpack_require__(/*! ./dashboard.module */ "./src/dashboard.module.ts");
const negociacao_module_1 = __webpack_require__(/*! ./presentation/modules/negociacao.module */ "./src/presentation/modules/negociacao.module.ts");
const notifications_gateway_1 = __webpack_require__(/*! ./infrastructure/websocket/notifications.gateway */ "./src/infrastructure/websocket/notifications.gateway.ts");
const cache_config_1 = __webpack_require__(/*! ./infrastructure/cache/cache.config */ "./src/infrastructure/cache/cache.config.ts");
const throttler_config_1 = __webpack_require__(/*! ./infrastructure/throttler/throttler.config */ "./src/infrastructure/throttler/throttler.config.ts");
const winston_config_1 = __webpack_require__(/*! ./infrastructure/logger/winston.config */ "./src/infrastructure/logger/winston.config.ts");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            auth_module_1.AuthModule,
            cliente_module_1.ClienteModule,
            imovel_module_1.ImovelModule,
            upload_module_1.UploadModule,
            match_module_1.MatchModule,
            dashboard_module_1.DashboardModule,
            negociacao_module_1.NegociacaoModule,
            cache_manager_1.CacheModule.register(cache_config_1.cacheConfig),
            throttler_1.ThrottlerModule.forRoot(throttler_config_1.throttlerConfig),
            nest_winston_1.WinstonModule.forRoot(winston_config_1.winstonConfig),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            notifications_gateway_1.NotificationsGateway,
        ],
    })
], AppModule);


/***/ },

/***/ "./src/application/dtos/auth/login.dto.ts"
/*!************************************************!*\
  !*** ./src/application/dtos/auth/login.dto.ts ***!
  \************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class LoginDTO {
}
exports.LoginDTO = LoginDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@gmail.com', description: 'Email do usuário' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Email inválido parceiro, bota um de verdade' }),
    __metadata("design:type", String)
], LoginDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'senha123', description: 'Senha do usuário' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória, senão qualquer um entra' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LoginDTO.prototype, "senha", void 0);


/***/ },

/***/ "./src/application/dtos/auth/register.dto.ts"
/*!***************************************************!*\
  !*** ./src/application/dtos/auth/register.dto.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class RegisterDTO {
}
exports.RegisterDTO = RegisterDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva', description: 'Nome completo do usuário' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Nome é obrigatório, como vamos te chamar?' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RegisterDTO.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'joao@gmail.com', description: 'Email único do usuário' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Esse email não existe não bicho' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'senha123', description: 'Senha (mínimo 6 caracteres)' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Senha é obrigatória' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6, { message: 'A senha tá muito fácil. Pelo menos 6 letras/números' }),
    __metadata("design:type", String)
], RegisterDTO.prototype, "senha", void 0);


/***/ },

/***/ "./src/application/dtos/cliente/cliente-response.dto.ts"
/*!**************************************************************!*\
  !*** ./src/application/dtos/cliente/cliente-response.dto.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClienteResponseDTO = void 0;
class ClienteResponseDTO {
    static fromEntity(cliente) {
        const dto = new ClienteResponseDTO();
        dto.id = cliente.id || '';
        dto.nome = cliente.nome;
        dto.email = cliente.email;
        dto.telefone = cliente.telefone || '';
        dto.telefoneFormatado = cliente.telefoneFormatado || '';
        dto.tipoInteresse = cliente.tipoInteresse;
        dto.valorMinimo = cliente.valorMinimo;
        dto.valorMaximo = cliente.valorMaximo;
        dto.cidade = cliente.cidade;
        dto.estado = cliente.estado;
        dto.bairrosPreferidos = cliente.bairrosPreferidos;
        dto.tiposImovel = cliente.tiposImovel;
        dto.observacoes = cliente.observacoes;
        dto.origem = cliente.origem;
        dto.ativo = cliente.ativo;
        dto.createdAt = cliente.createdAt;
        dto.updatedAt = cliente.updatedAt;
        return dto;
    }
    static fromEntityArray(clientes) {
        return clientes.map((cliente) => this.fromEntity(cliente));
    }
}
exports.ClienteResponseDTO = ClienteResponseDTO;


/***/ },

/***/ "./src/application/dtos/cliente/create-cliente.dto.ts"
/*!************************************************************!*\
  !*** ./src/application/dtos/cliente/create-cliente.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClienteDTO = void 0;
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const tipo_interesse_enum_1 = __webpack_require__(/*! ../../../shared/enums/tipo-interesse.enum */ "./src/shared/enums/tipo-interesse.enum.ts");
class CreateClienteDTO {
}
exports.CreateClienteDTO = CreateClienteDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nome completo do cliente', example: 'João Silva', minLength: 3, maxLength: 100 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Qual é o seu nome po? É obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Nome tem que ser letra, mano' }),
    (0, class_validator_1.MinLength)(3, { message: 'Nome muito curto, tem que ter no mínimo 3 letras' }),
    (0, class_validator_1.MaxLength)(100, { message: 'Tá testando o sistema? Máximo 100 caracteres no nome' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email do cliente (deve ser único)', example: 'joao@gmail.com' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Email é obrigatório pra gente te achar' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Vish, esse email tá meio estranho, coloca um válido' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Telefone do cliente (com ou sem máscara)', example: '(11) 99999-9999' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Telefone é obrigatório' }),
    (0, class_validator_1.IsString)({ message: 'Telefone tem que ser texto' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "telefone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo de interesse do cliente', enum: tipo_interesse_enum_1.TipoInteresse, example: tipo_interesse_enum_1.TipoInteresse.COMPRAR }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Como quer interagir? Tipo de interesse é obrigatório' }),
    (0, class_validator_1.IsEnum)(tipo_interesse_enum_1.TipoInteresse, {
        message: 'Oh chefe, só aceitamos COMPRAR ou ALUGAR',
    }),
    __metadata("design:type", typeof (_a = typeof tipo_interesse_enum_1.TipoInteresse !== "undefined" && tipo_interesse_enum_1.TipoInteresse) === "function" ? _a : Object)
], CreateClienteDTO.prototype, "tipoInteresse", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor mínimo de interesse (em reais)', example: 200000, minimum: 1000 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Faltou dizer o mínimo que tu tem pra gastar' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Grana é número, e não letra!' }),
    (0, class_validator_1.Min)(1000, { message: 'Tem que ter pelo menos mil conto (1000)' }),
    __metadata("design:type", Number)
], CreateClienteDTO.prototype, "valorMinimo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Valor máximo de interesse (em reais)', example: 500000, minimum: 1000 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Faltou o limite do cartão' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Mete número nisso aí' }),
    (0, class_validator_1.Min)(1000, { message: 'Tem que ter pelo menos mil conto (1000)' }),
    __metadata("design:type", Number)
], CreateClienteDTO.prototype, "valorMaximo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Cidade de interesse', example: 'São Paulo', minLength: 2 }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Qualé a cidade?' }),
    (0, class_validator_1.IsString)({ message: 'Põe em formato de texto po' }),
    (0, class_validator_1.MinLength)(2, { message: 'O nome da cidade de 1 letra não rola (Mínimo 2)' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "cidade", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'O Estado é texto patrão' }),
    (0, class_validator_1.MinLength)(2, { message: 'Coloca a sigla correta tipo SP, RJ (2 letras)' }),
    (0, class_validator_1.MaxLength)(2, { message: 'Sigla só tem 2 letras doido' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "estado", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Tem que ser uma listinha (Array) de opções' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Dentro da lista só aceitamos texto nos bairros' }),
    __metadata("design:type", Array)
], CreateClienteDTO.prototype, "bairrosPreferidos", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: 'Manda as preferências de imóvel em uma arrumação de lista (Array)' }),
    (0, class_validator_1.IsString)({ each: true, message: 'Cada tipo de imóvel tem que ser escrito em texto' }),
    __metadata("design:type", Array)
], CreateClienteDTO.prototype, "tiposImovel", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'Manda o texto com suas exigências aí' }),
    (0, class_validator_1.MaxLength)(500, {
        message: 'Chega de choro que passou de 500 caracteres, resuma sua angústia',
    }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "observacoes", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'A origem tem que ser explicada em texto' }),
    (0, class_validator_1.MaxLength)(50, { message: 'Breve demais! No máximo 50 letras na Origem' }),
    __metadata("design:type", String)
], CreateClienteDTO.prototype, "origem", void 0);


/***/ },

/***/ "./src/application/dtos/cliente/index.ts"
/*!***********************************************!*\
  !*** ./src/application/dtos/cliente/index.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./create-cliente.dto */ "./src/application/dtos/cliente/create-cliente.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./update-cliente.dto */ "./src/application/dtos/cliente/update-cliente.dto.ts"), exports);
__exportStar(__webpack_require__(/*! ./cliente-response.dto */ "./src/application/dtos/cliente/cliente-response.dto.ts"), exports);


/***/ },

/***/ "./src/application/dtos/cliente/update-cliente.dto.ts"
/*!************************************************************!*\
  !*** ./src/application/dtos/cliente/update-cliente.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClienteDTO = void 0;
const mapped_types_1 = __webpack_require__(/*! @nestjs/mapped-types */ "@nestjs/mapped-types");
const create_cliente_dto_1 = __webpack_require__(/*! ./create-cliente.dto */ "./src/application/dtos/cliente/create-cliente.dto.ts");
class UpdateClienteDTO extends (0, mapped_types_1.PartialType)(create_cliente_dto_1.CreateClienteDTO) {
}
exports.UpdateClienteDTO = UpdateClienteDTO;


/***/ },

/***/ "./src/application/dtos/imovel/create-imovel.dto.ts"
/*!**********************************************************!*\
  !*** ./src/application/dtos/imovel/create-imovel.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateImovelDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const class_validator_1 = __webpack_require__(/*! class-validator */ "class-validator");
class CreateImovelDTO {
}
exports.CreateImovelDTO = CreateImovelDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Apartamento 3 quartos no Centro' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Tem que ter título patrão!' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'apartamento-3-quartos-centro' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Faltou o Slug (link amigável)' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "slug", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['CASA', 'APARTAMENTO', 'TERRENO', 'SOBRADO', 'OUTRO'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['CASA', 'APARTAMENTO', 'TERRENO', 'SOBRADO', 'OUTRO'], { message: 'Põe um tipo válido aí' }),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "tipoImovel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['VENDA', 'ALUGUEL'] }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(['VENDA', 'ALUGUEL']),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "operacao", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 350000 }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1000, { message: 'No mínimo 1.000 conto, senão é golpe' }),
    __metadata("design:type", Number)
], CreateImovelDTO.prototype, "valor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rua das Flores, 123' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Centro' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "bairro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'São Paulo' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "cidade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SP' }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "estado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: '01310100' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "cep", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 3 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateImovelDTO.prototype, "quartos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateImovelDTO.prototype, "vagas", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 85.5 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateImovelDTO.prototype, "areaM2", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Apartamento amplo com vista para o parque' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateImovelDTO.prototype, "descricao", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: ['https://example.com/foto1.jpg'] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateImovelDTO.prototype, "fotos", void 0);


/***/ },

/***/ "./src/application/dtos/imovel/imovel-response.dto.ts"
/*!************************************************************!*\
  !*** ./src/application/dtos/imovel/imovel-response.dto.ts ***!
  \************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImovelResponseDTO = void 0;
class ImovelResponseDTO {
    static fromEntity(imovel) {
        const dto = new ImovelResponseDTO();
        dto.id = imovel.id || '';
        dto.titulo = imovel.titulo;
        dto.slug = imovel.slug;
        dto.descricao = imovel.descricao;
        dto.tipoImovel = imovel.tipoImovel;
        dto.operacao = imovel.operacao;
        dto.valor = imovel.valor;
        dto.endereco = imovel.endereco;
        dto.bairro = imovel.bairro;
        dto.cidade = imovel.cidade;
        dto.estado = imovel.estado;
        dto.cep = imovel.cep;
        dto.quartos = imovel.quartos;
        dto.vagas = imovel.vagas;
        dto.areaM2 = imovel.areaM2;
        dto.publicado = imovel.publicado;
        dto.destaque = imovel.destaque;
        dto.createdAt = imovel.createdAt || new Date();
        dto.updatedAt = imovel.updatedAt || new Date();
        return dto;
    }
    static fromEntityArray(imoveis) {
        return imoveis.map(i => ImovelResponseDTO.fromEntity(i));
    }
}
exports.ImovelResponseDTO = ImovelResponseDTO;


/***/ },

/***/ "./src/application/dtos/imovel/update-imovel.dto.ts"
/*!**********************************************************!*\
  !*** ./src/application/dtos/imovel/update-imovel.dto.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateImovelDTO = void 0;
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const create_imovel_dto_1 = __webpack_require__(/*! ./create-imovel.dto */ "./src/application/dtos/imovel/create-imovel.dto.ts");
class UpdateImovelDTO extends (0, swagger_1.PartialType)(create_imovel_dto_1.CreateImovelDTO) {
}
exports.UpdateImovelDTO = UpdateImovelDTO;


/***/ },

/***/ "./src/application/use-cases/auth/login.use-case.ts"
/*!**********************************************************!*\
  !*** ./src/application/use-cases/auth/login.use-case.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const user_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/user.repository.interface */ "./src/domain/repositories/user.repository.interface.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
let LoginUseCase = class LoginUseCase {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async execute(email, senha) {
        const user = await this.userRepository.findByEmail(email);
        if (!user || !user.ativo) {
            throw new common_1.UnauthorizedException('Credenciais inválidas. Nem tenta.');
        }
        const valid = await bcrypt.compare(senha, user.senha);
        if (!valid) {
            throw new common_1.UnauthorizedException('Credenciais inválidas. Senha zuada.');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                role: user.role,
            },
        };
    }
};
exports.LoginUseCase = LoginUseCase;
exports.LoginUseCase = LoginUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], LoginUseCase);


/***/ },

/***/ "./src/application/use-cases/auth/register.use-case.ts"
/*!*************************************************************!*\
  !*** ./src/application/use-cases/auth/register.use-case.ts ***!
  \*************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/user.repository.interface */ "./src/domain/repositories/user.repository.interface.ts");
const user_entity_1 = __webpack_require__(/*! ../../../domain/entities/user.entity */ "./src/domain/entities/user.entity.ts");
const bcrypt = __importStar(__webpack_require__(/*! bcryptjs */ "bcryptjs"));
let RegisterUseCase = class RegisterUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        const exists = await this.userRepository.findByEmail(data.email);
        if (exists) {
            throw new common_1.ConflictException('Já tem um maluco com esse e-mail no sistema');
        }
        const hashedPassword = await bcrypt.hash(data.senha, 10);
        const user = new user_entity_1.User({
            nome: data.nome,
            email: data.email,
            senha: hashedPassword,
        });
        return this.userRepository.create(user);
    }
};
exports.RegisterUseCase = RegisterUseCase;
exports.RegisterUseCase = RegisterUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IUserRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_interface_1.IUserRepository !== "undefined" && user_repository_interface_1.IUserRepository) === "function" ? _a : Object])
], RegisterUseCase);


/***/ },

/***/ "./src/application/use-cases/cliente/create-cliente.use-case.ts"
/*!**********************************************************************!*\
  !*** ./src/application/use-cases/cliente/create-cliente.use-case.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateClienteUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
const cliente_entity_1 = __webpack_require__(/*! ../../../domain/entities/cliente.entity */ "./src/domain/entities/cliente.entity.ts");
let CreateClienteUseCase = class CreateClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(input) {
        const clienteExistente = await this.clienteRepository.findByEmail(input.email);
        if (clienteExistente) {
            throw new common_1.ConflictException('Já existe um cliente cadastrado com este e-mail');
        }
        const cliente = cliente_entity_1.Cliente.create({
            nome: input.nome,
            email: input.email,
            telefone: input.telefone,
            tipoInteresse: input.tipoInteresse,
            valorMinimo: input.valorMinimo,
            valorMaximo: input.valorMaximo,
            cidade: input.cidade,
            estado: input.estado,
            bairrosPreferidos: input.bairrosPreferidos,
            tiposImovel: input.tiposImovel,
            observacoes: input.observacoes,
            origem: input.origem,
        });
        const clienteSalvo = await this.clienteRepository.create(cliente);
        return clienteSalvo;
    }
};
exports.CreateClienteUseCase = CreateClienteUseCase;
exports.CreateClienteUseCase = CreateClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], CreateClienteUseCase);


/***/ },

/***/ "./src/application/use-cases/cliente/delete-cliente.use-case.ts"
/*!**********************************************************************!*\
  !*** ./src/application/use-cases/cliente/delete-cliente.use-case.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DeleteClienteUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
let DeleteClienteUseCase = class DeleteClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(id) {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Foi malzada! O Cliente com ID ${id} não tá na base`);
        }
        await this.clienteRepository.delete(id);
    }
};
exports.DeleteClienteUseCase = DeleteClienteUseCase;
exports.DeleteClienteUseCase = DeleteClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], DeleteClienteUseCase);


/***/ },

/***/ "./src/application/use-cases/cliente/find-cliente.use-case.ts"
/*!********************************************************************!*\
  !*** ./src/application/use-cases/cliente/find-cliente.use-case.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindClienteUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
let FindClienteUseCase = class FindClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(id) {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente com ID ${id} sumiu do mapa, mano!`);
        }
        return cliente;
    }
};
exports.FindClienteUseCase = FindClienteUseCase;
exports.FindClienteUseCase = FindClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], FindClienteUseCase);


/***/ },

/***/ "./src/application/use-cases/cliente/index.ts"
/*!****************************************************!*\
  !*** ./src/application/use-cases/cliente/index.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./create-cliente.use-case */ "./src/application/use-cases/cliente/create-cliente.use-case.ts"), exports);
__exportStar(__webpack_require__(/*! ./find-cliente.use-case */ "./src/application/use-cases/cliente/find-cliente.use-case.ts"), exports);
__exportStar(__webpack_require__(/*! ./update-cliente.use-case */ "./src/application/use-cases/cliente/update-cliente.use-case.ts"), exports);
__exportStar(__webpack_require__(/*! ./delete-cliente.use-case */ "./src/application/use-cases/cliente/delete-cliente.use-case.ts"), exports);
__exportStar(__webpack_require__(/*! ./list-clientes.use-case */ "./src/application/use-cases/cliente/list-clientes.use-case.ts"), exports);


/***/ },

/***/ "./src/application/use-cases/cliente/list-clientes.use-case.ts"
/*!*********************************************************************!*\
  !*** ./src/application/use-cases/cliente/list-clientes.use-case.ts ***!
  \*********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListClientesUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
let ListClientesUseCase = class ListClientesUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(filters, page = 1, pageSize = 10, sort) {
        if (page < 1) {
            page = 1;
        }
        if (pageSize < 1) {
            pageSize = 10;
        }
        if (pageSize > 100) {
            pageSize = 100;
        }
        const result = await this.clienteRepository.findAll(filters, page, pageSize, sort);
        return result;
    }
};
exports.ListClientesUseCase = ListClientesUseCase;
exports.ListClientesUseCase = ListClientesUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], ListClientesUseCase);


/***/ },

/***/ "./src/application/use-cases/cliente/update-cliente.use-case.ts"
/*!**********************************************************************!*\
  !*** ./src/application/use-cases/cliente/update-cliente.use-case.ts ***!
  \**********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateClienteUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
let UpdateClienteUseCase = class UpdateClienteUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(id, input) {
        const cliente = await this.clienteRepository.findById(id);
        if (!cliente) {
            throw new common_1.NotFoundException(`Cliente ID ${id} não existe na galáxia!`);
        }
        if (input.email && input.email !== cliente.email) {
            const emailExiste = await this.clienteRepository.findByEmail(input.email);
            if (emailExiste) {
                throw new common_1.ConflictException('Mano, esse E-mail já tá em uso pelo concorrente!');
            }
        }
        cliente.update(input);
        const clienteAtualizado = await this.clienteRepository.update(cliente);
        return clienteAtualizado;
    }
};
exports.UpdateClienteUseCase = UpdateClienteUseCase;
exports.UpdateClienteUseCase = UpdateClienteUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], UpdateClienteUseCase);


/***/ },

/***/ "./src/application/use-cases/dashboard/get-dashboard-stats.use-case.ts"
/*!*****************************************************************************!*\
  !*** ./src/application/use-cases/dashboard/get-dashboard-stats.use-case.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GetDashboardStatsUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ../../../infrastructure/database/prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let GetDashboardStatsUseCase = class GetDashboardStatsUseCase {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async execute() {
        const totalClientes = await this.prisma.cliente.count();
        const totalImoveis = await this.prisma.imovel.count();
        const totalNegociacoes = await this.prisma.negociacao.count();
        const clientesAtivos = await this.prisma.cliente.count({ where: { ativo: true } });
        const clientesInativos = await this.prisma.cliente.count({ where: { ativo: false } });
        const imoveisPublicados = await this.prisma.imovel.count({ where: { publicado: true } });
        const imoveisDestaque = await this.prisma.imovel.count({ where: { destaque: true } });
        const clientesComprar = await this.prisma.cliente.count({
            where: { tipoInteresse: 'COMPRAR', ativo: true }
        });
        const clientesAlugar = await this.prisma.cliente.count({
            where: { tipoInteresse: 'ALUGAR', ativo: true }
        });
        const imoveisVenda = await this.prisma.imovel.count({
            where: { operacao: 'VENDA', publicado: true }
        });
        const imoveisAluguel = await this.prisma.imovel.count({
            where: { operacao: 'ALUGUEL', publicado: true }
        });
        const negociacoesPorEtapa = await this.prisma.negociacao.groupBy({
            by: ['etapa'],
            _count: { id: true }
        });
        const seteDiasAtras = new Date();
        seteDiasAtras.setDate(seteDiasAtras.getDate() - 7);
        const clientesRecentes = await this.prisma.cliente.count({
            where: { createdAt: { gte: seteDiasAtras } }
        });
        const imoveisRecentes = await this.prisma.imovel.count({
            where: { createdAt: { gte: seteDiasAtras } }
        });
        const negociacoesRecentes = await this.prisma.negociacao.count({
            where: { createdAt: { gte: seteDiasAtras } }
        });
        const topCidades = await this.prisma.imovel.groupBy({
            by: ['cidade', 'estado'],
            where: { publicado: true },
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 5
        });
        const topBairros = await this.prisma.imovel.groupBy({
            by: ['bairro', 'cidade'],
            where: { publicado: true },
            _count: { id: true },
            orderBy: { _count: { id: 'desc' } },
            take: 5
        });
        const imoveisVendaPreco = await this.prisma.imovel.findMany({
            where: { operacao: 'VENDA', publicado: true },
            select: { valor: true }
        });
        const faixasVenda = {
            ate100k: imoveisVendaPreco.filter(i => Number(i.valor) <= 100000).length,
            de100ka300k: imoveisVendaPreco.filter(i => Number(i.valor) > 100000 && Number(i.valor) <= 300000).length,
            de300ka500k: imoveisVendaPreco.filter(i => Number(i.valor) > 300000 && Number(i.valor) <= 500000).length,
            de500ka1m: imoveisVendaPreco.filter(i => Number(i.valor) > 500000 && Number(i.valor) <= 1000000).length,
            acima1m: imoveisVendaPreco.filter(i => Number(i.valor) > 1000000).length,
        };
        const imoveisAluguelPreco = await this.prisma.imovel.findMany({
            where: { operacao: 'ALUGUEL', publicado: true },
            select: { valor: true }
        });
        const faixasAluguel = {
            ate1k: imoveisAluguelPreco.filter(i => Number(i.valor) <= 1000).length,
            de1ka2k: imoveisAluguelPreco.filter(i => Number(i.valor) > 1000 && Number(i.valor) <= 2000).length,
            de2ka3k: imoveisAluguelPreco.filter(i => Number(i.valor) > 2000 && Number(i.valor) <= 3000).length,
            de3ka5k: imoveisAluguelPreco.filter(i => Number(i.valor) > 3000 && Number(i.valor) <= 5000).length,
            acima5k: imoveisAluguelPreco.filter(i => Number(i.valor) > 5000).length,
        };
        return {
            resumo: {
                totalClientes,
                totalImoveis,
                totalNegociacoes,
                clientesAtivos,
                imoveisPublicados,
                imoveisDestaque
            },
            clientes: {
                total: totalClientes,
                ativos: clientesAtivos,
                inativos: clientesInativos,
                comprar: clientesComprar,
                alugar: clientesAlugar,
                novosEstaSemana: clientesRecentes
            },
            imoveis: {
                total: totalImoveis,
                publicados: imoveisPublicados,
                destaque: imoveisDestaque,
                venda: imoveisVenda,
                aluguel: imoveisAluguel,
                novosEstaSemana: imoveisRecentes,
                faixasVenda,
                faixasAluguel
            },
            negociacoes: {
                total: totalNegociacoes,
                porEtapa: negociacoesPorEtapa.map(n => ({
                    etapa: n.etapa,
                    quantidade: n._count.id
                })),
                novasEstaSemana: negociacoesRecentes
            },
            geografico: {
                topCidades: topCidades.map(c => ({
                    cidade: c.cidade,
                    estado: c.estado,
                    quantidade: c._count.id
                })),
                topBairros: topBairros.map(b => ({
                    bairro: b.bairro,
                    cidade: b.cidade,
                    quantidade: b._count.id
                }))
            }
        };
    }
};
exports.GetDashboardStatsUseCase = GetDashboardStatsUseCase;
exports.GetDashboardStatsUseCase = GetDashboardStatsUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], GetDashboardStatsUseCase);


/***/ },

/***/ "./src/application/use-cases/imovel/create-imovel.use-case.ts"
/*!********************************************************************!*\
  !*** ./src/application/use-cases/imovel/create-imovel.use-case.ts ***!
  \********************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateImovelUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const imovel_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/imovel.repository.interface */ "./src/domain/repositories/imovel.repository.interface.ts");
const imovel_entity_1 = __webpack_require__(/*! ../../../domain/entities/imovel.entity */ "./src/domain/entities/imovel.entity.ts");
let CreateImovelUseCase = class CreateImovelUseCase {
    constructor(imovelRepository) {
        this.imovelRepository = imovelRepository;
    }
    async execute(data) {
        const exists = await this.imovelRepository.findBySlug(data.slug);
        if (exists) {
            throw new common_1.ConflictException('Vish, essa URL amigável já tá em uso! Bota um número aí');
        }
        const imovel = new imovel_entity_1.Imovel(data);
        return this.imovelRepository.create(imovel);
    }
};
exports.CreateImovelUseCase = CreateImovelUseCase;
exports.CreateImovelUseCase = CreateImovelUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IImovelRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof imovel_repository_interface_1.IImovelRepository !== "undefined" && imovel_repository_interface_1.IImovelRepository) === "function" ? _a : Object])
], CreateImovelUseCase);


/***/ },

/***/ "./src/application/use-cases/imovel/list-imoveis.use-case.ts"
/*!*******************************************************************!*\
  !*** ./src/application/use-cases/imovel/list-imoveis.use-case.ts ***!
  \*******************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ListImoveisUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const imovel_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/imovel.repository.interface */ "./src/domain/repositories/imovel.repository.interface.ts");
let ListImoveisUseCase = class ListImoveisUseCase {
    constructor(imovelRepository) {
        this.imovelRepository = imovelRepository;
    }
    async execute(filters, page = 1, pageSize = 10, sortField, sortOrder = 'asc') {
        if (page < 1)
            page = 1;
        if (pageSize < 1)
            pageSize = 10;
        if (pageSize > 100)
            pageSize = 100;
        const pagination = {
            page,
            pageSize,
            sortField,
            sortOrder,
        };
        return this.imovelRepository.findAll(filters || {}, pagination);
    }
};
exports.ListImoveisUseCase = ListImoveisUseCase;
exports.ListImoveisUseCase = ListImoveisUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IImovelRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof imovel_repository_interface_1.IImovelRepository !== "undefined" && imovel_repository_interface_1.IImovelRepository) === "function" ? _a : Object])
], ListImoveisUseCase);


/***/ },

/***/ "./src/application/use-cases/match/find-matches-for-imovel.use-case.ts"
/*!*****************************************************************************!*\
  !*** ./src/application/use-cases/match/find-matches-for-imovel.use-case.ts ***!
  \*****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FindMatchesForImovelUseCase = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_repository_interface_1 = __webpack_require__(/*! ../../../domain/repositories/cliente.repository.interface */ "./src/domain/repositories/cliente.repository.interface.ts");
const tipo_interesse_enum_1 = __webpack_require__(/*! ../../../shared/enums/tipo-interesse.enum */ "./src/shared/enums/tipo-interesse.enum.ts");
let FindMatchesForImovelUseCase = class FindMatchesForImovelUseCase {
    constructor(clienteRepository) {
        this.clienteRepository = clienteRepository;
    }
    async execute(imovel) {
        const filters = {
            ativo: true,
            tipoInteresse: imovel.operacao === 'VENDA' ? tipo_interesse_enum_1.TipoInteresse.COMPRAR : tipo_interesse_enum_1.TipoInteresse.ALUGAR,
            cidade: imovel.cidade,
            estado: imovel.estado,
        };
        const result = await this.clienteRepository.findAll(filters, 1, 100);
        const matches = result.data.filter((cliente) => {
            const valorOk = imovel.valor >= (cliente.valorMinimo || 0) &&
                imovel.valor <= (cliente.valorMaximo || Infinity);
            const bairroOk = !cliente.bairrosPreferidos?.length ||
                cliente.bairrosPreferidos.includes(imovel.bairro);
            const tipoOk = !cliente.tiposImovel?.length ||
                cliente.tiposImovel.includes(imovel.tipoImovel);
            return valorOk && bairroOk && tipoOk;
        });
        return matches;
    }
};
exports.FindMatchesForImovelUseCase = FindMatchesForImovelUseCase;
exports.FindMatchesForImovelUseCase = FindMatchesForImovelUseCase = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('IClienteRepository')),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_repository_interface_1.IClienteRepository !== "undefined" && cliente_repository_interface_1.IClienteRepository) === "function" ? _a : Object])
], FindMatchesForImovelUseCase);


/***/ },

/***/ "./src/dashboard.module.ts"
/*!*********************************!*\
  !*** ./src/dashboard.module.ts ***!
  \*********************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const dashboard_controller_1 = __webpack_require__(/*! ./presentation/controllers/dashboard.controller */ "./src/presentation/controllers/dashboard.controller.ts");
const get_dashboard_stats_use_case_1 = __webpack_require__(/*! ./application/use-cases/dashboard/get-dashboard-stats.use-case */ "./src/application/use-cases/dashboard/get-dashboard-stats.use-case.ts");
const prisma_service_1 = __webpack_require__(/*! ./infrastructure/database/prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        controllers: [dashboard_controller_1.DashboardController],
        providers: [get_dashboard_stats_use_case_1.GetDashboardStatsUseCase, prisma_service_1.PrismaService],
    })
], DashboardModule);


/***/ },

/***/ "./src/domain/entities/cliente.entity.ts"
/*!***********************************************!*\
  !*** ./src/domain/entities/cliente.entity.ts ***!
  \***********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Cliente = void 0;
const email_vo_1 = __webpack_require__(/*! ../value-objects/email.vo */ "./src/domain/value-objects/email.vo.ts");
const telefone_vo_1 = __webpack_require__(/*! ../value-objects/telefone.vo */ "./src/domain/value-objects/telefone.vo.ts");
const domain_exception_1 = __webpack_require__(/*! ../exceptions/domain.exception */ "./src/domain/exceptions/domain.exception.ts");
class Cliente {
    constructor(props, id) {
        this.validate(props);
        this._id = id;
        this._nome = props.nome;
        this._email = new email_vo_1.Email(props.email);
        this._telefone = new telefone_vo_1.Telefone(props.telefone);
        this._tipoInteresse = props.tipoInteresse;
        this._valorMinimo = props.valorMinimo;
        this._valorMaximo = props.valorMaximo;
        this._cidade = props.cidade;
        this._estado = props.estado;
        this._bairrosPreferidos = props.bairrosPreferidos || [];
        this._tiposImovel = props.tiposImovel || [];
        this._observacoes = props.observacoes;
        this._ativo = true;
        this._origem = props.origem;
        this._createdAt = new Date();
        this._updatedAt = new Date();
    }
    static create(props) {
        return new Cliente(props);
    }
    static restore(props, id) {
        return new Cliente(props, id);
    }
    validate(props) {
        if (!props.nome || props.nome.trim().length < 3) {
            throw new domain_exception_1.DomainException('Nome do cliente deve ter no mínimo 3 caracteres');
        }
        if (props.valorMinimo < 0 || props.valorMaximo < 0) {
            throw new domain_exception_1.DomainException('Valores não podem ser negativos e dívidas não rolam!');
        }
        if (props.valorMinimo > props.valorMaximo) {
            throw new domain_exception_1.DomainException('Valor mínimo não pode ser maior que valor máximo! Matemática básica po!');
        }
        if (!props.cidade || props.cidade.trim().length === 0) {
            throw new domain_exception_1.DomainException('Cidade é obrigatória, o tinder da casa não funciona em limbo!');
        }
    }
    get id() { return this._id; }
    get nome() { return this._nome; }
    get email() { return this._email.value; }
    get telefone() { return this._telefone.value; }
    get telefoneFormatado() { return this._telefone.formatted(); }
    get tipoInteresse() { return this._tipoInteresse; }
    get valorMinimo() { return this._valorMinimo; }
    get valorMaximo() { return this._valorMaximo; }
    get cidade() { return this._cidade; }
    get estado() { return this._estado; }
    get bairrosPreferidos() { return [...this._bairrosPreferidos]; }
    get tiposImovel() { return [...this._tiposImovel]; }
    get observacoes() { return this._observacoes; }
    get ativo() { return this._ativo; }
    get origem() { return this._origem; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }
    update(props) {
        if (props.nome)
            this._nome = props.nome;
        if (props.email)
            this._email = new email_vo_1.Email(props.email);
        if (props.telefone)
            this._telefone = new telefone_vo_1.Telefone(props.telefone);
        if (props.tipoInteresse)
            this._tipoInteresse = props.tipoInteresse;
        if (props.valorMinimo !== undefined)
            this._valorMinimo = props.valorMinimo;
        if (props.valorMaximo !== undefined)
            this._valorMaximo = props.valorMaximo;
        if (props.cidade)
            this._cidade = props.cidade;
        if (props.estado !== undefined)
            this._estado = props.estado;
        if (props.bairrosPreferidos)
            this._bairrosPreferidos = props.bairrosPreferidos;
        if (props.tiposImovel)
            this._tiposImovel = props.tiposImovel;
        if (props.observacoes !== undefined)
            this._observacoes = props.observacoes;
        this._updatedAt = new Date();
        this.validate({
            nome: this._nome,
            email: this._email.value,
            telefone: this._telefone.value,
            tipoInteresse: this._tipoInteresse,
            valorMinimo: this._valorMinimo,
            valorMaximo: this._valorMaximo,
            cidade: this._cidade,
        });
    }
    ativar() {
        this._ativo = true;
        this._updatedAt = new Date();
    }
    desativar() {
        this._ativo = false;
        this._updatedAt = new Date();
    }
    valorEstaEmFaixa(valor) {
        return valor >= this._valorMinimo && valor <= this._valorMaximo;
    }
    temInteresseEmBairro(bairro) {
        if (this._bairrosPreferidos.length === 0)
            return true;
        return this._bairrosPreferidos.some((b) => b.toLowerCase() === bairro.toLowerCase());
    }
    temInteresseEmTipo(tipo) {
        if (this._tiposImovel.length === 0)
            return true;
        return this._tiposImovel.includes(tipo);
    }
}
exports.Cliente = Cliente;


/***/ },

/***/ "./src/domain/entities/imovel.entity.ts"
/*!**********************************************!*\
  !*** ./src/domain/entities/imovel.entity.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Imovel = void 0;
const domain_exception_1 = __webpack_require__(/*! ../exceptions/domain.exception */ "./src/domain/exceptions/domain.exception.ts");
class Imovel {
    constructor(props, id) {
        this._id = id;
        this._titulo = props.titulo;
        this._slug = props.slug;
        this._tipoImovel = props.tipoImovel;
        this._operacao = props.operacao;
        this._valor = props.valor;
        this._endereco = props.endereco;
        this._bairro = props.bairro;
        this._cidade = props.cidade;
        this._estado = props.estado;
        this._cep = props.cep;
        this._quartos = props.quartos || 0;
        this._vagas = props.vagas || 0;
        this._areaM2 = props.areaM2;
        this._descricao = props.descricao;
        this._fotos = props.fotos || [];
        this._publicado = props.publicado || false;
        this._destaque = props.destaque || false;
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this.validate();
    }
    validate() {
        if (!this._titulo || this._titulo.trim().length < 5) {
            throw new domain_exception_1.DomainException('Mano, o título do anúncio tem que ter no mínimo 5 caracteres');
        }
        if (this._valor <= 0) {
            throw new domain_exception_1.DomainException('Tá dando a casa de graça? O valor tem que ser maior que zero');
        }
        if (!this._endereco || this._endereco.trim().length < 5) {
            throw new domain_exception_1.DomainException('Endereço tá muito curto da rua, tem no mínimo 5 letras');
        }
    }
    update(props) {
        if (props.titulo !== undefined)
            this._titulo = props.titulo;
        if (props.slug !== undefined)
            this._slug = props.slug;
        if (props.tipoImovel !== undefined)
            this._tipoImovel = props.tipoImovel;
        if (props.operacao !== undefined)
            this._operacao = props.operacao;
        if (props.valor !== undefined)
            this._valor = props.valor;
        if (props.endereco !== undefined)
            this._endereco = props.endereco;
        if (props.bairro !== undefined)
            this._bairro = props.bairro;
        if (props.cidade !== undefined)
            this._cidade = props.cidade;
        if (props.estado !== undefined)
            this._estado = props.estado;
        if (props.cep !== undefined)
            this._cep = props.cep;
        if (props.quartos !== undefined)
            this._quartos = props.quartos;
        if (props.vagas !== undefined)
            this._vagas = props.vagas;
        if (props.areaM2 !== undefined)
            this._areaM2 = props.areaM2;
        if (props.descricao !== undefined)
            this._descricao = props.descricao;
        if (props.fotos !== undefined)
            this._fotos = props.fotos;
        if (props.publicado !== undefined)
            this._publicado = props.publicado;
        if (props.destaque !== undefined)
            this._destaque = props.destaque;
        this._updatedAt = new Date();
        this.validate();
    }
    publicar() {
        this._publicado = true;
        this._updatedAt = new Date();
    }
    despublicar() {
        this._publicado = false;
        this._updatedAt = new Date();
    }
    get id() { return this._id; }
    get titulo() { return this._titulo; }
    get slug() { return this._slug; }
    get tipoImovel() { return this._tipoImovel; }
    get operacao() { return this._operacao; }
    get valor() { return this._valor; }
    get endereco() { return this._endereco; }
    get bairro() { return this._bairro; }
    get cidade() { return this._cidade; }
    get estado() { return this._estado; }
    get cep() { return this._cep; }
    get quartos() { return this._quartos; }
    get vagas() { return this._vagas; }
    get areaM2() { return this._areaM2; }
    get descricao() { return this._descricao; }
    get fotos() { return this._fotos; }
    get publicado() { return this._publicado; }
    get destaque() { return this._destaque; }
    get createdAt() { return this._createdAt; }
    get updatedAt() { return this._updatedAt; }
}
exports.Imovel = Imovel;


/***/ },

/***/ "./src/domain/entities/user.entity.ts"
/*!********************************************!*\
  !*** ./src/domain/entities/user.entity.ts ***!
  \********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const email_vo_1 = __webpack_require__(/*! ../value-objects/email.vo */ "./src/domain/value-objects/email.vo.ts");
const domain_exception_1 = __webpack_require__(/*! ../exceptions/domain.exception */ "./src/domain/exceptions/domain.exception.ts");
class User {
    constructor(props, id) {
        this._id = id;
        this._nome = props.nome;
        this._email = new email_vo_1.Email(props.email);
        this._senha = props.senha;
        this._role = props.role || 'USER';
        this._ativo = true;
        this._createdAt = new Date();
        this._updatedAt = new Date();
        this.validate();
    }
    validate() {
        if (!this._nome || this._nome.trim().length < 3) {
            throw new domain_exception_1.DomainException('Mano, como que teu nome tem menos de 3 letras? Completa aí');
        }
        if (this._nome.length > 100) {
            throw new domain_exception_1.DomainException('Chega de história triste, o nome tá gigante bicho! Máximo 100');
        }
    }
    update(props) {
        if (props.nome !== undefined) {
            this._nome = props.nome;
        }
        if (props.email !== undefined) {
            this._email = new email_vo_1.Email(props.email);
        }
        if (props.role !== undefined) {
            this._role = props.role;
        }
        this._updatedAt = new Date();
        this.validate();
    }
    get id() {
        return this._id;
    }
    get nome() {
        return this._nome;
    }
    get email() {
        return this._email.value;
    }
    get senha() {
        return this._senha;
    }
    get role() {
        return this._role;
    }
    get ativo() {
        return this._ativo;
    }
    get createdAt() {
        return this._createdAt;
    }
    get updatedAt() {
        return this._updatedAt;
    }
    desativar() {
        this._ativo = false;
        this._updatedAt = new Date();
    }
    ativar() {
        this._ativo = true;
        this._updatedAt = new Date();
    }
    isAdmin() {
        return this._role === 'ADMIN';
    }
}
exports.User = User;


/***/ },

/***/ "./src/domain/exceptions/domain.exception.ts"
/*!***************************************************!*\
  !*** ./src/domain/exceptions/domain.exception.ts ***!
  \***************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DomainException = void 0;
class DomainException extends Error {
    constructor(message) {
        super(message);
        this.name = 'DomainException';
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.DomainException = DomainException;


/***/ },

/***/ "./src/domain/repositories/cliente.repository.interface.ts"
/*!*****************************************************************!*\
  !*** ./src/domain/repositories/cliente.repository.interface.ts ***!
  \*****************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./src/domain/repositories/imovel.repository.interface.ts"
/*!****************************************************************!*\
  !*** ./src/domain/repositories/imovel.repository.interface.ts ***!
  \****************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./src/domain/repositories/user.repository.interface.ts"
/*!**************************************************************!*\
  !*** ./src/domain/repositories/user.repository.interface.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ },

/***/ "./src/domain/value-objects/email.vo.ts"
/*!**********************************************!*\
  !*** ./src/domain/value-objects/email.vo.ts ***!
  \**********************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Email = void 0;
const domain_exception_1 = __webpack_require__(/*! ../exceptions/domain.exception */ "./src/domain/exceptions/domain.exception.ts");
class Email {
    constructor(value) {
        this.validate(value);
        this._value = value.trim().toLowerCase();
    }
    validate(value) {
        if (!value || value.trim().length === 0) {
            throw new domain_exception_1.DomainException('E-mail não pode ser vazio');
        }
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(value)) {
            throw new domain_exception_1.DomainException('Formato de e-mail inválido');
        }
    }
    get value() {
        return this._value;
    }
    equals(other) {
        return this._value === other._value;
    }
    toString() {
        return this._value;
    }
}
exports.Email = Email;


/***/ },

/***/ "./src/domain/value-objects/telefone.vo.ts"
/*!*************************************************!*\
  !*** ./src/domain/value-objects/telefone.vo.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Telefone = void 0;
const domain_exception_1 = __webpack_require__(/*! ../exceptions/domain.exception */ "./src/domain/exceptions/domain.exception.ts");
class Telefone {
    constructor(value) {
        const normalized = this.normalize(value);
        this.validate(normalized);
        this._value = normalized;
    }
    normalize(value) {
        return value.replace(/\D/g, '');
    }
    validate(value) {
        if (!value || value.length === 0) {
            throw new domain_exception_1.DomainException('Telefone não pode ser vazio');
        }
        if (value.length < 10 || value.length > 11) {
            throw new domain_exception_1.DomainException('Telefone deve ter 10 dígitos (fixo) ou 11 dígitos (celular)');
        }
        const ddd = parseInt(value.substring(0, 2));
        if (ddd < 11 || ddd > 99) {
            throw new domain_exception_1.DomainException('DDD inválido (deve ser entre 11 e 99)');
        }
        if (value.length === 11) {
            const primeiroDigito = value.charAt(2);
            if (primeiroDigito !== '9') {
                throw new domain_exception_1.DomainException('Celular deve começar com 9 após o DDD');
            }
        }
    }
    get value() {
        return this._value;
    }
    formatted() {
        if (this._value.length === 11) {
            return `(${this._value.substring(0, 2)}) ${this._value.substring(2, 7)}-${this._value.substring(7)}`;
        }
        else {
            return `(${this._value.substring(0, 2)}) ${this._value.substring(2, 6)}-${this._value.substring(6)}`;
        }
    }
    isCelular() {
        return this._value.length === 11;
    }
    equals(other) {
        return this._value === other._value;
    }
    toString() {
        return this._value;
    }
}
exports.Telefone = Telefone;


/***/ },

/***/ "./src/infrastructure/auth/jwt-auth.guard.ts"
/*!***************************************************!*\
  !*** ./src/infrastructure/auth/jwt-auth.guard.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
let JwtAuthGuard = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);


/***/ },

/***/ "./src/infrastructure/auth/jwt.strategy.ts"
/*!*************************************************!*\
  !*** ./src/infrastructure/auth/jwt.strategy.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtStrategy = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const passport_jwt_1 = __webpack_require__(/*! passport-jwt */ "passport-jwt");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'secret-key-change-in-production',
        });
    }
    async validate(payload) {
        return { userId: payload.sub, email: payload.email, role: payload.role };
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], JwtStrategy);


/***/ },

/***/ "./src/infrastructure/cache/cache.config.ts"
/*!**************************************************!*\
  !*** ./src/infrastructure/cache/cache.config.ts ***!
  \**************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cacheConfig = void 0;
exports.cacheConfig = {
    ttl: 300,
    max: 100,
    isGlobal: true,
};


/***/ },

/***/ "./src/infrastructure/database/database.module.ts"
/*!********************************************************!*\
  !*** ./src/infrastructure/database/database.module.ts ***!
  \********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const prisma_service_1 = __webpack_require__(/*! ./prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
const prisma_cliente_repository_1 = __webpack_require__(/*! ./repositories/prisma-cliente.repository */ "./src/infrastructure/database/repositories/prisma-cliente.repository.ts");
const prisma_user_repository_1 = __webpack_require__(/*! ./repositories/prisma-user.repository */ "./src/infrastructure/database/repositories/prisma-user.repository.ts");
const prisma_imovel_repository_1 = __webpack_require__(/*! ./repositories/prisma-imovel.repository */ "./src/infrastructure/database/repositories/prisma-imovel.repository.ts");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            prisma_service_1.PrismaService,
            {
                provide: 'IClienteRepository',
                useClass: prisma_cliente_repository_1.PrismaClienteRepository,
            },
            {
                provide: 'IUserRepository',
                useClass: prisma_user_repository_1.PrismaUserRepository,
            },
            {
                provide: 'IImovelRepository',
                useClass: prisma_imovel_repository_1.PrismaImovelRepository,
            },
        ],
        exports: [
            prisma_service_1.PrismaService,
            'IClienteRepository',
            'IUserRepository',
            'IImovelRepository',
        ],
    })
], DatabaseModule);


/***/ },

/***/ "./src/infrastructure/database/prisma/prisma.service.ts"
/*!**************************************************************!*\
  !*** ./src/infrastructure/database/prisma/prisma.service.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const client_1 = __webpack_require__(/*! @prisma/client */ "@prisma/client");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super({
            log: ['query', 'error', 'warn'],
            errorFormat: 'pretty',
        });
    }
    async onModuleInit() {
        await this.$connect();
        console.log('✅ Prisma conectado ao banco de dados com a maestria de um jovem!');
    }
    async onModuleDestroy() {
        await this.$disconnect();
        console.log('✅ Prisma desconectado. Vai dormir!');
    }
    async cleanDatabase() {
        if (process.env.NODE_ENV === 'production') {
            throw new Error('🚨 Ta maluco! cleanDatabase() numa produção! Demissão em massa!');
        }
        await this.clienteEtiqueta.deleteMany();
        await this.anotacao.deleteMany();
        await this.atividade.deleteMany();
        await this.negociacao.deleteMany();
        await this.matchLog.deleteMany();
        await this.etiqueta.deleteMany();
        await this.cliente.deleteMany();
        await this.imovel.deleteMany();
        await this.user.deleteMany();
        console.log('🧹 Banco de dados limpo. Zero stress!');
    }
    async executeRaw(query, params) {
        return await this.$queryRawUnsafe(query, ...(params || []));
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);


/***/ },

/***/ "./src/infrastructure/database/repositories/prisma-cliente.repository.ts"
/*!*******************************************************************************!*\
  !*** ./src/infrastructure/database/repositories/prisma-cliente.repository.ts ***!
  \*******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaClienteRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cliente_entity_1 = __webpack_require__(/*! ../../../domain/entities/cliente.entity */ "./src/domain/entities/cliente.entity.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let PrismaClienteRepository = class PrismaClienteRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(cliente) {
        const data = {
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            tipoInteresse: cliente.tipoInteresse,
            valorMinimo: cliente.valorMinimo,
            valorMaximo: cliente.valorMaximo,
            cidade: cliente.cidade,
            estado: cliente.estado,
            bairrosPreferidos: cliente.bairrosPreferidos,
            tiposImovel: cliente.tiposImovel,
            observacoes: cliente.observacoes,
            origem: cliente.origem,
            ativo: cliente.ativo,
        };
        const created = await this.prisma.cliente.create({
            data,
        });
        return this.toDomain(created);
    }
    async findById(id) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { id },
        });
        if (!cliente)
            return null;
        return this.toDomain(cliente);
    }
    async findByEmail(email) {
        const cliente = await this.prisma.cliente.findUnique({
            where: { email },
        });
        if (!cliente)
            return null;
        return this.toDomain(cliente);
    }
    async findAll(filters, page = 1, pageSize = 10, sort) {
        const where = {};
        if (filters) {
            if (filters.ativo !== undefined)
                where.ativo = filters.ativo;
            if (filters.tipoInteresse)
                where.tipoInteresse = filters.tipoInteresse;
            if (filters.cidade) {
                where.cidade = { contains: filters.cidade, mode: 'insensitive' };
            }
            if (filters.estado)
                where.estado = filters.estado;
            if (filters.valorMinimo !== undefined) {
                where.valorMinimo = { gte: filters.valorMinimo };
            }
            if (filters.valorMaximo !== undefined) {
                where.valorMaximo = { lte: filters.valorMaximo };
            }
            if (filters.search) {
                where.OR = [
                    { nome: { contains: filters.search, mode: 'insensitive' } },
                    { email: { contains: filters.search, mode: 'insensitive' } },
                ];
            }
        }
        const orderBy = sort
            ? { [sort.field]: sort.order }
            : { createdAt: 'desc' };
        const skip = (page - 1) * pageSize;
        const take = pageSize;
        const [total, clientes] = await this.prisma.$transaction([
            this.prisma.cliente.count({ where }),
            this.prisma.cliente.findMany({
                where,
                orderBy,
                skip,
                take,
            }),
        ]);
        const data = clientes.map((c) => this.toDomain(c));
        const totalPages = Math.ceil(total / pageSize);
        return { data, total, page, pageSize, totalPages };
    }
    async update(cliente) {
        const data = {
            nome: cliente.nome,
            email: cliente.email,
            telefone: cliente.telefone,
            tipoInteresse: cliente.tipoInteresse,
            valorMinimo: cliente.valorMinimo,
            valorMaximo: cliente.valorMaximo,
            cidade: cliente.cidade,
            estado: cliente.estado,
            bairrosPreferidos: cliente.bairrosPreferidos,
            tiposImovel: cliente.tiposImovel,
            observacoes: cliente.observacoes,
            origem: cliente.origem,
            ativo: cliente.ativo,
            updatedAt: new Date(),
        };
        const updated = await this.prisma.cliente.update({
            where: { id: cliente.id },
            data,
        });
        return this.toDomain(updated);
    }
    async delete(id) {
        await this.prisma.cliente.delete({
            where: { id },
        });
    }
    async findCompatibleWithImovel(imovelId, operacao, valor, cidade, bairro, tipo) {
        const tipoInteresse = operacao === 'VENDA' ? 'COMPRAR' : 'ALUGAR';
        const where = {
            ativo: true,
            tipoInteresse,
            valorMinimo: { lte: valor },
            valorMaximo: { gte: valor },
            cidade: { equals: cidade, mode: 'insensitive' },
        };
        const clientes = await this.prisma.cliente.findMany({ where });
        const filtered = clientes.filter((c) => {
            const bairrosArray = c.bairrosPreferidos || [];
            const tiposArray = c.tiposImovel || [];
            const bairrosOk = bairrosArray.length === 0 || bairrosArray.some((b) => b.toLowerCase() === bairro.toLowerCase());
            const tiposOk = tiposArray.length === 0 || tiposArray.includes(tipo);
            return bairrosOk && tiposOk;
        });
        const notificados = await this.prisma.matchLog.findMany({
            where: { imovelId },
            select: { clienteId: true },
        });
        const notificadosIds = notificados.map((n) => n.clienteId);
        const naoNotificados = filtered.filter((c) => !notificadosIds.includes(c.id));
        return naoNotificados.map((c) => this.toDomain(c));
    }
    async countNotificationsToday(clienteId) {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        return await this.prisma.matchLog.count({
            where: {
                clienteId,
                createdAt: { gte: hoje },
            },
        });
    }
    async wasNotified(clienteId, imovelId) {
        const log = await this.prisma.matchLog.findFirst({
            where: { clienteId, imovelId },
        });
        return log !== null;
    }
    toDomain(prismaCliente) {
        return cliente_entity_1.Cliente.restore({
            nome: prismaCliente.nome,
            email: prismaCliente.email,
            telefone: prismaCliente.telefone,
            tipoInteresse: prismaCliente.tipoInteresse,
            valorMinimo: Number(prismaCliente.valorMinimo),
            valorMaximo: Number(prismaCliente.valorMaximo),
            cidade: prismaCliente.cidade,
            estado: prismaCliente.estado || undefined,
            bairrosPreferidos: prismaCliente.bairrosPreferidos,
            tiposImovel: prismaCliente.tiposImovel,
            observacoes: prismaCliente.observacoes || undefined,
            origem: prismaCliente.origem || undefined,
        }, prismaCliente.id);
    }
};
exports.PrismaClienteRepository = PrismaClienteRepository;
exports.PrismaClienteRepository = PrismaClienteRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], PrismaClienteRepository);


/***/ },

/***/ "./src/infrastructure/database/repositories/prisma-imovel.repository.ts"
/*!******************************************************************************!*\
  !*** ./src/infrastructure/database/repositories/prisma-imovel.repository.ts ***!
  \******************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaImovelRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const imovel_entity_1 = __webpack_require__(/*! ../../../domain/entities/imovel.entity */ "./src/domain/entities/imovel.entity.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let PrismaImovelRepository = class PrismaImovelRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(imovel) {
        const created = await this.prisma.imovel.create({
            data: {
                titulo: imovel.titulo,
                slug: imovel.slug,
                tipoImovel: imovel.tipoImovel,
                operacao: imovel.operacao,
                valor: imovel.valor,
                endereco: imovel.endereco,
                bairro: imovel.bairro,
                cidade: imovel.cidade,
                estado: imovel.estado,
                cep: imovel.cep,
                quartos: imovel.quartos,
                vagas: imovel.vagas,
                areaM2: imovel.areaM2,
                descricao: imovel.descricao,
                fotos: imovel.fotos,
                publicado: imovel.publicado,
                destaque: imovel.destaque,
            },
        });
        return this.toDomain(created);
    }
    async findById(id) {
        const imovel = await this.prisma.imovel.findUnique({ where: { id } });
        return imovel ? this.toDomain(imovel) : null;
    }
    async findBySlug(slug) {
        const imovel = await this.prisma.imovel.findUnique({ where: { slug } });
        return imovel ? this.toDomain(imovel) : null;
    }
    async update(imovel) {
        const updated = await this.prisma.imovel.update({
            where: { id: imovel.id },
            data: {
                titulo: imovel.titulo,
                slug: imovel.slug,
                tipoImovel: imovel.tipoImovel,
                operacao: imovel.operacao,
                valor: imovel.valor,
                endereco: imovel.endereco,
                bairro: imovel.bairro,
                cidade: imovel.cidade,
                estado: imovel.estado,
                cep: imovel.cep,
                quartos: imovel.quartos,
                vagas: imovel.vagas,
                areaM2: imovel.areaM2,
                descricao: imovel.descricao,
                fotos: imovel.fotos,
                publicado: imovel.publicado,
                destaque: imovel.destaque,
            },
        });
        return this.toDomain(updated);
    }
    async delete(id) {
        await this.prisma.imovel.delete({ where: { id } });
    }
    async findAll(filters, pagination) {
        const where = {};
        if (filters.publicado !== undefined)
            where.publicado = filters.publicado;
        if (filters.operacao)
            where.operacao = filters.operacao;
        if (filters.tipoImovel)
            where.tipoImovel = filters.tipoImovel;
        if (filters.cidade)
            where.cidade = { contains: filters.cidade };
        if (filters.estado)
            where.estado = filters.estado;
        if (filters.bairro)
            where.bairro = { contains: filters.bairro };
        if (filters.valorMinimo || filters.valorMaximo) {
            where.valor = {};
            if (filters.valorMinimo)
                where.valor.gte = filters.valorMinimo;
            if (filters.valorMaximo)
                where.valor.lte = filters.valorMaximo;
        }
        if (filters.quartosMinimo)
            where.quartos = { gte: filters.quartosMinimo };
        if (filters.vagasMinimo)
            where.vagas = { gte: filters.vagasMinimo };
        if (filters.search) {
            where.OR = [
                { titulo: { contains: filters.search } },
                { descricao: { contains: filters.search } },
                { endereco: { contains: filters.search } },
            ];
        }
        const [imoveis, total] = await Promise.all([
            this.prisma.imovel.findMany({
                where,
                skip: (pagination.page - 1) * pagination.pageSize,
                take: pagination.pageSize,
                orderBy: { [pagination.sortField || 'createdAt']: pagination.sortOrder || 'desc' },
            }),
            this.prisma.imovel.count({ where }),
        ]);
        return {
            data: imoveis.map((i) => this.toDomain(i)),
            total,
            page: pagination.page,
            pageSize: pagination.pageSize,
            totalPages: Math.ceil(total / pagination.pageSize),
        };
    }
    toDomain(prismaImovel) {
        return new imovel_entity_1.Imovel({
            titulo: prismaImovel.titulo,
            slug: prismaImovel.slug,
            tipoImovel: prismaImovel.tipoImovel,
            operacao: prismaImovel.operacao,
            valor: Number(prismaImovel.valor),
            endereco: prismaImovel.endereco,
            bairro: prismaImovel.bairro,
            cidade: prismaImovel.cidade,
            estado: prismaImovel.estado,
            cep: prismaImovel.cep,
            quartos: prismaImovel.quartos,
            vagas: prismaImovel.vagas,
            areaM2: prismaImovel.areaM2 ? Number(prismaImovel.areaM2) : undefined,
            descricao: prismaImovel.descricao,
            fotos: Array.isArray(prismaImovel.fotos) ? prismaImovel.fotos : [],
            publicado: prismaImovel.publicado,
            destaque: prismaImovel.destaque,
        }, prismaImovel.id);
    }
};
exports.PrismaImovelRepository = PrismaImovelRepository;
exports.PrismaImovelRepository = PrismaImovelRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], PrismaImovelRepository);


/***/ },

/***/ "./src/infrastructure/database/repositories/prisma-user.repository.ts"
/*!****************************************************************************!*\
  !*** ./src/infrastructure/database/repositories/prisma-user.repository.ts ***!
  \****************************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PrismaUserRepository = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const user_entity_1 = __webpack_require__(/*! ../../../domain/entities/user.entity */ "./src/domain/entities/user.entity.ts");
const prisma_service_1 = __webpack_require__(/*! ../prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const created = await this.prisma.user.create({
            data: {
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                role: user.role,
                ativo: user.ativo,
            },
        });
        return this.toDomain(created);
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        return user ? this.toDomain(user) : null;
    }
    async findByEmail(email) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        return user ? this.toDomain(user) : null;
    }
    async update(user) {
        const updated = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                nome: user.nome,
                email: user.email,
                role: user.role,
                ativo: user.ativo,
            },
        });
        return this.toDomain(updated);
    }
    async delete(id) {
        await this.prisma.user.delete({ where: { id } });
    }
    async findAll() {
        const users = await this.prisma.user.findMany();
        return users.map((u) => this.toDomain(u));
    }
    toDomain(prismaUser) {
        return new user_entity_1.User({
            nome: prismaUser.nome,
            email: prismaUser.email,
            senha: prismaUser.senha,
            role: prismaUser.role,
        }, prismaUser.id);
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], PrismaUserRepository);


/***/ },

/***/ "./src/infrastructure/logger/winston.config.ts"
/*!*****************************************************!*\
  !*** ./src/infrastructure/logger/winston.config.ts ***!
  \*****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.winstonConfig = void 0;
const winston = __importStar(__webpack_require__(/*! winston */ "winston"));
exports.winstonConfig = {
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.timestamp(), winston.format.colorize(), winston.format.printf(({ timestamp, level, message, context }) => {
                return `${timestamp} [${context}] ${level}: ${message}`;
            })),
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
        new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        }),
    ],
};


/***/ },

/***/ "./src/infrastructure/throttler/throttler.config.ts"
/*!**********************************************************!*\
  !*** ./src/infrastructure/throttler/throttler.config.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.throttlerConfig = void 0;
exports.throttlerConfig = {
    throttlers: [
        {
            ttl: 60000,
            limit: 100,
        },
    ],
};


/***/ },

/***/ "./src/infrastructure/upload/cloudinary.service.ts"
/*!*********************************************************!*\
  !*** ./src/infrastructure/upload/cloudinary.service.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CloudinaryService = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const cloudinary_1 = __webpack_require__(/*! cloudinary */ "cloudinary");
const config_1 = __webpack_require__(/*! @nestjs/config */ "@nestjs/config");
let CloudinaryService = class CloudinaryService {
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadImage(file) {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ folder: 'imoveis' }, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result.secure_url);
            }).end(file.buffer);
        });
    }
    async deleteImage(publicId) {
        await cloudinary_1.v2.uploader.destroy(publicId);
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], CloudinaryService);


/***/ },

/***/ "./src/infrastructure/websocket/notifications.gateway.ts"
/*!***************************************************************!*\
  !*** ./src/infrastructure/websocket/notifications.gateway.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationsGateway = void 0;
const websockets_1 = __webpack_require__(/*! @nestjs/websockets */ "@nestjs/websockets");
const socket_io_1 = __webpack_require__(/*! socket.io */ "socket.io");
let NotificationsGateway = class NotificationsGateway {
    handleConnection(client) {
        console.log(`🔌 Cliente conectado: ${client.id}`);
    }
    handleDisconnect(client) {
        console.log(`🔌 Cliente desconectado: ${client.id}`);
    }
    sendNotification(message, userId) {
        if (userId) {
            this.server.to(userId).emit('notification', { message });
        }
        else {
            this.server.emit('notification', { message });
        }
    }
    handleMessage(client, payload) {
        console.log(`📩 Mensagem recebida de ${client.id}:`, payload);
        return 'Mensagem recebida!';
    }
};
exports.NotificationsGateway = NotificationsGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _a : Object)
], NotificationsGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _b : Object, Object]),
    __metadata("design:returntype", String)
], NotificationsGateway.prototype, "handleMessage", null);
exports.NotificationsGateway = NotificationsGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], NotificationsGateway);


/***/ },

/***/ "./src/presentation/controllers/auth.controller.ts"
/*!*********************************************************!*\
  !*** ./src/presentation/controllers/auth.controller.ts ***!
  \*********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const register_dto_1 = __webpack_require__(/*! ../../application/dtos/auth/register.dto */ "./src/application/dtos/auth/register.dto.ts");
const login_dto_1 = __webpack_require__(/*! ../../application/dtos/auth/login.dto */ "./src/application/dtos/auth/login.dto.ts");
const register_use_case_1 = __webpack_require__(/*! ../../application/use-cases/auth/register.use-case */ "./src/application/use-cases/auth/register.use-case.ts");
const login_use_case_1 = __webpack_require__(/*! ../../application/use-cases/auth/login.use-case */ "./src/application/use-cases/auth/login.use-case.ts");
let AuthController = class AuthController {
    constructor(registerUseCase, loginUseCase) {
        this.registerUseCase = registerUseCase;
        this.loginUseCase = loginUseCase;
    }
    async register(dto) {
        const user = await this.registerUseCase.execute(dto);
        return {
            id: user.id,
            nome: user.nome,
            email: user.email,
            role: user.role,
        };
    }
    async login(dto) {
        return this.loginUseCase.execute(dto.email, dto.senha);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrar novo usuário' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Usuário criado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email já cadastrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof register_dto_1.RegisterDTO !== "undefined" && register_dto_1.RegisterDTO) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Login' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Login realizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Credenciais inválidas' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDTO !== "undefined" && login_dto_1.LoginDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [typeof (_a = typeof register_use_case_1.RegisterUseCase !== "undefined" && register_use_case_1.RegisterUseCase) === "function" ? _a : Object, typeof (_b = typeof login_use_case_1.LoginUseCase !== "undefined" && login_use_case_1.LoginUseCase) === "function" ? _b : Object])
], AuthController);


/***/ },

/***/ "./src/presentation/controllers/cliente.controller.ts"
/*!************************************************************!*\
  !*** ./src/presentation/controllers/cliente.controller.ts ***!
  \************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClienteController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const cliente_1 = __webpack_require__(/*! ../../application/use-cases/cliente */ "./src/application/use-cases/cliente/index.ts");
const cliente_2 = __webpack_require__(/*! ../../application/dtos/cliente */ "./src/application/dtos/cliente/index.ts");
let ClienteController = class ClienteController {
    constructor(createClienteUseCase, findClienteUseCase, updateClienteUseCase, deleteClienteUseCase, listClientesUseCase) {
        this.createClienteUseCase = createClienteUseCase;
        this.findClienteUseCase = findClienteUseCase;
        this.updateClienteUseCase = updateClienteUseCase;
        this.deleteClienteUseCase = deleteClienteUseCase;
        this.listClientesUseCase = listClientesUseCase;
    }
    async create(dto) {
        const cliente = await this.createClienteUseCase.execute(dto);
        return cliente_2.ClienteResponseDTO.fromEntity(cliente);
    }
    async findOne(id) {
        const cliente = await this.findClienteUseCase.execute(id);
        return cliente_2.ClienteResponseDTO.fromEntity(cliente);
    }
    async findAll(query) {
        const filters = {
            ativo: query.ativo !== undefined ? query.ativo === 'true' : undefined,
            tipoInteresse: query.tipoInteresse,
            cidade: query.cidade,
            estado: query.estado,
            valorMinimo: query.valorMinimo ? Number(query.valorMinimo) : undefined,
            valorMaximo: query.valorMaximo ? Number(query.valorMaximo) : undefined,
            search: query.search,
        };
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;
        const sort = query.sortField
            ? {
                field: query.sortField,
                order: query.sortOrder || 'asc',
            }
            : undefined;
        const result = await this.listClientesUseCase.execute(filters, page, pageSize, sort);
        return {
            ...result,
            data: cliente_2.ClienteResponseDTO.fromEntityArray(result.data),
        };
    }
    async update(id, dto) {
        const cliente = await this.updateClienteUseCase.execute(id, dto);
        return cliente_2.ClienteResponseDTO.fromEntity(cliente);
    }
    async delete(id) {
        await this.deleteClienteUseCase.execute(id);
    }
};
exports.ClienteController = ClienteController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Cadastrar interesse (Público)', description: 'Cadastra um novo cliente interessado em imóveis (rota pública)' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Cliente criado com sucesso', type: cliente_2.ClienteResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email já cadastrado' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof cliente_2.CreateClienteDTO !== "undefined" && cliente_2.CreateClienteDTO) === "function" ? _f : Object]),
    __metadata("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], ClienteController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar cliente por ID', description: 'Retorna os dados de um cliente específico' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente (UUID)', example: '550e8400-e29b-41d4-a716-446655440000' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente encontrado', type: cliente_2.ClienteResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_h = typeof Promise !== "undefined" && Promise) === "function" ? _h : Object)
], ClienteController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar clientes', description: 'Lista clientes com filtros, paginação e ordenação' }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, description: 'Número da página', example: 1 }),
    (0, swagger_1.ApiQuery)({ name: 'pageSize', required: false, description: 'Itens por página', example: 10 }),
    (0, swagger_1.ApiQuery)({ name: 'cidade', required: false, description: 'Filtrar por cidade', example: 'São Paulo' }),
    (0, swagger_1.ApiQuery)({ name: 'ativo', required: false, description: 'Filtrar por status ativo', example: true }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, description: 'Buscar por nome ou email' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de clientes retornada com sucesso' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClienteController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar cliente', description: 'Atualiza dados de um cliente existente' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente (UUID)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cliente atualizado com sucesso', type: cliente_2.ClienteResponseDTO }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dados inválidos' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente não encontrado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Email já em uso por outro cliente' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_j = typeof cliente_2.UpdateClienteDTO !== "undefined" && cliente_2.UpdateClienteDTO) === "function" ? _j : Object]),
    __metadata("design:returntype", typeof (_k = typeof Promise !== "undefined" && Promise) === "function" ? _k : Object)
], ClienteController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar cliente', description: 'Remove um cliente permanentemente do sistema' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID do cliente (UUID)' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Cliente deletado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Cliente não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", typeof (_l = typeof Promise !== "undefined" && Promise) === "function" ? _l : Object)
], ClienteController.prototype, "delete", null);
exports.ClienteController = ClienteController = __decorate([
    (0, swagger_1.ApiTags)('clientes'),
    (0, common_1.Controller)('clientes'),
    __metadata("design:paramtypes", [typeof (_a = typeof cliente_1.CreateClienteUseCase !== "undefined" && cliente_1.CreateClienteUseCase) === "function" ? _a : Object, typeof (_b = typeof cliente_1.FindClienteUseCase !== "undefined" && cliente_1.FindClienteUseCase) === "function" ? _b : Object, typeof (_c = typeof cliente_1.UpdateClienteUseCase !== "undefined" && cliente_1.UpdateClienteUseCase) === "function" ? _c : Object, typeof (_d = typeof cliente_1.DeleteClienteUseCase !== "undefined" && cliente_1.DeleteClienteUseCase) === "function" ? _d : Object, typeof (_e = typeof cliente_1.ListClientesUseCase !== "undefined" && cliente_1.ListClientesUseCase) === "function" ? _e : Object])
], ClienteController);


/***/ },

/***/ "./src/presentation/controllers/dashboard.controller.ts"
/*!**************************************************************!*\
  !*** ./src/presentation/controllers/dashboard.controller.ts ***!
  \**************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DashboardController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const get_dashboard_stats_use_case_1 = __webpack_require__(/*! ../../application/use-cases/dashboard/get-dashboard-stats.use-case */ "./src/application/use-cases/dashboard/get-dashboard-stats.use-case.ts");
let DashboardController = class DashboardController {
    constructor(getDashboardStatsUseCase) {
        this.getDashboardStatsUseCase = getDashboardStatsUseCase;
    }
    async getStats() {
        return this.getDashboardStatsUseCase.execute();
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('stats'),
    (0, swagger_1.ApiOperation)({ summary: 'Estatísticas do Dashboard' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Estatísticas completas retornadas' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getStats", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('dashboard'),
    __metadata("design:paramtypes", [typeof (_a = typeof get_dashboard_stats_use_case_1.GetDashboardStatsUseCase !== "undefined" && get_dashboard_stats_use_case_1.GetDashboardStatsUseCase) === "function" ? _a : Object])
], DashboardController);


/***/ },

/***/ "./src/presentation/controllers/imovel.controller.ts"
/*!***********************************************************!*\
  !*** ./src/presentation/controllers/imovel.controller.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImovelController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const create_imovel_dto_1 = __webpack_require__(/*! ../../application/dtos/imovel/create-imovel.dto */ "./src/application/dtos/imovel/create-imovel.dto.ts");
const update_imovel_dto_1 = __webpack_require__(/*! ../../application/dtos/imovel/update-imovel.dto */ "./src/application/dtos/imovel/update-imovel.dto.ts");
const imovel_response_dto_1 = __webpack_require__(/*! ../../application/dtos/imovel/imovel-response.dto */ "./src/application/dtos/imovel/imovel-response.dto.ts");
const create_imovel_use_case_1 = __webpack_require__(/*! ../../application/use-cases/imovel/create-imovel.use-case */ "./src/application/use-cases/imovel/create-imovel.use-case.ts");
const list_imoveis_use_case_1 = __webpack_require__(/*! ../../application/use-cases/imovel/list-imoveis.use-case */ "./src/application/use-cases/imovel/list-imoveis.use-case.ts");
let ImovelController = class ImovelController {
    constructor(createImovelUseCase, listImoveisUseCase) {
        this.createImovelUseCase = createImovelUseCase;
        this.listImoveisUseCase = listImoveisUseCase;
    }
    async create(dto) {
        return this.createImovelUseCase.execute(dto);
    }
    async findAll(query) {
        const filters = {
            cidade: query.cidade,
            estado: query.estado,
            bairro: query.bairro,
            operacao: query.operacao,
            tipoImovel: query.tipoImovel,
            valorMinimo: query.valorMinimo ? Number(query.valorMinimo) : undefined,
            valorMaximo: query.valorMaximo ? Number(query.valorMaximo) : undefined,
            quartosMinimo: query.quartosMinimo ? Number(query.quartosMinimo) : undefined,
            vagasMinimo: query.vagasMinimo ? Number(query.vagasMinimo) : undefined,
            publicado: query.publicado !== undefined ? query.publicado === 'true' : undefined,
            search: query.search,
        };
        const page = query.page ? Number(query.page) : 1;
        const pageSize = query.pageSize ? Number(query.pageSize) : 10;
        const result = await this.listImoveisUseCase.execute(filters, page, pageSize);
        return {
            ...result,
            data: imovel_response_dto_1.ImovelResponseDTO.fromEntityArray(result.data),
        };
    }
    async findOne(id) {
        return { message: 'Buscar imóvel - implementar' };
    }
    async update(id, dto) {
        return { message: 'Atualizar imóvel - implementar' };
    }
    async delete(id) {
        return { message: 'Deletar imóvel - implementar' };
    }
};
exports.ImovelController = ImovelController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar novo imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Imóvel criado com sucesso' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof create_imovel_dto_1.CreateImovelDTO !== "undefined" && create_imovel_dto_1.CreateImovelDTO) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar imóveis' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar imóvel por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar imóvel' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeof (_d = typeof update_imovel_dto_1.UpdateImovelDTO !== "undefined" && update_imovel_dto_1.UpdateImovelDTO) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar imóvel' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ImovelController.prototype, "delete", null);
exports.ImovelController = ImovelController = __decorate([
    (0, swagger_1.ApiTags)('imoveis'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('imoveis'),
    __metadata("design:paramtypes", [typeof (_a = typeof create_imovel_use_case_1.CreateImovelUseCase !== "undefined" && create_imovel_use_case_1.CreateImovelUseCase) === "function" ? _a : Object, typeof (_b = typeof list_imoveis_use_case_1.ListImoveisUseCase !== "undefined" && list_imoveis_use_case_1.ListImoveisUseCase) === "function" ? _b : Object])
], ImovelController);


/***/ },

/***/ "./src/presentation/controllers/match.controller.ts"
/*!**********************************************************!*\
  !*** ./src/presentation/controllers/match.controller.ts ***!
  \**********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const find_matches_for_imovel_use_case_1 = __webpack_require__(/*! ../../application/use-cases/match/find-matches-for-imovel.use-case */ "./src/application/use-cases/match/find-matches-for-imovel.use-case.ts");
let MatchController = class MatchController {
    constructor(findMatchesUseCase) {
        this.findMatchesUseCase = findMatchesUseCase;
    }
    async findMatchesForImovel(id) {
        return {
            message: 'Buscar matches para imóvel - implementar busca do imóvel primeiro',
        };
    }
};
exports.MatchController = MatchController;
__decorate([
    (0, common_1.Get)('imovel/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar clientes compatíveis com imóvel' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de clientes que deram match' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MatchController.prototype, "findMatchesForImovel", null);
exports.MatchController = MatchController = __decorate([
    (0, swagger_1.ApiTags)('matches'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('matches'),
    __metadata("design:paramtypes", [typeof (_a = typeof find_matches_for_imovel_use_case_1.FindMatchesForImovelUseCase !== "undefined" && find_matches_for_imovel_use_case_1.FindMatchesForImovelUseCase) === "function" ? _a : Object])
], MatchController);


/***/ },

/***/ "./src/presentation/controllers/negociacao.controller.ts"
/*!***************************************************************!*\
  !*** ./src/presentation/controllers/negociacao.controller.ts ***!
  \***************************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NegociacaoController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const prisma_service_1 = __webpack_require__(/*! ../../infrastructure/database/prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let NegociacaoController = class NegociacaoController {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(query) {
        const { clienteId, imovelId, etapa, page = 1, limit = 50 } = query;
        const where = {};
        if (clienteId)
            where.clienteId = clienteId;
        if (imovelId)
            where.imovelId = imovelId;
        if (etapa)
            where.etapa = etapa;
        const [negociacoes, total] = await Promise.all([
            this.prisma.negociacao.findMany({
                where,
                include: {
                    cliente: { select: { id: true, nome: true, email: true, telefone: true } },
                    imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } },
                    atividades: {
                        orderBy: { createdAt: 'desc' },
                        take: 5
                    }
                },
                skip: (Number(page) - 1) * Number(limit),
                take: Number(limit),
                orderBy: { updatedAt: 'desc' }
            }),
            this.prisma.negociacao.count({ where })
        ]);
        return {
            data: negociacoes,
            meta: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit))
            }
        };
    }
    async findOne(id) {
        return this.prisma.negociacao.findUnique({
            where: { id },
            include: {
                cliente: { select: { id: true, nome: true, email: true, telefone: true, telefoneWhatsapp: true } },
                imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true, operacao: true, tipoImovel: true } },
                atividades: {
                    orderBy: { createdAt: 'desc' }
                }
            }
        });
    }
    async create(data) {
        console.log('🔍 Dados recebidos para criar negociação:', data);
        try {
            const result = await this.prisma.negociacao.create({
                data: {
                    clienteId: data.clienteId,
                    imovelId: data.imovelId,
                    responsavelId: data.responsavelId,
                    etapa: data.etapa || 'CONTATO_INICIAL',
                    percentualMatch: data.percentualMatch || 0,
                    valorProposta: data.valorProposta ? String(data.valorProposta) : null,
                    observacoes: data.observacoes,
                    status: data.status || 'ATIVA'
                },
                include: {
                    cliente: { select: { id: true, nome: true, email: true, telefone: true } },
                    imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } }
                }
            });
            console.log('✅ Negociação criada com sucesso:', result.id);
            return result;
        }
        catch (error) {
            console.error('❌ Erro ao criar negociação:', error.message);
            console.error('Stack:', error.stack);
            throw error;
        }
    }
    async update(id, data) {
        return this.prisma.negociacao.update({
            where: { id },
            data: {
                etapa: data.etapa,
                percentualMatch: data.percentualMatch,
                valorProposta: data.valorProposta ? String(data.valorProposta) : undefined,
                observacoes: data.observacoes,
                status: data.status,
                dataFechamento: data.dataFechamento,
                motivoPerda: data.motivoPerda
            },
            include: {
                cliente: { select: { id: true, nome: true, email: true, telefone: true } },
                imovel: { select: { id: true, titulo: true, cidade: true, bairro: true, valor: true } }
            }
        });
    }
    async delete(id) {
        await this.prisma.atividade.deleteMany({ where: { negociacaoId: id } });
        return this.prisma.negociacao.delete({ where: { id } });
    }
    async getAtividades(negociacaoId) {
        return this.prisma.atividade.findMany({
            where: { negociacaoId },
            orderBy: { createdAt: 'desc' }
        });
    }
    async addAtividade(negociacaoId, data) {
        const atividade = await this.prisma.atividade.create({
            data: {
                negociacaoId,
                tipo: data.tipo,
                descricao: data.descricao,
                dataAgendada: data.dataAgendada ? new Date(data.dataAgendada) : null,
                status: data.status || 'PENDENTE',
                resultado: data.resultado,
                observacoes: data.observacoes
            }
        });
        await this.prisma.negociacao.update({
            where: { id: negociacaoId },
            data: { updatedAt: new Date() }
        });
        return atividade;
    }
    async updateAtividade(id, data) {
        return this.prisma.atividade.update({
            where: { id },
            data: {
                tipo: data.tipo,
                descricao: data.descricao,
                dataAgendada: data.dataAgendada ? new Date(data.dataAgendada) : undefined,
                status: data.status,
                resultado: data.resultado,
                observacoes: data.observacoes
            }
        });
    }
    async deleteAtividade(id) {
        return this.prisma.atividade.delete({ where: { id } });
    }
    async getPipelineStats() {
        const porEtapa = await this.prisma.negociacao.groupBy({
            by: ['etapa'],
            _count: { id: true },
            _avg: { percentualMatch: true }
        });
        const porStatus = await this.prisma.negociacao.groupBy({
            by: ['status'],
            _count: { id: true }
        });
        const totalAtividades = await this.prisma.atividade.count();
        const atividadesPendentes = await this.prisma.atividade.count({
            where: { status: 'PENDENTE', dataAgendada: { gte: new Date() } }
        });
        const atividadesAtrasadas = await this.prisma.atividade.count({
            where: {
                status: 'PENDENTE',
                dataAgendada: { lt: new Date() }
            }
        });
        return {
            porEtapa: porEtapa.map(e => ({
                etapa: e.etapa,
                quantidade: e._count.id,
                matchMedio: Math.round(e._avg.percentualMatch || 0)
            })),
            porStatus: porStatus.map(s => ({
                status: s.status,
                quantidade: s._count.id
            })),
            atividades: {
                total: totalAtividades,
                pendentes: atividadesPendentes,
                atrasadas: atividadesAtrasadas
            }
        };
    }
};
exports.NegociacaoController = NegociacaoController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as negociações' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de negociações' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar negociação por ID' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova negociação' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar negociação' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover negociação' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)(':id/atividades'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar atividades da negociação' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "getAtividades", null);
__decorate([
    (0, common_1.Post)(':id/atividades'),
    (0, swagger_1.ApiOperation)({ summary: 'Adicionar atividade à negociação' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "addAtividade", null);
__decorate([
    (0, common_1.Put)('atividades/:atividadeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar atividade' }),
    __param(0, (0, common_1.Param)('atividadeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "updateAtividade", null);
__decorate([
    (0, common_1.Delete)('atividades/:atividadeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Remover atividade' }),
    __param(0, (0, common_1.Param)('atividadeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "deleteAtividade", null);
__decorate([
    (0, common_1.Get)('stats/pipeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Estatísticas do pipeline' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NegociacaoController.prototype, "getPipelineStats", null);
exports.NegociacaoController = NegociacaoController = __decorate([
    (0, swagger_1.ApiTags)('negociacoes'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('negociacoes'),
    __metadata("design:paramtypes", [typeof (_a = typeof prisma_service_1.PrismaService !== "undefined" && prisma_service_1.PrismaService) === "function" ? _a : Object])
], NegociacaoController);


/***/ },

/***/ "./src/presentation/controllers/upload.controller.ts"
/*!***********************************************************!*\
  !*** ./src/presentation/controllers/upload.controller.ts ***!
  \***********************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadController = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const platform_express_1 = __webpack_require__(/*! @nestjs/platform-express */ "@nestjs/platform-express");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const jwt_auth_guard_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt-auth.guard */ "./src/infrastructure/auth/jwt-auth.guard.ts");
const cloudinary_service_1 = __webpack_require__(/*! ../../infrastructure/upload/cloudinary.service */ "./src/infrastructure/upload/cloudinary.service.ts");
let UploadController = class UploadController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImage(file) {
        const url = await this.cloudinaryService.uploadImage(file);
        return { url };
    }
};
exports.UploadController = UploadController;
__decorate([
    (0, common_1.Post)('image'),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "uploadImage", null);
exports.UploadController = UploadController = __decorate([
    (0, swagger_1.ApiTags)('upload'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('upload'),
    __metadata("design:paramtypes", [typeof (_a = typeof cloudinary_service_1.CloudinaryService !== "undefined" && cloudinary_service_1.CloudinaryService) === "function" ? _a : Object])
], UploadController);


/***/ },

/***/ "./src/presentation/modules/auth.module.ts"
/*!*************************************************!*\
  !*** ./src/presentation/modules/auth.module.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const jwt_1 = __webpack_require__(/*! @nestjs/jwt */ "@nestjs/jwt");
const passport_1 = __webpack_require__(/*! @nestjs/passport */ "@nestjs/passport");
const auth_controller_1 = __webpack_require__(/*! ../controllers/auth.controller */ "./src/presentation/controllers/auth.controller.ts");
const register_use_case_1 = __webpack_require__(/*! ../../application/use-cases/auth/register.use-case */ "./src/application/use-cases/auth/register.use-case.ts");
const login_use_case_1 = __webpack_require__(/*! ../../application/use-cases/auth/login.use-case */ "./src/application/use-cases/auth/login.use-case.ts");
const jwt_strategy_1 = __webpack_require__(/*! ../../infrastructure/auth/jwt.strategy */ "./src/infrastructure/auth/jwt.strategy.ts");
const database_module_1 = __webpack_require__(/*! ../../infrastructure/database/database.module */ "./src/infrastructure/database/database.module.ts");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || 'secret-key-change-in-production',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [
            auth_controller_1.AuthController,
        ],
        providers: [
            register_use_case_1.RegisterUseCase,
            login_use_case_1.LoginUseCase,
            jwt_strategy_1.JwtStrategy,
        ],
        exports: [
            jwt_1.JwtModule,
        ],
    })
], AuthModule);


/***/ },

/***/ "./src/presentation/modules/cliente.module.ts"
/*!****************************************************!*\
  !*** ./src/presentation/modules/cliente.module.ts ***!
  \****************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClienteModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_module_1 = __webpack_require__(/*! ../../infrastructure/database/database.module */ "./src/infrastructure/database/database.module.ts");
const cliente_controller_1 = __webpack_require__(/*! ../controllers/cliente.controller */ "./src/presentation/controllers/cliente.controller.ts");
const cliente_1 = __webpack_require__(/*! ../../application/use-cases/cliente */ "./src/application/use-cases/cliente/index.ts");
let ClienteModule = class ClienteModule {
};
exports.ClienteModule = ClienteModule;
exports.ClienteModule = ClienteModule = __decorate([
    (0, common_1.Module)({
        imports: [
            database_module_1.DatabaseModule,
        ],
        controllers: [
            cliente_controller_1.ClienteController,
        ],
        providers: [
            cliente_1.CreateClienteUseCase,
            cliente_1.FindClienteUseCase,
            cliente_1.UpdateClienteUseCase,
            cliente_1.DeleteClienteUseCase,
            cliente_1.ListClientesUseCase,
        ],
        exports: [],
    })
], ClienteModule);


/***/ },

/***/ "./src/presentation/modules/imovel.module.ts"
/*!***************************************************!*\
  !*** ./src/presentation/modules/imovel.module.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ImovelModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_module_1 = __webpack_require__(/*! ../../infrastructure/database/database.module */ "./src/infrastructure/database/database.module.ts");
const imovel_controller_1 = __webpack_require__(/*! ../controllers/imovel.controller */ "./src/presentation/controllers/imovel.controller.ts");
const create_imovel_use_case_1 = __webpack_require__(/*! ../../application/use-cases/imovel/create-imovel.use-case */ "./src/application/use-cases/imovel/create-imovel.use-case.ts");
const list_imoveis_use_case_1 = __webpack_require__(/*! ../../application/use-cases/imovel/list-imoveis.use-case */ "./src/application/use-cases/imovel/list-imoveis.use-case.ts");
let ImovelModule = class ImovelModule {
};
exports.ImovelModule = ImovelModule;
exports.ImovelModule = ImovelModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [imovel_controller_1.ImovelController],
        providers: [
            create_imovel_use_case_1.CreateImovelUseCase,
            list_imoveis_use_case_1.ListImoveisUseCase,
        ],
    })
], ImovelModule);


/***/ },

/***/ "./src/presentation/modules/match.module.ts"
/*!**************************************************!*\
  !*** ./src/presentation/modules/match.module.ts ***!
  \**************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MatchModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const database_module_1 = __webpack_require__(/*! ../../infrastructure/database/database.module */ "./src/infrastructure/database/database.module.ts");
const match_controller_1 = __webpack_require__(/*! ../controllers/match.controller */ "./src/presentation/controllers/match.controller.ts");
const find_matches_for_imovel_use_case_1 = __webpack_require__(/*! ../../application/use-cases/match/find-matches-for-imovel.use-case */ "./src/application/use-cases/match/find-matches-for-imovel.use-case.ts");
let MatchModule = class MatchModule {
};
exports.MatchModule = MatchModule;
exports.MatchModule = MatchModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [match_controller_1.MatchController],
        providers: [find_matches_for_imovel_use_case_1.FindMatchesForImovelUseCase],
    })
], MatchModule);


/***/ },

/***/ "./src/presentation/modules/negociacao.module.ts"
/*!*******************************************************!*\
  !*** ./src/presentation/modules/negociacao.module.ts ***!
  \*******************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NegociacaoModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const negociacao_controller_1 = __webpack_require__(/*! ../controllers/negociacao.controller */ "./src/presentation/controllers/negociacao.controller.ts");
const prisma_service_1 = __webpack_require__(/*! ../../infrastructure/database/prisma/prisma.service */ "./src/infrastructure/database/prisma/prisma.service.ts");
let NegociacaoModule = class NegociacaoModule {
};
exports.NegociacaoModule = NegociacaoModule;
exports.NegociacaoModule = NegociacaoModule = __decorate([
    (0, common_1.Module)({
        controllers: [negociacao_controller_1.NegociacaoController],
        providers: [prisma_service_1.PrismaService],
    })
], NegociacaoModule);


/***/ },

/***/ "./src/presentation/modules/upload.module.ts"
/*!***************************************************!*\
  !*** ./src/presentation/modules/upload.module.ts ***!
  \***************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const upload_controller_1 = __webpack_require__(/*! ../controllers/upload.controller */ "./src/presentation/controllers/upload.controller.ts");
const cloudinary_service_1 = __webpack_require__(/*! ../../infrastructure/upload/cloudinary.service */ "./src/infrastructure/upload/cloudinary.service.ts");
let UploadModule = class UploadModule {
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = __decorate([
    (0, common_1.Module)({
        controllers: [upload_controller_1.UploadController],
        providers: [cloudinary_service_1.CloudinaryService],
        exports: [cloudinary_service_1.CloudinaryService],
    })
], UploadModule);


/***/ },

/***/ "./src/shared/enums/tipo-interesse.enum.ts"
/*!*************************************************!*\
  !*** ./src/shared/enums/tipo-interesse.enum.ts ***!
  \*************************************************/
(__unused_webpack_module, exports, __webpack_require__) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TipoInteresse = void 0;
exports.getTipoInteresseLabel = getTipoInteresseLabel;
exports.getOperacaoFromInteresse = getOperacaoFromInteresse;
exports.getAllTiposInteresse = getAllTiposInteresse;
exports.isValidTipoInteresse = isValidTipoInteresse;
var TipoInteresse;
(function (TipoInteresse) {
    TipoInteresse["COMPRAR"] = "COMPRAR";
    TipoInteresse["ALUGAR"] = "ALUGAR";
})(TipoInteresse || (exports.TipoInteresse = TipoInteresse = {}));
function getTipoInteresseLabel(tipo) {
    switch (tipo) {
        case TipoInteresse.COMPRAR:
            return 'Comprar';
        case TipoInteresse.ALUGAR:
            return 'Alugar';
        default:
            return tipo;
    }
}
function getOperacaoFromInteresse(interesse) {
    const { TipoOperacao } = __webpack_require__(/*! ./tipo-operacao.enum */ "./src/shared/enums/tipo-operacao.enum.ts");
    switch (interesse) {
        case TipoInteresse.COMPRAR:
            return TipoOperacao.VENDA;
        case TipoInteresse.ALUGAR:
            return TipoOperacao.ALUGUEL;
        default:
            return interesse;
    }
}
function getAllTiposInteresse() {
    return Object.values(TipoInteresse);
}
function isValidTipoInteresse(value) {
    return getAllTiposInteresse().includes(value);
}


/***/ },

/***/ "./src/shared/enums/tipo-operacao.enum.ts"
/*!************************************************!*\
  !*** ./src/shared/enums/tipo-operacao.enum.ts ***!
  \************************************************/
(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TipoOperacao = void 0;
exports.getTipoOperacaoLabel = getTipoOperacaoLabel;
exports.getAllTiposOperacao = getAllTiposOperacao;
exports.isValidTipoOperacao = isValidTipoOperacao;
var TipoOperacao;
(function (TipoOperacao) {
    TipoOperacao["VENDA"] = "VENDA";
    TipoOperacao["ALUGUEL"] = "ALUGUEL";
})(TipoOperacao || (exports.TipoOperacao = TipoOperacao = {}));
function getTipoOperacaoLabel(operacao) {
    switch (operacao) {
        case TipoOperacao.VENDA:
            return 'Venda';
        case TipoOperacao.ALUGUEL:
            return 'Aluguel';
        default:
            return operacao;
    }
}
function getAllTiposOperacao() {
    return Object.values(TipoOperacao);
}
function isValidTipoOperacao(value) {
    return getAllTiposOperacao().includes(value);
}


/***/ },

/***/ "@nestjs/cache-manager"
/*!****************************************!*\
  !*** external "@nestjs/cache-manager" ***!
  \****************************************/
(module) {

module.exports = require("@nestjs/cache-manager");

/***/ },

/***/ "@nestjs/common"
/*!*********************************!*\
  !*** external "@nestjs/common" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/common");

/***/ },

/***/ "@nestjs/config"
/*!*********************************!*\
  !*** external "@nestjs/config" ***!
  \*********************************/
(module) {

module.exports = require("@nestjs/config");

/***/ },

/***/ "@nestjs/core"
/*!*******************************!*\
  !*** external "@nestjs/core" ***!
  \*******************************/
(module) {

module.exports = require("@nestjs/core");

/***/ },

/***/ "@nestjs/jwt"
/*!******************************!*\
  !*** external "@nestjs/jwt" ***!
  \******************************/
(module) {

module.exports = require("@nestjs/jwt");

/***/ },

/***/ "@nestjs/mapped-types"
/*!***************************************!*\
  !*** external "@nestjs/mapped-types" ***!
  \***************************************/
(module) {

module.exports = require("@nestjs/mapped-types");

/***/ },

/***/ "@nestjs/passport"
/*!***********************************!*\
  !*** external "@nestjs/passport" ***!
  \***********************************/
(module) {

module.exports = require("@nestjs/passport");

/***/ },

/***/ "@nestjs/platform-express"
/*!*******************************************!*\
  !*** external "@nestjs/platform-express" ***!
  \*******************************************/
(module) {

module.exports = require("@nestjs/platform-express");

/***/ },

/***/ "@nestjs/swagger"
/*!**********************************!*\
  !*** external "@nestjs/swagger" ***!
  \**********************************/
(module) {

module.exports = require("@nestjs/swagger");

/***/ },

/***/ "@nestjs/throttler"
/*!************************************!*\
  !*** external "@nestjs/throttler" ***!
  \************************************/
(module) {

module.exports = require("@nestjs/throttler");

/***/ },

/***/ "@nestjs/websockets"
/*!*************************************!*\
  !*** external "@nestjs/websockets" ***!
  \*************************************/
(module) {

module.exports = require("@nestjs/websockets");

/***/ },

/***/ "@prisma/client"
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
(module) {

module.exports = require("@prisma/client");

/***/ },

/***/ "bcryptjs"
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
(module) {

module.exports = require("bcryptjs");

/***/ },

/***/ "class-validator"
/*!**********************************!*\
  !*** external "class-validator" ***!
  \**********************************/
(module) {

module.exports = require("class-validator");

/***/ },

/***/ "cloudinary"
/*!*****************************!*\
  !*** external "cloudinary" ***!
  \*****************************/
(module) {

module.exports = require("cloudinary");

/***/ },

/***/ "nest-winston"
/*!*******************************!*\
  !*** external "nest-winston" ***!
  \*******************************/
(module) {

module.exports = require("nest-winston");

/***/ },

/***/ "passport-jwt"
/*!*******************************!*\
  !*** external "passport-jwt" ***!
  \*******************************/
(module) {

module.exports = require("passport-jwt");

/***/ },

/***/ "socket.io"
/*!****************************!*\
  !*** external "socket.io" ***!
  \****************************/
(module) {

module.exports = require("socket.io");

/***/ },

/***/ "winston"
/*!**************************!*\
  !*** external "winston" ***!
  \**************************/
(module) {

module.exports = require("winston");

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(/*! @nestjs/core */ "@nestjs/core");
const common_1 = __webpack_require__(/*! @nestjs/common */ "@nestjs/common");
const swagger_1 = __webpack_require__(/*! @nestjs/swagger */ "@nestjs/swagger");
const app_module_1 = __webpack_require__(/*! ./app.module */ "./src/app.module.ts");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.enableCors({
        origin: process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials: true,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });
    const config = new swagger_1.DocumentBuilder()
        .setTitle('ImoveisMatch API')
        .setDescription('API REST para sistema de matching imobiliário com Clean Architecture')
        .setVersion('1.0')
        .addTag('clientes', 'Gerenciamento de clientes interessados em imóveis')
        .addTag('imoveis', 'Gerenciamento de imóveis disponíveis')
        .addTag('matches', 'Sistema de matching automático')
        .addTag('auth', 'Autenticação e autorização')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document, {
        customSiteTitle: 'ImoveisMatch API Docs',
        customfavIcon: 'https://nestjs.com/img/logo_text.svg',
        customCss: '.swagger-ui .topbar { display: none }',
    });
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log('');
    console.log('🎉 ========================================');
    console.log('🚀 SERVIDOR NESTJS RODANDO COM SUCESSO!');
    console.log('========================================');
    console.log('');
    console.log(`📡 URL: http://localhost:${port}`);
    console.log(`🗄️ Banco: MySQL (${process.env.DATABASE_URL?.split('@')[1]?.split('/')[0] || 'localhost:3306'})`);
    console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    console.log('');
    console.log('📚 ROTAS DISPONÍVEIS:');
    console.log(`   POST   http://localhost:${port}/clientes          → Criar cliente`);
    console.log(`   GET    http://localhost:${port}/clientes/:id      → Buscar cliente`);
    console.log(`   GET    http://localhost:${port}/clientes          → Listar clientes`);
    console.log(`   PATCH  http://localhost:${port}/clientes/:id      → Atualizar cliente`);
    console.log(`   DELETE http://localhost:${port}/clientes/:id      → Deletar cliente`);
    console.log('');
    console.log('📖 DOCUMENTAÇÃO:');
    console.log(`   🔗 Swagger UI: http://localhost:${port}/api/docs`);
    console.log('');
    console.log('✅ Pronto para receber requisições!');
    console.log('========================================');
    console.log('');
}
bootstrap();

})();

/******/ })()
;