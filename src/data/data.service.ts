import { Injectable } from '@nestjs/common';
import { subscriptions } from 'src/config/constants/subscriptions';
import { MqttService } from 'src/mqtt/mqtt.service';
import { ReadingsService } from 'src/readings/readings.service';
import { Sensor } from 'src/websockets/entity/sensor';
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
  }

  private handleAirMoistureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.airMoisture, (data) => {
      this.websocketGateway.sendAirMoistureDataToWeb(data);

      if (data) {
        const sensorData: Sensor = JSON.parse(data);

        if (sensorData) {
          this.readingsService.handleData({
            airMoisture: sensorData.airMoisture,
          });
        } else {
          console.error('Dados do sensor inválidos ou incompletos:', data);
        }
      }
    });
  }

  private handleSoilMoistureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.soilMoisture, (data) => {
      this.websocketGateway.sendSoilMoistureDataToWeb(data);

      if (data) {
        const sensorData: Sensor = JSON.parse(data);

        if (sensorData) {
          this.readingsService.handleData({
            soilMoisture: sensorData.soilMoisture,
          });
        } else {
          console.error('Dados do sensor inválidos ou incompletos:', data);
        }
      }
    });
  }

  private handleTemperatureSensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.temperature, (data) => {
      this.websocketGateway.sendTemperatureDataToWeb(data);

      if (data) {
        const sensorData: Sensor = JSON.parse(data);

        if (sensorData) {
          this.readingsService.handleData({
            temperature: sensorData.temperature,
          });
        } else {
          console.error('Dados do sensor inválidos ou incompletos:', data);
        }
      }
    });
  }

  private handleLuminositySensorData(): void {
    this.mqttService.subscribe<string>(subscriptions.luminosity, (data) => {
      this.websocketGateway.sendLuminosityDataToWeb(data);

      if (data) {
        const sensorData: Sensor = JSON.parse(data);

        if (sensorData) {
          this.readingsService.handleData({
            luminosity: sensorData.luminosity,
          });
        } else {
          console.error('Dados do sensor inválidos ou incompletos:', data);
        }
      }
    });
  }
}
