import { BotEvent, GuildMember, TextChannel, Command } from "discord.js"
import { ParsedCommandLine } from "typescript";
import { helpers } from "../helpers/helper";
import { config } from "../private/config.json";

const event : BotEvent = {
    name: "message",
    once: false,
    execute(client, message) {
        
            if (!message.content.startsWith("!") || message.author.bot) return;

            let command: Command;
            let args: string[];
            let msgContent: string;
            let commandName: string;
            let argString: string;
            const prefix: string = config.discord.prefix;

            
            args = [];

            msgContent = message.content.slice(prefix.length);

            if (!/ +/.test(msgContent)) {
                commandName = msgContent.toLowerCase();
            } else {
                commandName = msgContent.substr(0, msgContent.indexOf(' ')).toLowerCase();

                argString = msgContent.substr(msgContent.indexOf(' ')+1);

                args = argString.trim().split(',');
            }
                
            command = client.commands.get(commandName)
                || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

            if (!command) return;
            try {
                command.execute(message, this.args);
            } catch(err) {
                console.log("omg big error occurring just now :(((" );

                console.log('\n');

                console.log('ERROR: ' + err)
                message.reply('there was an error trying to execute that command!');
            };
    }
}

export = event;
