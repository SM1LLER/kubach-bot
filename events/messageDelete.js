require('dotenv').config(); 
const { Events } = require('discord.js');
const KARANDASH_ID = process.env.KARANDASH_ID;

module.exports = {
	name: Events.MessageDelete,
	async execute(message) {
        if (!(message.member.roles.cache.has(KARANDASH_ID) || await hasRole(message.member, KARANDASH_ID))) {
            return;
        }

        if (message.partial) {
            await message.fetch();
        }
          
        const { author, content } = message;
        const deleteInfoEmbed = creteMessageDeleteEmbed(author, content);
        
        message.channel.send({ embeds: [deleteInfoEmbed] });
	}
};

async function hasRole(member, roleId) {
    await member.fetch();
    return member.roles.cache.has(roleId);
}

function creteMessageDeleteEmbed(member, message){
    const embed = {
        color: 0x0099ff,
        author: {
            name: `${member.tag} удалил`,
        },
        description: message
    };

    return embed;
}