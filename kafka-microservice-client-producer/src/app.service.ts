import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import * as util from 'util';

interface Dragon {
  id: number;
  name: string;
}

@Injectable()
export class AppService implements OnModuleInit {
  private readonly logger = new Logger(AppService.name);

  // Dragon IDs from 1 to 3 are available
  private readonly minDragons = 1;
  private readonly maxDragons = 3;

  constructor(@Inject('HERO_SERVICE') private readonly client: ClientKafka) {}

  async onModuleInit() {
    this.client.subscribeToResponseOf('hero.kill.dragon');

    await this.client.connect();
  }

  private chooseDragonId(): number {
    return Math.floor(
      Math.random() * (this.maxDragons - this.minDragons + 1) + this.minDragons,
    );
  }

  async killDragon() {
    this.logger.log('Killing the dragon...');

    this.logger.log('Success! Sending message to Kafka...');

    const dragon: Pick<Dragon, 'id'> = { id: this.chooseDragonId() };
    const killedDragon = await this.client
      .send<Dragon>('hero.kill.dragon', dragon)
      .toPromise();

    this.logger.log(`Consumer response: ${util.inspect(killedDragon)}`);

    return `${killedDragon.name} is dead! The kingdom is saved!`;
  }
}
