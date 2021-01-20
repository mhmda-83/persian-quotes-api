/* eslint-disable no-console */
import { Logger } from './logger';

class ConsoleLoger implements Logger {
  public log(...args: any[]) {
    console.log(...args);
  }

  public info(...args: any[]) {
    console.info(...args);
  }

  public error(...args: any[]) {
    console.error(...args);
  }
}

export { ConsoleLoger };
