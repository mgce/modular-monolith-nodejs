import { Command } from ".";

export interface CommandDispatcher {
  execute(command: Command<unknown>): Promise<void>;
}
