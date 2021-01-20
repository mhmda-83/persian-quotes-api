interface Logger {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
}

export { Logger };
