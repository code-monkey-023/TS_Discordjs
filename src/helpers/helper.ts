
import { TextChannel } from "discord.js";
import { client } from "../main";

// Public helper get functions
export const helpers = {
    get : {
        channel : function(client : Client,channelId: string) {
            return (client.channels.cache.get(channelId) as TextChannel);
        },
        user: function(client)
    },
    isRole : {
        owner : function(userId: string) {
            return ;
        }
    }
}


module.exports.get = helpers;