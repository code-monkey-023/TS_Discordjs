import { Message, Command, MessageEmbed, User} from "discord.js";
import { helpers } from "../helpers/helper";

const command : Command = {
    name: 'botinfo',
    description: 'Displays some info about the bot.',
    execute(message : Message, args : Array<string>) {
        const infoEmbed: MessageEmbed = new MessageEmbed();
        const timestamp: number = require("../data/runtime.json").data.startupDate;
        let dateNow: Date = new Date(timestamp * 1000);

        const startupDate: number = dateNow.getDate();
        const startupMonth: number = dateNow.getMonth()+1;
        const startupYear: number = dateNow.getFullYear();
        
        const startupHours: string = dateNow.getHours().toString();
        const startupMinutes: string = "0" + dateNow.getMinutes();
        const startupSeconds: string = "0" + dateNow.getSeconds();

        const bot : User = message.client.user;

        let dateBot: Date = new Date(bot.createdTimestamp);

        const creationDate: number = dateBot.getDate();
        const creationMonth: number = dateBot.getMonth()+1;
        const creationYear: number = dateBot.getFullYear();
        
        const creationHours: string = dateBot.getHours().toString();
        const creationMinutes: string = "0" + dateBot.getMinutes();
        const creationSeconds: string = "0" + dateBot.getSeconds();

        const weenisAvatar: string = helpers.get.weenis(message.client).displayAvatarURL({dynamic: true});
        
        infoEmbed.setTitle('Bot info')
            .setThumbnail(message.client.user.displayAvatarURL({dynamic: true}))
            .addField("⌛ Uptime", `Bot has been up since ${startupDate}/${startupMonth}/${startupYear} ${startupHours}:${startupMinutes.substr(-2)}:${startupSeconds.substr(-2)}`)
            .addField("🔨 Creation", `${bot.username} was born into this world on ${creationDate}/${creationMonth}/${creationYear} ${creationHours}:${creationMinutes.substr(-2)}:${creationSeconds.substr(-2)}`)
            .setFooter("Bot made by weenis#7144.", `${weenisAvatar}`);
        return message.channel.send(infoEmbed);
    },
};

export = command;