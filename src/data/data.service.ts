import { Injectable, Logger } from '@nestjs/common';
import { subscriptions } from 'src/config/constants/subscriptions';
import { MqttService } from 'src/mqtt/mqtt.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Injectable()
export class DataService {
  private readonly logger = new Logger(DataService.name);

  constructor(
    private readonly mqttService: MqttService,
    private readonly websocketGateway: WebsocketsGateway,
  ) {
    this.handleAirMoistureSensorData();
    this.handleSoilMoistureSensorData();
    this.handleTemperatureSensorData();
  }

  private handleAirMoistureSensorData(): void {
    this.mqttService.subscribe(subscriptions.airMoisture, (data) => {
      this.websocketGateway.sendAirMoistureDataToWeb(data);
    });
  }

  private handleSoilMoistureSensorData(): void {
    this.mqttService.subscribe(subscriptions.soilMoisture, (data) => {
      this.websocketGateway.sendSoilMoistureDataToWeb(data);
    });
  }

  private handleTemperatureSensorData(): void {
    this.mqttService.subscribe(subscriptions.temperature, (data) => {
      this.websocketGateway.sendTemperatureDataToWeb(data);
    });
  }
}
