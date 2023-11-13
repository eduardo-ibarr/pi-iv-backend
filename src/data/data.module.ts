import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { MqttService } from 'src/mqtt/mqtt.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';
import { ReadingsService } from 'src/readings/readings.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DataController],
  providers: [
    DataService,
    MqttService,
    WebsocketsGateway,
    ReadingsService,
    PrismaService,
  ],
})
export class DataModule {}
