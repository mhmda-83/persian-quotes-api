import { SocksProxyAgent } from 'socks-proxy-agent';
import RedisSession from 'telegraf-session-redis';
import { Telegraf } from 'telegraf-ts';
import { TelegrafOptions } from 'telegraf-ts/typings/telegraf';
import { Inject, InjectValue } from 'typescript-ioc';

import { handlersComposer } from './botHandlers';
import { Config, Logger } from './config';
import { Context, CustomContextProps } from './infra/bot/context';

// TODO: add log for each failure (like null returns)
class TelegrafBot {
  private bot: Telegraf<Context>;
  @Inject logger: Logger;
  @InjectValue('config') config: Config;
  @Inject telegrafContextProps: CustomContextProps;

  constructor() {
    const botOptions: TelegrafOptions = {
      telegram: {
        agent: this.config.useTorProxy
          ? new SocksProxyAgent({
              host: '127.0.0.1',
              port: 9050,
            })
          : undefined,
      },
    };

    this.bot = new Telegraf<Context>(this.config.botToken, botOptions);

    Object.assign(
      this.bot.context,
      Reflect.getPrototypeOf(this.telegrafContextProps),
    );
    this.bot.context.destroySession = this.telegrafContextProps.destroySession;

    this.bot.use(handlersComposer);
    this.bot.use(new RedisSession({ store: this.config.redisUrl }));
  }

  lunchUsingWebhook() {
    this.bot.telegram
      .setWebhook(`${this.config.baseUrl}/${this.config.webhookPath}`)
      .then(() => {
        this.logger.info('bot webhook has been set 🪝');
        this.logger.info('bot launch successfully 🤖');
      })
      .catch((err) => {
        this.logger.info('following error occurred while launching bot ❌:');
        this.logger.error(err);
      });
    return this.bot.webhookCallback(`/${this.config.webhookPath}`);
  }

  async launchUsingPooling() {
    try {
      await this.bot.launch();
      this.logger.info('bot started using pooling 🐢');
      this.logger.info('bot launch successfully 🤖');
    } catch (err) {
      this.logger.info('following error occurred while launching bot ❌:');
      this.logger.error(err);
    }
  }
}

export { TelegrafBot };
