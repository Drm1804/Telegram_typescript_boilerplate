import { conf } from '../config.js';
import { logger } from './helpers/logger.js';
import { initBot } from './servises/bot.js';

(async (): Promise<void> => {
  const log = logger('Main');
  log.log('start');
  await initBot(conf.botToken);
})();
