import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as util from 'util';
import { KafkaMessage } from 'kafkajs';

interface Dragon {
  id: number;
  name: string;
}

type KillDragonMessage = Omit<KafkaMessage, 'value'> & {
  value: Pick<Dragon, 'id'>;
};

// Simplified example: move method implementations to the service ofc
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  private readonly dragons = [
    { id: 1, name: 'Smaug' },
    { id: 2, name: 'Ancalagon The Black' },
    { id: 3, name: 'Glaurung' },
  ];

  @MessagePattern('hero.kill.dragon')
  onKillDragon(@Payload() message: KillDragonMessage) {
    this.logger.log(`[hero.kill.dragon] message = ${util.inspect(message)}`);

    const dragonId = message?.value?.id ?? null;
    if (!dragonId) {
      this.logger.error('Failed to determine Dragon ID');
      return;
    }

    const dragon = this.dragons.find(({ id }) => id === dragonId);
    if (!dragon) {
      this.logger.error('Failed to fetch dragon from the database!');
      return;
    }

    this.logger.log(`Hero killed ${dragon.name}!`);

    return dragon;
  }
}
