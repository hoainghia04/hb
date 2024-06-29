const MAX_MEMBERS_LIMIT = 1000;

export default async (guild) => {
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