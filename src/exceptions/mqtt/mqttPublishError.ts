import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttPublishError extends HttpException {
  constructor(topic: string, errorMessage: string) {
    super(
      `Error publishing message to topic ${topic}: ${errorMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
