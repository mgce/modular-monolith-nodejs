import { Command } from ".";

export interface CommandHandler<T extends Command<unknown> = Command<unknown>, TResult = void> {
  execute: (command: T) => Promise<TResult>;
}
