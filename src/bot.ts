import { config } from "dotenv";
config();
import { prefix } from "./config.json";

import { Client, Message } from "discord.js";
const client: Client = new Client();

client.login(process.env.DISCORD_TOKEN);

client.on('ready', () => {
    console.log('Bot is Ready!');
});

client.on('message', async (message: Message) => {
    console.log(message.content);

    if(message.content.startsWith(prefix + 'ping')){
        message.channel.send('🚀 pong');
        //message.reply('pong!');
    }

    if(message.content.startsWith(prefix + 'kick')){
        if (message.member?.hasPermission(['KICK_MEMBERS'])){
            const member = message.mentions.members?.first();
            if (member){
                const kickedMember = await member.kick();
                message.channel.send(kickedMember.user.username + ' has been kicked');
            }
        }else{
            message.reply('You need permissions to do this');
        }
    }

    if(message.content.startsWith(prefix + 'clearmsgs')){
        try {
            const messages = await message.channel.messages;
            await messages.delete;
            //await message.channel.bulkDelete(messages);
        }catch (error) {
            console.log(error)
        }
    }
});