import { registerAs } from '@nestjs/config';

export default registerAs('auth', () => ({
  username: process.env.AUTH_USERNAME,
  password: process.env.AUTH_PASSWORD,
}));
