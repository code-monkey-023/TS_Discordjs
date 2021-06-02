import {Client, Message, TextChannel} from "discord.js";
import {config} from "./private/config";
import { helpers } from "./helpers/helper";


export class Bot {
    public start(token: string): Promise<string> {
        let client = new Client();

        // Startup event.
        client.once('ready', () => {
            const botChannel : TextChannel = helpers.get.channel(client, '849600334695628820');
            botChannel.setNSFW(true)
                .catch( err => console.log(err));
        });

        client.on('message', (message : Message) => {
            console.log(message.content);
        });

        return client.login(token);
    }

}

const TonyBot = new Bot();
TonyBot.start(config.token);