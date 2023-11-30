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
import { MqttService } from 'src/mqtt/mqtt.service';

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

  constructor(private readonly mqttService: MqttService) {}

  handleConnection(client: Socket) {
    this.logger.log(`CLIENT ID CONNECTED: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`CLIENT ID DISCONNECTED: ${client.id}`);
  }

  @SubscribeMessage('air-moisture')
  sendAirMoistureDataToWeb(@MessageBody() data: string) {
    this.server.emit(subscriptions.airMoisture, data);
  }

  @SubscribeMessage('soil-moisture')
  sendSoilMoistureDataToWeb(@MessageBody() data: string) {
    this.server.emit(subscriptions.soilMoisture, data);
  }

  @SubscribeMessage('irrigator-status')
  sendIrrigatorStatusToWeb(@MessageBody() data: string) {
    this.server.emit(subscriptions.irrigationStatus, data);
  }

  @SubscribeMessage('irrigator-control')
  sendIrrigatorControlToMQTT(@MessageBody() data: string) {
    this.mqttService.publish(subscriptions.irrigationControl, data);
  }

  @SubscribeMessage('irrigator-action')
  sendIrrigatorActionToMQTT(@MessageBody() data: string) {
    this.mqttService.publish(subscriptions.irrigationAction, data);
  }

  @SubscribeMessage('temperature')
  sendTemperatureDataToWeb(@MessageBody() data: string) {
    this.server.emit(subscriptions.temperature, data);
  }

  @SubscribeMessage('luminosity')
  sendLuminosityDataToWeb(@MessageBody() data: string) {
    this.server.emit(subscriptions.luminosity, data);
  }
}
