import {Client, Collection, Message, TextChannel, Command} from "discord.js";
import {config} from "./private/config.json";
import { helpers } from "./helpers/helper";
import * as fs from "fs";
import * as path from "path";

// Custom types.

export class Bot {

    private client: Client;
    private command: Command;

    private commandFiles: Array<string>;
    private args: Array<string>;
    private prefix: string;
    private msgContent: string;
    private commandName: string;

    constructor() {

        this.client = new Client();
        this.client.commands = new Collection();
        this.prefix = "!";

        this.commandFiles = fs.readdirSync( path.resolve(__dirname, './commands/')).filter(file => file.endsWith('.ts'));
        console.log(this.commandFiles);

    }

    public start(token: string): Promise<string> {

        const runtimeData : Object = {
            data : {
                startupDate : Math.floor(Date.now() / 1000)
            }
        }

        fs.writeFileSync('src/data/runtime.json', JSON.stringify(runtimeData));

        for (const file of this.commandFiles) {
            const newCommand : Command = require(`./commands/${file}`); // Doesn't work without ts-node.
            this.client.commands.set(newCommand.name, newCommand);
        };

        this.client.once('ready', () => {
            const botChannel : TextChannel = helpers.get.channel(this.client, '849600334695628820');
            botChannel.send("Test!");
        });
        
        this.client.on('message', (message : Message) => {
            if (!message.content.startsWith("!") || message.author.bot) return;
            
            this.args = [];

            this.msgContent = message.content.slice(this.prefix.length);

            if (!/ +/.test(this.msgContent)) {
                this.commandName = this.msgContent.toLowerCase();
            } else {
                this.commandName = this.msgContent.substr(0, this.msgContent.indexOf(' ')).toLowerCase();

                const argString = this.msgContent.substr(this.msgContent.indexOf(' ')+1);

                this.args = argString.trim().split(',');
            }
                
            this.command = this.client.commands.get(this.commandName)
                || this.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(this.commandName));

            if (!this.command) return;
            try {
                this.command.execute(message, this.args);
            } catch(err) {
                console.log("omg big error occurring just now :(((" );

                console.log('\n');

                console.log('ERROR: ' + err)
                message.reply('there was an error trying to execute that command!');
            };
        });

        return this.client.login(token);
    } 
}

const TonyBot = new Bot();
TonyBot.start(config.token);