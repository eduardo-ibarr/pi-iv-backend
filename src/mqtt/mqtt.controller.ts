import { Controller, Post, Body } from '@nestjs/common';
import { MqttService } from './mqtt.service';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post('publish')
  publishMessage(
    @Body('topic') topic: string,
    @Body('message') message: string,
  ) {
    this.mqttService.publish(topic, message);
    return 'Mensagem publicada com sucesso';
  }

  @Post('subscribe')
  subscribeToTopic(@Body('topic') topic: string) {
    this.mqttService.subscribe(topic);
    return `Inscrito no tópico: ${topic}`;
  }

  @Post('unsubscribe')
  unsubscribeOfTopic(@Body('topic') topic: string) {
    this.mqttService.unsubscribe(topic);
    return `Desinscrito no tópico: ${topic}`;
  }
}
