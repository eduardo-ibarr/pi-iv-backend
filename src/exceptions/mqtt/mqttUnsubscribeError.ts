import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttUnsubscribeError extends HttpException {
  constructor(topic: string, errorMessage: string) {
    super(
      `Error unsubscribing from topic ${topic}: ${errorMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
