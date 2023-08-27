import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttConnectionError extends HttpException {
  constructor(errorMessage: string) {
    super(
      `Error connecting to MQTT broker: ${errorMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
