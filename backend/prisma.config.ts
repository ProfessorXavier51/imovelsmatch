// ============================================
// PRISMA CONFIG - Configuração do Prisma 7
// ============================================
//
// 🎯 O QUE ESTE ARQUIVO FAZ?
// Define a URL de conexão com o banco de dados
//
// 📚 ANALOGIA: É como o ENDEREÇO DA SUA CASA
// - O Prisma precisa saber onde fica o banco de dados
// - É como dar o endereço para o entregador encontrar sua casa
//
// 💡 NOVIDADE DO PRISMA 7:
// Antes: URL ficava no schema.prisma
// Agora: URL fica neste arquivo separado
// Por quê? Mais seguro e flexível
//
// ============================================

// 🔌 URL de conexão com o banco MySQL
// 
// 📝 FORMATO:
// mysql://usuario:senha@host:porta/nome_banco
//
// 📚 ANALOGIA: É como um ENDEREÇO COMPLETO
// - usuario = Seu nome (quem está entrando)
// - senha = Sua chave (para abrir a porta)
// - host = Rua (onde fica o banco)
// - porta = Número da casa (geralmente 3306 para MySQL)
// - nome_banco = Apartamento (qual banco usar)
//
// 🔒 SEGURANÇA:
// Pegamos do .env para não expor a senha no código
export const config = {
  datasourceUrl: process.env.DATABASE_URL,
};
