import { ChatDto } from '@/Core/Models/Chat/chat.dto';
import { ChatRequest } from '@/Core/Models/Chat/chat.request';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(1001,{
  cors: {
    origin: '*',
  }  
})
export class ChatGatewayGateway 
implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer() server: Server;
  private _Chat:ChatDto[] = [];

  afterInit(server: any) {
    // console.log('Method not implemented.');
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.server.emit('messages', this._Chat);

    // console.log('Method not implemented.');
  }

  handleDisconnect(client: Socket) {
    console.log("disconnect client" + client.id);
    console.log('Method not implemented.');
  }
  
  @SubscribeMessage('message')
  async handleMessage(client: Socket, chatMessage: ChatRequest): Promise<void> {
    const payload: ChatDto = {
      coduser: chatMessage.coduser,
      nameuser: chatMessage.nameuser,
      message: chatMessage.message,
      date: new Date().toLocaleString()
    };
    this._Chat = [...this._Chat, payload];
    this.server.emit('newMessage', payload);

    // return 'Hello world!';
  }


}
