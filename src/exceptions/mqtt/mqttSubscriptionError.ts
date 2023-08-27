import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttSubscriptionError extends HttpException {
  constructor(topic: string, errorMessage: string) {
    super(
      `Error subscribing to topic ${topic}: ${errorMessage}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
