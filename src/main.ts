import {Client, Message, TextChannel} from "discord.js";
import {config} from "./private/config.json";
import { helpers } from "./helpers/helper";

export const client: Client = new Client();

export class Bot {

    public start(client: Client, token: string): Promise<string> {

        // Startup event.
        client.once('ready', () => {
            const botChannel : TextChannel = helpers.get.channel('849600334695628820');
            botChannel.send('Hello!')
                .catch( err => console.log(err));
        });

        client.on('message', (message : Message) => {
            console.log(message.content);
        });

        return client.login(token);
    }

    
}


const TonyBot = new Bot();
TonyBot.start(client, config.token);