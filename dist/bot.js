"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const config_json_1 = require("./config.json");
const discord_js_1 = require("discord.js");
const client = new discord_js_1.Client();
client.login(process.env.DISCORD_TOKEN);
client.on('ready', () => {
    console.log('Bot is Ready!');
});
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log(message.content);
    if (message.content.startsWith(config_json_1.prefix + 'ping')) {
        message.channel.send('🚀 pong');
        //message.reply('pong!');
    }
    if (message.content.startsWith(config_json_1.prefix + 'kick')) {
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['KICK_MEMBERS'])) {
            const member = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
            if (member) {
                const kickedMember = yield member.kick();
                message.channel.send(kickedMember.user.username + ' has been kicked');
            }
        }
        else {
            message.reply('You need permissions to do this');
        }
    }
    if (message.content.startsWith(config_json_1.prefix + 'clearmsgs')) {
        try {
            const messages = yield message.channel.messages;
            yield messages.delete;
            //await message.channel.bulkDelete(messages);
        }
        catch (error) {
            console.log(error);
        }
    }
}));
