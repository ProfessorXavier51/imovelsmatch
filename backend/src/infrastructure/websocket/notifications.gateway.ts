// ============================================
// 📦 GATEWAY: notifications.gateway.ts
// ============================================
// 🎯 O QUE É?
// Gateway WebSocket para notificações em tempo real
//
// 📚 ANALOGIA: É como um WALKIE-TALKIE 📻
// - Comunicação instantânea e bidirecional
// - Servidor pode enviar mensagens a qualquer momento
// - Cliente recebe na hora (sem precisar ficar perguntando)
//
// 🤔 POR QUÊ WEBSOCKET?
// - Tempo real (ex: chat, notificações)
// - Mais eficiente que polling (ficar perguntando)
// - Conexão persistente (não fecha)
// - Bidirecional (cliente ↔ servidor)
//
// 💡 DIFERENÇA HTTP vs WEBSOCKET:
// - HTTP: Cliente pergunta → Servidor responde → Fecha
// - WebSocket: Conexão aberta → Mensagens a qualquer hora
// ============================================

import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

/**
 * 📻 GATEWAY: NotificationsGateway
 * 
 * 🎯 O QUE FAZ?
 * - Gerencia conexões WebSocket
 * - Envia notificações em tempo real
 * - Escuta eventos dos clientes
 * 
 * 📚 ANALOGIA: CENTRAL DE NOTIFICAÇÕES
 * - handleConnection() = Alguém se conectou
 * - handleDisconnect() = Alguém desconectou
 * - sendNotification() = Enviar notificação
 * 
 * 🔌 EVENTOS:
 * - connection = Cliente conectou
 * - disconnect = Cliente desconectou
 * - notification = Nova notificação
 * 
 * 💡 CASOS DE USO:
 * - Notificar novo match de imóvel
 * - Chat em tempo real
 * - Atualização de status
 * - Alertas importantes
 */
@WebSocketGateway({
  cors: {
    origin: '*', // Em produção, especifique o domínio
  },
})
export class NotificationsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  // ========================================
  // SERVIDOR WEBSOCKET
  // ========================================
  // 📡 Instância do servidor Socket.IO
  @WebSocketServer()
  server: Server;

  // ========================================
  // MÉTODO: handleConnection
  // ========================================
  
  /**
   * 🔌 MÉTODO: handleConnection
   * 
   * 🎯 O QUE FAZ?
   * - Executado quando um cliente se conecta
   * - Registra a conexão
   * - Pode autenticar o usuário
   * 
   * 📚 ANALOGIA: ALGUÉM ENTROU NA SALA
   * - Você anota quem entrou
   * - Pode verificar se tem permissão
   * - Dá boas-vindas
   * 
   * 📥 ENTRADA:
   * - client: Socket do cliente conectado
   *   - client.id = ID único da conexão
   *   - client.handshake = Dados da conexão
   * 
   * 💡 QUANDO ACONTECE?
   * - Cliente abre a página
   * - Cliente reconecta após queda
   * - Cliente faz refresh
   */
  handleConnection(client: Socket) {
    console.log(`🔌 Cliente conectado: ${client.id}`);
    
    // Pode autenticar aqui:
    // const token = client.handshake.auth.token;
    // if (!token) client.disconnect();
  }

  // ========================================
  // MÉTODO: handleDisconnect
  // ========================================
  
  /**
   * 🔌 MÉTODO: handleDisconnect
   * 
   * 🎯 O QUE FAZ?
   * - Executado quando um cliente se desconecta
   * - Limpa recursos
   * - Remove da lista de conectados
   * 
   * 📚 ANALOGIA: ALGUÉM SAIU DA SALA
   * - Você anota quem saiu
   * - Remove da lista de presença
   * - Libera recursos
   * 
   * 📥 ENTRADA:
   * - client: Socket do cliente desconectado
   * 
   * 💡 QUANDO ACONTECE?
   * - Cliente fecha a página
   * - Cliente perde conexão
   * - Cliente desconecta manualmente
   */
  handleDisconnect(client: Socket) {
    console.log(`🔌 Cliente desconectado: ${client.id}`);
  }

  // ========================================
  // MÉTODO: sendNotification
  // ========================================
  
  /**
   * 📨 MÉTODO: sendNotification
   * 
   * 🎯 O QUE FAZ?
   * - Envia notificação para todos os clientes
   * - Ou para um cliente específico
   * 
   * 📚 ANALOGIA: ANÚNCIO NO ALTO-FALANTE
   * - Você fala no microfone
   * - Todos ouvem ao mesmo tempo
   * - Instantâneo
   * 
   * 📥 ENTRADA:
   * - message: Mensagem a enviar
   * - userId?: ID do usuário (opcional)
   * 
   * 📤 SAÍDA:
   * - Emite evento 'notification' para clientes
   * 
   * 💡 EXEMPLOS:
   * - Novo match de imóvel
   * - Mensagem de chat
   * - Atualização de status
   */
  sendNotification(message: string, userId?: string) {
    if (userId) {
      // Envia para um usuário específico
      // (precisa mapear userId → socketId)
      this.server.to(userId).emit('notification', { message });
    } else {
      // Envia para todos
      this.server.emit('notification', { message });
    }
  }

  // ========================================
  // EVENTO: handleMessage
  // ========================================
  
  /**
   * 📩 EVENTO: handleMessage
   * 
   * 🎯 O QUE FAZ?
   * - Escuta mensagens do cliente
   * - Processa e responde
   * 
   * 📚 ANALOGIA: RECEBER MENSAGEM
   * - Cliente envia mensagem
   * - Servidor processa
   * - Servidor responde
   * 
   * 📥 ENTRADA:
   * - client: Socket do cliente
   * - payload: Dados enviados
   * 
   * 📤 SAÍDA:
   * - Resposta para o cliente
   */
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    console.log(`📩 Mensagem recebida de ${client.id}:`, payload);
    return 'Mensagem recebida!';
  }
}

// ============================================
// 📝 EXEMPLO DE USO NO FRONTEND:
// ============================================
// 
// import { io } from 'socket.io-client';
//
// // Conectar ao WebSocket
// const socket = io('http://localhost:3001');
//
// // Escutar notificações
// socket.on('notification', (data) => {
//   console.log('Nova notificação:', data.message);
//   // Mostrar toast, popup, etc
// });
//
// // Enviar mensagem
// socket.emit('message', { text: 'Olá!' });
//
// // Desconectar
// socket.disconnect();
// ============================================

// ============================================
// 📝 EXEMPLO DE USO NO BACKEND:
// ============================================
// 
// // No service:
// constructor(
//   private notificationsGateway: NotificationsGateway
// ) {}
//
// // Enviar notificação:
// async notifyNewMatch(clienteId: string, imovel: Imovel) {
//   const message = `Novo imóvel encontrado: ${imovel.titulo}`;
//   this.notificationsGateway.sendNotification(message, clienteId);
// }
// ============================================
