import { BotEvent, GuildMember, TextChannel } from "discord.js"
import { helpers } from "../helpers/helper";

const event : BotEvent = {
    name: "guildMemberAdd",
    once: false,
    execute(client, member: GuildMember) {
            console.log("test");
            const botChannel = helpers.get.channel(client, '849600334695628820');
            botChannel.send(`${member} has joined the server!`);
    }
}

export = event;
