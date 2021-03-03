import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as util from 'util';

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.kill.dragon');

    await this.client.connect();
  }

  async killDragon() {
    this.logger.log('Killing the dragon...');
    this.logger.log('Success! Should notify the princess (server)');

    const response = await this.client.send('hero.kill.dragon', 1).toPromise();

    this.logger.log(`Server (consumer) response: ${util.inspect(response)}`);

    return 'Saved the Kingdom!';
  }
}
