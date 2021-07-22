import { Message, Command } from "discord.js";

const command : Command = {
    name: 'ping',
    aliases: ['peng'],
    description: 'pong',
    execute(message : Message, args : Array<string>) {
        console.log(args);
        return message.channel.send("pong");
    },
};

export = command;