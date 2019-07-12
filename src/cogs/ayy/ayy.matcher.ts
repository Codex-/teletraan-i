import { Message } from "discord.js";

import { registerMatcher } from "../../matchers";

class Ayy {
  @registerMatcher(/\bayy+$/i)
  public static async ayy(message: Message) {
    message.channel.send("lmao");
  }
}
