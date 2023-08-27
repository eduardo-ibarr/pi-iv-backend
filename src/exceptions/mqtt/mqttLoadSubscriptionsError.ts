import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttLoadSubscriptionsError extends HttpException {
  constructor(errorMessage: string) {
    super(
      `Error loading the saved subscriptions: ${errorMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
