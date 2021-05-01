export interface Command<TPayload> {
  payload: TPayload;
}

export interface CommandBus {
  execute(command: Command<unknown>): Promise<void>;
}

export interface CommandHandler<T extends Command<unknown> = Command<unknown>, TResult = void> {
  execute: (command: T) => Promise<TResult>;
}

interface CommandHandlers {
  [key: string]: CommandHandler;
}

export class CommandDispatcher implements CommandBus {
  private availableHandlers: CommandHandlers;

  constructor(commandHandlers: CommandHandler[]) {
    this.availableHandlers = commandHandlers.reduce((handlers: CommandHandlers, handler) => {
      handlers[this.getConstructorName(handler)] = handler;
      return handlers;
    }, {});
  }

  execute(command: Command<unknown>): Promise<void> {
    if (!this.availableHandlers[this.getHandlerName(command)]) {
      return Promise.reject(new Error(`Command: ${this.getConstructorName(command)} is not supported.`));
    }

    return this.availableHandlers[this.getHandlerName(command)].execute(command) as any;
  }

  private getConstructorName(object: object) {
    return object.constructor.name;
  }

  private getHandlerName(command: Command<any>) {
    return `${this.getConstructorName(command)}Handler`;
  }
}
