
// let client = new Client();

import { Client, TextChannel } from "discord.js";

// Public helper get functions
export const helpers = {
    get : {
        channel : function(client : Client,id: string) {
            return (client.channels.cache.get(id) as TextChannel);
        }
    }
}


module.exports.get = helpers;