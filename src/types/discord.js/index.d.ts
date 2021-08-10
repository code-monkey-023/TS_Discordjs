
import { Message, Client } from "discord.js";
// Need this extension so bot works with command files.
declare module "discord.js"{
        
    export interface Client {
        commands: Collection<unknown, Command>
    }
    export interface BotEvent {
        name: string,
        once: boolean,
        execute: (client: Client, ...args: any[]) => void
    }
    export interface Command {
        name: string,
        aliases?: Array<string>,
        description: string,
        execute: (message: Message, args: string[]) => void
    }
}
