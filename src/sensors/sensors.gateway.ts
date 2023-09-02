import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayDisconnect,
  OnGatewayConnection,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
  namespace: 'sensors',
  cors: {
    origin: '*',
  },
})
export class SensorsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(client.id);
  }

  handleDisconnect(client: Socket) {
    console.log(client.id);
  }

  @SubscribeMessage('sensors')
  handleSensors(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(client.id, data);
    this.server.emit('sensors', data);
  }
}
