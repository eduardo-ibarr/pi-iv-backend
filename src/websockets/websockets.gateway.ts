import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { subscriptions } from 'src/config/constants/subscriptions';
import { Sensor } from './entity/sensor';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class WebsocketsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  private server: Server;
  private logger = new Logger(WebsocketsGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`CLIENT ID CONNECTED: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`CLIENT ID DISCONNECTED: ${client.id}`);
  }

  @SubscribeMessage('air-moisture')
  sendAirMoistureDataToWeb(@MessageBody() data: Sensor) {
    this.logger.log(`Sending message to ${subscriptions.airMoisture}...`);
    this.server.emit(subscriptions.airMoisture, data);
  }

  @SubscribeMessage('soil-moisture')
  sendSoilMoistureDataToWeb(@MessageBody() data: Sensor) {
    this.logger.log(`Sending message to ${subscriptions.soilMoisture}...`);
    this.server.emit(subscriptions.soilMoisture, data);
  }

  @SubscribeMessage('temperature')
  sendTemperatureDataToWeb(@MessageBody() data: Sensor) {
    this.logger.log(`Sending message to ${subscriptions.temperature}...`);
    this.server.emit(subscriptions.temperature, data);
  }
}
