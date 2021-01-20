import dotenv, { DotenvConfigOptions } from 'dotenv';
import fs from 'fs';

import { Logger } from '../infra/logger';

interface Config {
  botToken: string;
  port: number;
  webhookPath: string;
}

function overrideEnv(
  overridePath: string,
  dotenvOptions: DotenvConfigOptions = {},
) {
  const overrideEnvFile = fs.readFileSync(overridePath);
  const overrideEnvValues = dotenv.parse(overrideEnvFile);

  dotenv.config(dotenvOptions);
  process.env = { ...process.env, ...overrideEnvValues };
}

function getEnv(envName: string, defaultEnv?: string): string {
  const env = process.env[envName] ?? defaultEnv;
  if (env == null) throw Error(`undefined environment variable: ${envName}`);
  return env;
}

function getConfig(): Config {
  overrideEnv('.env.local');
  return {
    botToken: getEnv('BOT_TOKEN'),
    port: Number.parseInt(getEnv('PORT'), 10),
    webhookPath: getEnv('WEBHOOK_PATH'),
  };
}
export { Config, getConfig, Logger };
