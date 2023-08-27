import { registerAs } from '@nestjs/config';
import { readFileSync } from 'fs';

export default registerAs('mqtt', () => ({
  broker: `mqtt:${process.env.MQTT_BROKER}:${process.env.MQTT_PORT}`,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  ca: [readFileSync('ca.crt')],
}));
