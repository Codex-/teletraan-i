import { Message, MessageEmbed } from "discord.js";

import { getArgs, registerCmd } from "../../commands";
import { urbanApi } from "./urban.api";

class Urban {
  /**
   * Search Urban Dictionary and return the top result for a given search term.
   *
   * @param message
   */
  @registerCmd("urban")
  public static async urban(message: Message): Promise<void> {
    const args = getArgs(message.content);
    const channel = message.channel;
    if (args.length > 0) {
      const searchTerms = args.join(" ");
      const results = await urbanApi(searchTerms);

      if (results.length === 0) {
        await message.reply(`Not results found for ${searchTerms}`);
        return;
      }

      const topResult = results[0];
      const embed = new MessageEmbed()
        .setColor(0xffff00)
        .setDescription([
          Urban.cleanDefinition(topResult.definition),
          "",
          `${topResult.thumbs_up} :thumbsup: :black_small_square: ${topResult.thumbs_down} :thumbsdown:`,
        ])
        .setTitle(topResult.word)
        .setURL(topResult.permalink);

      await channel.send(embed);
    }
  }

  /**
   * Support function to clean the brackets that wrap terms in a definition.
   *
   * @param definition
   */
  private static cleanDefinition(definition: string): string {
    return definition.replace(/\[|\]/g, "");
  }
}
