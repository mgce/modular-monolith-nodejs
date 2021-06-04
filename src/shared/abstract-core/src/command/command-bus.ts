import { Command } from ".";

export interface CommandBus {
  execute(command: Command<unknown>): Promise<void>;
}
