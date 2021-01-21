import { ConstantConfiguration, ContainerConfiguration } from 'typescript-ioc';

import { ConsoleLogger } from '../infra/logger';
import { getConfig, Logger } from '.';

type ContainerConfig = (ConstantConfiguration | ContainerConfiguration)[];

export function createContainer(): ContainerConfig {
  return [
    { bindName: 'config', to: getConfig() },
    { bind: Logger, to: ConsoleLogger },
  ];
}
