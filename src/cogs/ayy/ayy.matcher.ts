import { Message } from "discord.js";

import { registerMatcher } from "../../matchers";

class Ayy {
  @registerMatcher(/\bayy+$/i)
  public static async ayy(message: Message) {
    await message.channel.send("lmao");
  }
}
