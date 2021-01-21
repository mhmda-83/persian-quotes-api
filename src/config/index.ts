import crypto from 'crypto';
import dotenv, { DotenvConfigOptions } from 'dotenv';
import fs from 'fs';

import { Logger } from '../infra/logger';

interface Config {
  isProduction: boolean;
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
    isProduction: getEnv('NODE_ENV') === 'production',
    botToken: getEnv('BOT_TOKEN'),
    port: Number.parseInt(getEnv('PORT'), 10),
    webhookPath: crypto.randomBytes(16).toString('hex'),
  };
}
export { Config, getConfig, Logger };
