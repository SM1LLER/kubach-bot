const { Events, Collection } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		const client = interaction.client;
		const command = client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		const interactionCooldown = getInteractionCooldown(client, interaction);
		if (interactionCooldown > 0) {
			return interaction.reply(
				{ 
					content: `Пожалуйста, подождите перед следующим выполнением команды \`${command.data.name}\`. Вы сможете использовать её повторно <t:${interactionCooldown}:R>.`, 
					ephemeral: true 
				}
			);
		}
		
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
};

function getInteractionCooldown(client, interaction) {
	const { cooldowns } = client;
	const command = client.commands.get(interaction.commandName);

	if (!cooldowns.has(command.data.name)) {
		cooldowns.set(command.data.name, new Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.data.name);
	const defaultCooldownDuration = 3;
	const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000;
	if (timestamps.has(interaction.user.id)) {
		const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

		if (now < expirationTime) {
			const expiredTimestamp = Math.round(expirationTime / 1000);
			return expiredTimestamp;
		}
	}

	timestamps.set(interaction.user.id, now);
	setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

	return 0;
}

