import { Module } from '@nestjs/common';
import { WebsocketsGateway } from './websockets.gateway';
import { MqttModule } from 'src/mqtt/mqtt.module';

@Module({
  imports: [MqttModule],
  providers: [WebsocketsGateway],
})
export class WebsocketsModule {}
