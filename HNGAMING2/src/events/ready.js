import { client } from "robo.js"

const MAX_MEMBERS_LIMIT = 1000;

export default async () => {
	const guilds = client.guilds.cache;
	for (const guild of guilds.values()) {
		const memberCount = guild.memberCount;
		if (memberCount < MAX_MEMBERS_LIMIT) {
			try {
				await guild.leave();
				console.log(`Bot leave from: ${guild.name} (${guild.id})`);
			} catch (error) {
				console.error(`Error leaving guild ${guild.name} (${guild.id}): ${error}`);
			}
		}
	}
}