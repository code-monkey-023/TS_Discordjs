import {Client, GuildMember, Message, TextChannel} from "discord.js";
import {config} from "./private/config.json";
import { helpers } from "./helpers/helper";

const client: Client = new Client();

export class Bot {

    public start(client: Client, token: string): Promise<string> {

        // Startup event.
        client.once('ready', () => {
            const botChannel : TextChannel = helpers.get.channel(client, '849600334695628820');
        });

        client.on('message', (message : Message) => {
            
            if (message.author.bot) return;

            const weenis : GuildMember = helpers.get.member(message, '844481585327505429');
            message.channel.send(helpers.isRole.owner(message, weenis.id));
        });

        return client.login(token);
    }

    
}

const TonyBot = new Bot();
TonyBot.start(client, config.token);