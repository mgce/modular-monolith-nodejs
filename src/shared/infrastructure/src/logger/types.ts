export type LogMethod = (level: string, msg: string) => Logger;

export type LeveledLogMethod = (msg: string, error?: any) => Logger;

export interface Logger {
  log: LogMethod;
  error: LeveledLogMethod;
  warn: LeveledLogMethod;
  info: LeveledLogMethod;
  verbose: LeveledLogMethod;
  debug: LeveledLogMethod;
}
