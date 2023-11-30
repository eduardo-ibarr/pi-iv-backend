import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { auth, mqtt } from './config';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { WebsocketsModule } from './websockets/websockets.module';
import { PrismaService } from './prisma/prisma.service';
import { ReadingsModule } from './readings/readings.module';

@Module({
  imports: [
    MqttModule,
    ReadingsModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [mqtt, auth],
    }),
    AuthModule,
    DataModule,
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [PrismaService],
})
export class AppModule {}
