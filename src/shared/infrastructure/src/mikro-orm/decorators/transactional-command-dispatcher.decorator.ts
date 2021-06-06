import { Command, CommandDispatcher } from "@travelhoop/abstract-core";

interface TransactionalCommandDispatcherDecoratorDependencies {
  commandDispatcher: CommandDispatcher;
}

export class TransactionalCommandDispatcherDecorator implements CommandDispatcher {
  constructor(private readonly deps: TransactionalCommandDispatcherDecoratorDependencies) {}

  async execute(command: Command<unknown>): Promise<void> {
    console.log("before");

    await this.deps.commandDispatcher.execute(command);

    console.log("after");
  }
}
