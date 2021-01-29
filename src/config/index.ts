import crypto from 'crypto';
import dotenv, { DotenvConfigOptions } from 'dotenv';
import fs from 'fs';

import { Logger } from '../infra/logger';

interface RedisUrlParts {
  port: number;
  username: string;
  password: string;
  host: string;
}
interface Config {
  baseUrl: string;
  isProduction: boolean;
  botToken: string;
  port: number;
  webhookPath: string;
  adminChannelId: number;
  redisUrl: RedisUrlParts;
  databaseUrl: string;
  useTorProxy: boolean;
}

function overrideEnv(
  overridePath: string,
  dotenvOptions: DotenvConfigOptions = {},
) {
  const overrideFileExist = fs.existsSync(overridePath);

  const overrideEnvFile = overrideFileExist
    ? fs.readFileSync(overridePath)
    : '';
  const overrideEnvValues = dotenv.parse(overrideEnvFile);
  dotenv.config(dotenvOptions);
  process.env = { ...process.env, ...overrideEnvValues };
}

function getEnv(envName: string, defaultEnv?: any): string {
  const env = process.env[envName] ?? defaultEnv;
  if (env == null) throw Error(`undefined environment variable: ${envName}`);
  return env;
}

function getConfig(): Config {
  overrideEnv('.env.local');
  return {
    isProduction: getEnv('NODE_ENV') === 'production',
    botToken: getEnv('BOT_TOKEN'),
    port: Number.parseInt(getEnv('PORT'), 10),
    webhookPath: crypto.randomBytes(16).toString('hex'),
    redisUrl: {
      port: Number.parseInt(getEnv('REDIS_PORT'), 10),
      username: getEnv('REDIS_USERNAME'),
      password: getEnv('REDIS_PASSWORD'),
      host: getEnv('REDIS_HOST'),
    },
    adminChannelId: Number.parseInt(getEnv('ADMIN_CHANNEL_ID'), 10),
    databaseUrl: getEnv('DATABASE_URL'),
    baseUrl: getEnv('BASE_URL'),
    useTorProxy: Boolean(getEnv('USE_TOR_PROXY', false)),
  };
}
export { Config, getConfig, Logger, RedisUrlParts };
