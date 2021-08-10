import { BotEvent, TextChannel } from "discord.js"
import { helpers } from "../helpers/helper";

const event : BotEvent = {
    name: "ready",
    once: true,
    execute(client) {
            const botChannel : TextChannel = helpers.get.channel(client, '849600334695628820');
            botChannel.send("Test!");
    }
}

export = event;
