import { conf } from '../config.js';
import { Scenes, Telegraf } from 'telegraf';
import db from './helpers/database.js'
import { pause } from './helpers/utils.js'
import logger from './helpers/logger.js'
import { Logger } from 'log4js';

const bot = new Telegraf<Scenes.SceneContext>(conf.botToken);


(async (): Promise<void> => {
  const _logger: Logger = logger.get('Main')
  await pause(1000);
  bot.on('text', async (ctx) => {
    _logger.info('trigger бота')
    await db.writeMessage(ctx.update.message.text, ctx.update.message.date)
    ctx.reply('Привет')
  })

  bot.launch();
})()


// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
