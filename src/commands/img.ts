import { Message, Command, MessageAttachment} from "discord.js";
import Jimp from "jimp";

const command : Command = {
    name: 'img',
    description: 'Processes an image',
    execute(message : Message, args : Array<string>) {
        let attachment: MessageAttachment;

        if(message.attachments && message.attachments.array().length <= 5) {
            attachment = message.attachments.array()[0];


            Jimp.read(attachment.attachment.toString())
                .then(file => {
                    file.flip(true, true)
                        .write("../content/img/" + message.id + ".jpg", (err, file) => {
                            message.channel.send("Here you go cunt.",{files: ["../content/img/" + message.id + ".jpg"]});
                        });
                })
                .catch((err) => {
                    console.log(err);
                });
                

        } else {
            return message.channel.send("Please provide an image to process.\n Weenbot will look through a maximum of 5 images.");
        }

        return message.channel.send("pong");
    },
};

export = command;