import { Bot, Context, NextFunction, session } from 'grammy';
import { logger } from '../utils/logger.js';

const ADMIN_IDS = [];
const log = logger('Bot Service');

export type SessionData = {
  db: Record<string, unknown>;
};

export type BotContext = Context;

let bot: Bot<BotContext>;

export function getBot(): Bot<BotContext> {
  return bot;
}

async function isAdmin(ctx: BotContext, next: NextFunction): Promise<void> {
  if (ADMIN_IDS.includes(ctx.from.id)) {
    return await next();
  }

  await ctx.reply('⚠️ You are not an admin.');
}

export async function initBot(
  botToken: string,
): Promise<{ bot: Bot<BotContext> }> {
  bot = new Bot<BotContext>(botToken);

  bot.use(
    session({
      initial() {
        return {
          db: {},
        };
      },
    }),
  );

  bot.use(isAdmin);

  // Install the conversations plugin.

  //Install menus

  bot.on('message', async (ctx) => {
    ctx.reply('Hello! I am a bot. How can I help you?');
  });

  bot.catch((error) => {
    console.log('bot error', error);
  });

  /**
   * Инжектим кастомные query разных модулей
   */

  bot.on('callback_query:data', async (ctx) => {
    console.log('Unknown button event with payload', ctx.callbackQuery.data);
    await ctx.answerCallbackQuery(); // remove loading animation
  });

  bot.catch((error) => {
    log.error('bot error', error);
  });

  bot.start({
    onStart(botInfo) {
      log.info('Bot starts as', botInfo.username);
    },
  });

  return { bot };
}
