import CONFIG from "./config.json";

interface TeletraanIConfig {
  Discord: DiscordConfig;
  Logger: LoggerConfig;
}

interface DiscordConfig {
  CommandCharacter: string;
  Key: string;
}

interface LoggerConfig {
  Level: string;
}

export default CONFIG as TeletraanIConfig;
