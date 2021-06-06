
import { TextChannel } from "discord.js";
import { client } from "../main";

// Public helper get functions
export const helpers = {
    get : {
        channel : function(id: string) {
            return (client.channels.cache.get(id) as TextChannel);
        }
    }
}


module.exports.get = helpers;