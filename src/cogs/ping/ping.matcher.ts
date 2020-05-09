import { Message } from "discord.js";

import { registerMatcher } from "../../matchers";

class Ping {
  @registerMatcher(/^ping$/i)
  public static async ping(message: Message) {
    await message.reply("pong");
  }
}
