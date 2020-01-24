"use strict";

const { Cli } = require(`./cli`);
const { DEFAULT_COMMAND, USER_ARGV_INDEX, ExitCode } = require(`./constants`);

const userArguments = process.argv.slice(USER_ARGV_INDEX);
const [command] = userArguments;

if (userArguments.length === 0 || !Cli[command]) {
  Cli[DEFAULT_COMMAND].run();
  process.exit(ExitCode.success);
}

Cli[command].run(userArguments.slice(1));
