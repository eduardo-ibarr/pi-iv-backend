import { Module } from '@nestjs/common';
import { MqttController } from './mqtt.controller';
import { MqttService } from './mqtt.service';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { BasicStrategy } from 'src/auth/auth.strategy';

@Module({
  imports: [ConfigModule, PassportModule],
  controllers: [MqttController],
  providers: [MqttService, AuthService, BasicStrategy],
})
export class MqttModule {}
