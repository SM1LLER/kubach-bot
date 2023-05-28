const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('warn')
		.setDescription('Warn user')
        .setDescriptionLocalizations({
            ru: 'Выдать предупреждение пользователю'
        })
		.setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
		.setDMPermission(false),
	async execute(interaction) {
		return interaction.reply('Pong!');
	}
};