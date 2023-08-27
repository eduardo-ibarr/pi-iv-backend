import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('publish')
  @UseGuards(AuthGuard('basic'))
  publishMessage(
    @Body('topic') topic: string,
    @Body('message') message: string,
  ) {
    this.mqttService.publish(topic, message);
    return 'Mensagem publicada com sucesso';
  }

  @Post('subscribe')
  @UseGuards(AuthGuard('basic'))
  subscribeToTopic(@Body('topic') topic: string) {
    this.mqttService.subscribe(topic);
    return `Inscrito no tópico: ${topic}`;
  }

  @Post('unsubscribe')
  @UseGuards(AuthGuard('basic'))
  unsubscribeOfTopic(@Body('topic') topic: string) {
    this.mqttService.unsubscribe(topic);
    return `Desinscrito no tópico: ${topic}`;
  }
}
