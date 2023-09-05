import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { MqttService } from 'src/mqtt/mqtt.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Module({
  controllers: [DataController],
  providers: [DataService, MqttService, WebsocketsGateway],
})
export class DataModule {}
