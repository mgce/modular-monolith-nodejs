import { AwilixContainer, asFunction } from "awilix";

export function asDictionary<T>(dictionary: Record<string, (params: any) => T>) {
  return {
    resolve: (container: AwilixContainer) => {
      const newDictionary: { [key: string]: any } = {};
      Object.entries(dictionary).forEach(([key, value]) => {
        newDictionary[key] = container.build(asFunction(value));
      });
      return newDictionary;
    },
  };
}
