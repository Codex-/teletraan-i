import Discord, { Guild } from "discord.js";

import { executeCommand } from "./commands";
import CONFIG from "./config";
import { executeMatchers } from "./matchers";
import logger from "./utilities/logger";

const PHASE = "Teletraan I";

class TeletraanI {
  private client = new Discord.Client();
  private commandChar = CONFIG.Discord.CommandCharacter;

  constructor() {
    this.bindMessageHandler();
  }

  public async login() {
    logger.info("Starting...", { label: PHASE });
    await this.client.login(CONFIG.Discord.Key);

    logger.info(`Guilds: ${JSON.stringify(await this.getConnectedGuilds())}`, {
      label: PHASE,
    });
    logger.info("Ready!", { label: PHASE });
  }

  public bindMessageHandler() {
    this.client.on("message", async (msg) => {
      if (msg.content.length === 0 || msg.author.bot) {
        return;
      }

      if (msg.content[0] === this.commandChar) {
        logger.verbose(
          `User: ${msg.author.username}, ID: ${msg.author.id}, Command: ${msg.content}`,
          { label: PHASE }
        );
        const command = msg.content
          .substr(this.commandChar.length)
          .split(/\s+/g)[0];

        await executeCommand(command, msg);
      } else {
        await executeMatchers(msg);
      }
    });
  }

  private async getConnectedGuilds() {
    return this.client.guilds.cache.map((guild: Guild) => {
      return {
        name: guild.name,
        id: guild.id,
      };
    });
  }
}

// tslint:disable-next-line: no-floating-promises
(async () => {
  const teletraanI = new TeletraanI();

  await teletraanI.login();
})();
