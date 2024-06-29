import { Collection, EmbedBuilder, CommandInteraction } from 'discord.js';
const cooldownTime = 5000;
const cooldown = new Collection();

/**
 * @param {import('@roboplay/robo.js').MiddlewareData} data
 */
export default function (data) {
    const { type } = data.record;

    if (type === "event" || type === "api") {
        return;
    }

    if (type === "command") {

        const payloadArray = data.payload;

        /** @type {CommandInteraction} */
        //@ts-ignore
        const interaction = payloadArray[0];
        const commandName = interaction.commandName;
        const commandID = interaction.commandId;
        if (commandName === 'ping') return { abort: false }
        const guildID = interaction.guild.id;
        const cooldownKey = `${guildID}-${commandID}`
        //@ts-expect-error - False type checking
        if (cooldown.has(cooldownKey)) {

            const expirationTime = cooldown.get(cooldownKey);
            const remainingTime = expirationTime - Date.now();
            const remainingSeconds = Math.ceil(remainingTime /  1000);

            const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle(`You're on cooldown!`)
            .setDescription(`You can use </${commandName}:${commandID}> again in ${remainingSeconds} seconds.`);

            if (remainingTime > 0) {
                interaction.reply({ embeds: [embed], ephemeral: true });
                return { abort: true };
            }
        }
        
        const newExpirationTime = Date.now() + cooldownTime;
        cooldown.set(cooldownKey, newExpirationTime);
        return { abort: false };
    }
}