import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync, writeFileSync } from 'fs';
import { MqttClient, connect } from 'mqtt';
import * as path from 'path';
import {
  MqttPublishError,
  MqttLoadSubscriptionsError,
  MqttSubscriptionError,
  MqttUpdateSubscriptionsError,
  MqttConnectionError,
  MqttUnsubscribeError,
} from 'src/exceptions/mqtt';

@Injectable()
export class MqttService {
  private client: MqttClient;
  private savedSubscriptions: string[] = [];
  private envs: string[] = [
    'mqtt.broker',
    'mqtt.username',
    'mqtt.password',
    'mqtt.ca',
  ];

  private readonly subscriptionsFile = path.join(
    __dirname,
    'subscriptions.json',
  );

  constructor(private configService: ConfigService) {
    const [broker, username, password, ca] = this.envs.map((env) =>
      this.configService.get<string>(env),
    );

    const clientId = `api_nestjs_${Math.random().toString(16).substring(2, 8)}`;

    this.client = connect(broker, {
      username,
      password,
      protocol: 'ssl',
      clientId,
      ca,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker.');
    });

    this.client.on('error', (error) => {
      throw new MqttConnectionError(error.message);
    });

    this.savedSubscriptions = this.loadSubscriptions();

    for (const topic of this.savedSubscriptions) {
      this.subscribe(topic);
    }
  }

  private loadSubscriptions(): string[] {
    try {
      const data = readFileSync(this.subscriptionsFile, 'utf8');
      const subscriptions = JSON.parse(data).subscriptions;
      return subscriptions;
    } catch (error) {
      throw new MqttLoadSubscriptionsError(error.message);
    }
  }

  private updateAndSaveSubscriptions(newSubscriptions: string[]): void {
    const data = {
      subscriptions: newSubscriptions,
    };

    try {
      writeFileSync(
        this.subscriptionsFile,
        JSON.stringify(data, null, 2),
        'utf8',
      );

      console.log('Subscriptions updated and saved successfully.');
    } catch (error) {
      throw new MqttUpdateSubscriptionsError(error.message);
    }
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message, (error) => {
      if (error) {
        throw new MqttPublishError(topic, error.message);
      } else {
        console.log(`Message published to topic ${topic}: ${message}`);
      }
    });
  }

  subscribe(topic: string): void {
    try {
      this.client.subscribe(topic);
      console.log(`Subscribed to the topic ${topic}.`);

      this.client.on('message', (receivedTopic, message) => {
        if (receivedTopic === topic) {
          console.log(`Message received from topic ${topic}: ${message}`);
          // Faça algo com a mensagem recebida
        }
      });

      if (!this.savedSubscriptions.includes(topic)) {
        this.savedSubscriptions.push(topic);
        this.updateAndSaveSubscriptions(this.savedSubscriptions);
      }
    } catch (error) {
      throw new MqttSubscriptionError(topic, error.message);
    }
  }

  unsubscribe(topic: string): void {
    try {
      this.client.unsubscribe(topic);

      this.savedSubscriptions = this.savedSubscriptions.filter(
        (sub) => sub !== topic,
      );

      this.updateAndSaveSubscriptions(this.savedSubscriptions);

      console.log(`Unsubscribed from topic ${topic}.`);
    } catch (error) {
      throw new MqttUnsubscribeError(topic, error.message);
    }
  }

  onModuleDestroy(): void {
    this.client.end();
  }
}
