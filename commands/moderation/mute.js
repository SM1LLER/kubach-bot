const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('mute')
        .setDescription('Mute user')
        .setDescriptionLocalizations({
            ru: 'Заглушить пользователя'
        })
		.setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
		.setDMPermission(false),
	async execute(interaction) {
		return interaction.reply('Pong!');
	}
};