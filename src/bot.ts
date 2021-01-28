import RedisSession from 'telegraf-session-redis';
import { Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';
import { Inject, InjectValue } from 'typescript-ioc';

import { handlersComposer } from './botHandlers';
import { Config, Logger } from './config';
import { Context, CustomContextProps } from './infra/bot/context';

class TelegrafBot {
  private bot: Telegraf<Context>;
  @Inject logger: Logger;
  @InjectValue('config') config: Config;
  @Inject telegrafContextProps: CustomContextProps;

  constructor(options: TelegrafOptions = {}) {
    this.bot = new Telegraf<Context>(this.config.botToken, options);

    Object.assign(
      this.bot.context,
      Reflect.getPrototypeOf(this.telegrafContextProps),
    );

    this.bot.use(handlersComposer);
    this.bot.use(new RedisSession({ store: this.config.redisUrl }));
  }

  lunchUsingWebhook() {
    this.bot.telegram.setWebhook(
      `${this.config.baseUrl}/${this.config.webhookPath}`,
    );
    this.logger.log('bot webhook has been set 🪝');
    return this.bot.webhookCallback(this.config.webhookPath);
  }

  async launchUsingPooling() {
    try {
      await this.bot.launch();
      this.logger.log('bot launch successfully  ✅');
    } catch (err) {
      this.logger.log('following error occurred ❌:');
      this.logger.error(err);
    }
  }
}

export { TelegrafBot };
