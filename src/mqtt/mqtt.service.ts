import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MqttClient, connect } from 'mqtt';
import { v4 as uuidv4 } from 'uuid';
import {
  MqttPublishError,
  MqttSubscriptionError,
  MqttConnectionError,
  MqttUnsubscribeError,
} from 'src/exceptions/mqtt';

@Injectable()
export class MqttService {
  private readonly logger = new Logger(MqttService.name);
  private client: MqttClient;
  private envs: string[] = [
    'mqtt.broker',
    'mqtt.username',
    'mqtt.password',
    'mqtt.ca',
  ];

  constructor(private configService: ConfigService) {
    const [broker, username, password, ca] = this.envs.map((env) =>
      this.configService.get<string>(env),
    );

    const clientId = `api_nestjs_${uuidv4()}`;

    this.client = connect(broker, {
      username,
      password,
      protocol: 'ssl',
      clientId,
      ca,
    });

    this.client.on('connect', () => {
      this.logger.log('Connected to MQTT broker.');
    });

    this.client.on('error', (error) => {
      throw new MqttConnectionError(error.message);
    });
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (error) => {
      if (error) {
        throw new MqttPublishError(topic, error.message);
      } else {
        this.logger.log(`Message published to topic ${topic}: ${message}`);
      }
    });
  }

  subscribe(topic: string, callback: (data: any) => void): void {
    try {
      this.client.subscribe(topic);
      this.logger.log(`Subscribed to topic ${topic}.`);

      this.client.on('message', (topicReceived, message) => {
        if (topic === topicReceived) {
          this.logger.log(`Message received from topic ${topic}...`);
          callback(message.toString());
        }
      });
    } catch (error) {
      throw new MqttSubscriptionError(topic, error.message);
    }
  }

  unsubscribe(topic: string): void {
    try {
      this.client.unsubscribe(topic);
      this.logger.log(`Unsubscribed from topic ${topic}.`);
    } catch (error) {
      throw new MqttUnsubscribeError(topic, error.message);
    }
  }

  onModuleDestroy(): void {
    this.client.end();
  }
}
