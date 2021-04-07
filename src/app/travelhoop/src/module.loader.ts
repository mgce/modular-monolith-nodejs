/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { join } from "path";
import { readdirSync } from "fs";
import { AppModule } from "@travelhoop/infrastructure-types";

export const loadModules = (): AppModule[] => {
  const modulePath = join(__dirname, "../node_modules/@travelhoop");
  const fileNames = readdirSync(modulePath).filter(fileName => fileName.includes("-module"));
  const modules = fileNames.map(fileName => {
    const path = join(modulePath, fileName, "build", "index.js");
    return require(path).default;
  });
  return modules;
};
