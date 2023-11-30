import { Injectable } from '@nestjs/common';
import { subscriptions } from 'src/config/constants/subscriptions';
import { MqttService } from 'src/mqtt/mqtt.service';
import { ReadingsService } from 'src/readings/readings.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Injectable()
export class DataService {
  constructor(
    private readonly mqttService: MqttService,
    private readonly websocketGateway: WebsocketsGateway,
    private readonly readingsService: ReadingsService,
  ) {
    this.handleAirMoistureSensorData();
    this.handleSoilMoistureSensorData();
    this.handleTemperatureSensorData();
    this.handleLuminositySensorData();
    this.handleIrrigatorStatusData();
  }

  private handleIrrigatorStatusData(): void {
    this.mqttService.subscribe<string>(
      subscriptions.irrigationStatus,
      (data) => {
        this.websocketGateway.sendIrrigatorStatusToWeb(data);
      },
    );
  }

  private handleAirMoistureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.airMoisture, (data) => {
      const dataParsed = JSON.parse(data);

      dataParsed.date = new Date();

      this.websocketGateway.sendAirMoistureDataToWeb(
        JSON.stringify(dataParsed),
      );

      if (data && dataParsed) {
        this.readingsService.handleData({
          airMoisture: dataParsed.airMoisture,
        });
      } else {
        console.error('Dados do sensor inválidos ou incompletos:', data);
      }
    });
  }

  private handleSoilMoistureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.soilMoisture, (data) => {
      const dataParsed = JSON.parse(data);

      dataParsed.date = new Date();

      this.websocketGateway.sendSoilMoistureDataToWeb(
        JSON.stringify(dataParsed),
      );

      if (data && dataParsed) {
        this.readingsService.handleData({
          soilMoisture: dataParsed.soilMoisture,
        });
      } else {
        console.error('Dados do sensor inválidos ou incompletos:', data);
      }
    });
  }

  private handleTemperatureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.temperature, (data) => {
      const dataParsed = JSON.parse(data);

      dataParsed.date = new Date();

      this.websocketGateway.sendTemperatureDataToWeb(
        JSON.stringify(dataParsed),
      );

      if (data && dataParsed) {
        this.readingsService.handleData({
          temperature: dataParsed.temperature,
        });
      } else {
        console.error('Dados do sensor inválidos ou incompletos:', data);
      }
    });
  }

  private handleLuminositySensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.luminosity, (data) => {
      const dataParsed = JSON.parse(data);

      dataParsed.date = new Date();

      this.websocketGateway.sendLuminosityDataToWeb(JSON.stringify(dataParsed));

      if (data && dataParsed) {
        this.readingsService.handleData({
          luminosity: dataParsed.luminosity,
        });
      } else {
        console.error('Dados do sensor inválidos ou incompletos:', data);
      }
    });
  }
}
