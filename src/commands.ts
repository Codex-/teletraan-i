import { Message } from "discord.js";
import fs from "fs";
import Path from "path";

import logger from "./utilities/logger";

type Command = (message: Message) => Promise<void>;
type CommandStore = {
  [id: string]: Command;
};

const PHASE = "commands";

const COGS_DIR = Path.join(__dirname, "cogs");
const COMMAND_TABLE: CommandStore = {};

/**
 * Split message on whitespace into arguments.
 *
 * @param msg
 * @returns an array of strings representing command arguments.
 */
export function getArgs(msg: string): string[] {
  const message = msg.split(/\s+/g);
  return message.slice(1);
}

/**
 * Provides the decorator for registering bot commands.
 *
 * @param handles a list of commands to be handled by the decorated method.
 */
export function registerCmd(...handles: string[]): MethodDecorator {
  return (
    target: { [index: string]: any },
    propertyKey: string | symbol,
    _: PropertyDescriptor
  ) => {
    if (typeof propertyKey === "symbol") {
      return;
    }
    for (const handle of handles) {
      const newHandle = handle.toLowerCase();
      if (COMMAND_TABLE[newHandle]) {
        throw new Error(`Handle ${handle} already exists.`);
      }

      /**
       * Wrap the command that attaches commands to the error for more
       * comprehensive logging upon error.
       *
       * @param message
       */
      const wrappedCmd = async (message: Message) => {
        try {
          await target[propertyKey](message);
        } catch (error) {
          error.phase = `${PHASE}\\${newHandle}`;
          throw error;
        }
      };

      COMMAND_TABLE[newHandle] = wrappedCmd;
    }
  };
}

export async function executeCommand(
  command: string,
  message: Message
): Promise<void> {
  try {
    if (COMMAND_TABLE[command]) {
      await COMMAND_TABLE[command](message);
      return;
    }
    logger.verbose(`Command not found: ${command}`, { label: PHASE });
  } catch (error) {
    const commandPhase = error.phase || PHASE;
    logger.error(`${error.message}`, { label: commandPhase });
    logger.debug(`${error.stack}`, { label: commandPhase });
  }
}

/**
 * Walks the cogs directories for commands.
 */
function importCogs(): void {
  const cogs = fs
    .readdirSync(COGS_DIR)
    .map(cogDir =>
      fs
        .readdirSync(Path.join(COGS_DIR, cogDir))
        .filter(cogSrc => cogSrc.toLowerCase().match(/.command.js$/))
        .map(filename => Path.join(COGS_DIR, cogDir, filename))
    )
    .filter(commands => commands.length > 0);

  for (const cog of cogs) {
    for (const command of cog) {
      require(command);
    }
  }
}

importCogs();
