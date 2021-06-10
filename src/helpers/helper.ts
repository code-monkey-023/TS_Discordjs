
import { TextChannel, User } from "discord.js";
import { client } from "../main";

// Public helper get functions
export const helpers = {
    get : {
        channel : function(channelId: string) {
            return (client.channels.cache.get(channelId) as TextChannel);
        },
        user: function(user: User) {
            return (client.users.cache.get(user.id) as User);

        }
    },
    isRole : {
        owner : function(userId: string) {
            return ;
        }
    }
}


module.exports.get = helpers;