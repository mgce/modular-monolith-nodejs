require('@travelhoop/toolchain/patch/modern-module-resolution');

module.exports = {
  extends: [ "./node_modules/@travelhoop/toolchain/includes/.eslintrc" ],  // <---- put your profile string here
  parserOptions: { 
    project: "tsconfig.json",
    tsconfigRootDir: __dirname 
  }
};