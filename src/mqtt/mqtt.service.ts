import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readFileSync, writeFileSync } from 'fs';
import { MqttClient, connect } from 'mqtt';
import * as path from 'path';

@Injectable()
export class MqttService {
  private client: MqttClient;
  private savedSubscriptions: string[] = [];

  private readonly subscriptionsFile = path.join(
    __dirname,
    'subscriptions.json',
  );

  constructor(private configService: ConfigService) {
    const envs = ['mqtt.broker', 'mqtt.username', 'mqtt.password', 'mqtt.ca'];

    const [broker, username, password, ca] = envs.map((env) =>
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
      console.log('Conectado ao broker MQTT');
    });

    this.savedSubscriptions = this.loadSubscriptions();

    console.log(this.savedSubscriptions);

    for (const topic of this.savedSubscriptions) {
      this.client.subscribe(topic);
      console.log(topic);
    }
  }

  private loadSubscriptions(): string[] {
    try {
      const data = readFileSync(this.subscriptionsFile, 'utf8');
      const subscriptions = JSON.parse(data).subscriptions;
      return subscriptions;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  private updateAndSaveSubscriptions(newSubscriptions: string[]): void {
    const data = {
      subscriptions: newSubscriptions,
    };

    writeFileSync(
      this.subscriptionsFile,
      JSON.stringify(data, null, 2),
      'utf8',
    );
  }

  publish(topic: string, message: string): void {
    this.client.publish(topic, message);
  }

  subscribe(topic: string): void {
    this.client.subscribe(topic);
    this.client.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        console.log(`Mensagem recebida em ${topic}: ${message}`);
        // Faça algo com a mensagem recebida
      }
    });

    if (!this.savedSubscriptions.includes(topic)) {
      this.savedSubscriptions.push(topic);
      this.updateAndSaveSubscriptions(this.savedSubscriptions);
    }
  }

  unsubscribe(topic: string): void {
    this.client.unsubscribe(topic);
    this.savedSubscriptions = this.savedSubscriptions.filter(
      (sub) => sub !== topic,
    );
    this.updateAndSaveSubscriptions(this.savedSubscriptions);
  }

  onModuleDestroy(): void {
    this.client.end();
  }
}
