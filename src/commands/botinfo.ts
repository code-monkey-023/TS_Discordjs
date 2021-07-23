import { Message, Command, MessageEmbed, DataResolver } from "discord.js";

const command : Command = {
    name: 'botinfo',
    description: 'Displays some info about the bot.',
    execute(message : Message, args : Array<string>) {
        const infoEmbed: MessageEmbed = new MessageEmbed();
        const timestamp: number = require("../data/runtime.json").data.startupDate;
        let dateNow: Date = new Date(timestamp * 1000);

        const date: number = dateNow.getDate();
        const month: number = dateNow.getMonth()+1;
        const year: number = dateNow.getFullYear();
        
        const hours: string = dateNow.getHours().toString();
        const minutes: string = "0" + dateNow.getMinutes();
        const seconds: string = "0" + dateNow.getSeconds();
        
        infoEmbed.setTitle('Bot info')
            .setThumbnail(message.client.user.displayAvatarURL())
            .addField("⌛ Uptime", `Bot has been up since ${date}/${month}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`, true)
        return message.channel.send(infoEmbed);
    },
};

export = command;