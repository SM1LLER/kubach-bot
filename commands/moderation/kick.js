const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('kick')
		.setDescription('Kick user')
        .setDescriptionLocalizations({
            ru: 'Кикнуть пользователя'
        })
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
	async execute(interaction) {
		return interaction.reply('Pong!');
	}
};