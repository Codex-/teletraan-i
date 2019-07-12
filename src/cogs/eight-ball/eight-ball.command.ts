import { Message } from "discord.js";

import { registerCmd } from "../../commands";
import { eightBallRoll } from "./eight-ball";

class EightBall {
  /**
   * Ask and you shall receive, the Magic 8-Ball knows all.
   *
   * @param message
   */
  @registerCmd("8ball")
  public static async eightBall(message: Message): Promise<void> {
    message.reply(eightBallRoll());
  }
}
