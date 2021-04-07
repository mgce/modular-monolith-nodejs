import { AwilixContainer, Resolver } from "awilix";

export function asArray<T>(resolvers: Resolver<T>[]): Resolver<T[]> {
  return {
    resolve: (container: AwilixContainer) => resolvers.map((r: Resolver<T>) => container.build(r)),
  };
}
