import { Context } from 'telegraf';
import Telegram from 'telegraf/typings/telegram';
import { Update, UserFromGetMe } from 'telegraf/typings/telegram-types';
import { Inject } from 'typescript-ioc';

import { Logger } from '../logger';

class CustomContext extends Context {
  @Inject logger: Logger;
  constructor(
    readonly update: Update,
    readonly tg: Telegram,
    readonly botInfo: UserFromGetMe,
  ) {
    super(update, tg, botInfo);
  }
}

export { CustomContext as Context };
