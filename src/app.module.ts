import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqttModule } from './mqtt/mqtt.module';
import { ConfigModule } from '@nestjs/config';
import { auth, mqtt } from './config';
import { AuthModule } from './auth/auth.module';
import { DataModule } from './data/data.module';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    MqttModule,
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
})
export class AppModule {}
