import { Message } from "discord.js";

import { registerMatcher } from "../../matchers";

class Unflip {
  /**
   * For every (╯°□°）╯︵ ┻━┻ there must be an ┬─┬ ノ( ゜-゜ノ)
   *
   * @param message
   */
  @registerMatcher(/[(╯°□°）╯︵ ┻━┻]/)
  public static async unflip(message: Message) {
    message.channel.send("┬─┬ ノ( ゜-゜ノ)");
  }
}
