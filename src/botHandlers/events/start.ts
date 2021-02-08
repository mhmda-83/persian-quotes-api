import { Middleware } from 'telegraf-ts';

import { DefaultState } from '../../data/botStates';
import { Context } from '../../infra/bot/context';

const startHandler: Middleware<Context> = (ctx) => {
  if (ctx.session) ctx.session.state = DefaultState.NONE;
  ctx.reply(
    'سلام 👋🏻\n\n' +
      'به ربات ثبت ترجمه ی نقل قول خوش آمدی 🤖\n' +
      'برای ترجمه /translate رو ارسال کن تا برات یک نقل و قول بصورت رندوم بفرستم\n\n' +
      'در ضمن api و این ربات open source هستند\n' +
      'اگه دوست داشتی میتونی یه نگاه بهش بندازی ' +
      '<a href="https://github.com/mhmda-83/persian-quotes-api">لینک</a>',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    { parse_mode: 'HTML', disable_web_page_preview: true },
  );
};

export { startHandler };
