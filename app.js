const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers
], });

client.cooldowns = new Collection();
client.commands = new Collection();

registerCommands();
registerEvents();

client.login(process.env.DISCORD_TOKEN);

function registerCommands() {
	
	const foldersPath = path.join(__dirname, 'commands');
	const commandFolders = fs.readdirSync(foldersPath);

	for (const folder of commandFolders) {
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			registerCommand(require(filePath));
		}
	}
}

function registerCommand(command) {
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

function registerEvents() {
	const eventsPath = path.join(__dirname, 'events');
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

	for (const file of eventFiles) {
		const filePath = path.join(eventsPath, file);
		registerEvent(require(filePath));
	}
}

function registerEvent(event) {
	if (event.once) {
		client.once(event.name, (...args) => executeEvent(event, ...args));
	} else {
		client.on(event.name, (...args) => executeEvent(event, ...args));
	}
}

function executeEvent(event, ...args) {
	event.execute(...args).catch(err => console.error(`Error executing ${event.name}\n`, err));
}