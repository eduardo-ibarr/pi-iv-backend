import { HttpException, HttpStatus } from '@nestjs/common';

export class MqttUpdateSubscriptionsError extends HttpException {
  constructor(errorMessage: string) {
    super(
      `Error updating and saving subscriptions: ${errorMessage}`,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
