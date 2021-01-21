import { Context } from 'telegraf';

function translateHandler(ctx: Context) {
  ctx.reply('translate command');
}

export { translateHandler };
