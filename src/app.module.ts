// src/app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { mqtt } from './config';

@Module({
  imports: [
    MqttModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [mqtt],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
