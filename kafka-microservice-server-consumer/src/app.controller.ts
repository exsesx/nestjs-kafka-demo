import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import * as util from 'util';

// Simplified example: move method implementations to the service ofc
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  @MessagePattern('hero.kill.dragon')
  onKillDragon(@Payload() message) {
    this.logger.log('HERO KILLED THE DRAGON!');
    this.logger.log(`Message = ${util.inspect(message)}`);
    this.logger.log('Spawning another one...');

    return 'Spawned another one!';
  }
}
