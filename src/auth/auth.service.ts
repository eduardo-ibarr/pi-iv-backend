import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private envs: string[] = ['auth.username', 'auth.password'];

  constructor(private configService: ConfigService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const [user, pass] = this.envs.map((env) =>
      this.configService.get<string>(env),
    );

    if (username === user && password === pass) {
      return { id: 1, username: user };
    }

    return null;
  }
}
