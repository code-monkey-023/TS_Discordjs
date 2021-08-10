import {Client, Collection, Message, TextChannel, Command, BotEvent} from "discord.js";
import {config} from "./private/config.json";
import { helpers } from "./helpers/helper";
import * as fs from "fs";
import * as path from "path";

// Custom types.

export class Bot {

    private client: Client;
    private commandName: string;

    private commandsPath: string;
    private eventsPath: string;

    private commandFileNames: Array<string>;
    private eventFileNames: Array<string>;

    private args: Array<string>;
    private prefix: string;
    private msgContent: string;

    public init(){

        this.client = new Client();
        this.client.commands = new Collection();
        this.prefix = config.discord.prefix;

        this.commandsPath = path.join(__dirname, "commands");
        this.eventsPath = path.join(__dirname, "events");

        this.commandFileNames = fs.readdirSync(this.commandsPath).filter(file => file.endsWith('.ts'));
        this.eventFileNames = fs.readdirSync(this.eventsPath).filter(file => file.endsWith('.ts'));

    }

    public start(token: string): Promise<string> {

        const runtimeData : Object = {
            data : {
                startupDate : Math.floor(Date.now() / 1000)
            }
        }

        fs.writeFileSync('src/data/runtime.json', JSON.stringify(runtimeData));

        for (const file of this.commandFileNames) {
            const newCommand : Command = require(`./commands/${file}`); // Doesn't work without ts-node.
            this.client.commands.set(newCommand.name, newCommand);
        };

        for (const file of this.eventFileNames) {
            const newEvent : BotEvent = require(`./events/${file}`); // Doesn't work without ts-node.
                if(newEvent.once)
                    this.client.once(newEvent.name, (...args) => {newEvent.execute(this.client, ...args)})
                else
                    this.client.on(newEvent.name, (...args) => {newEvent.execute(this.client, ...args)})
        };

        return this.client.login(token);
    } 
}

const TonyBot = new Bot();
TonyBot.init();
TonyBot.start(config.discord.token);