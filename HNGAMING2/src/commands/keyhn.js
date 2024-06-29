import { EmbedBuilder } from 'discord.js'
import { withCache } from 'ultrafetch'

const commandUsageLimit = 5
const commandUsage = new Map()
const donateRoleId = [
	'1194927814097510462',
	'1129782219750256680',
	'1110776745092718655',
	'1184846179222159461',
	'1220029069802995782',
	'1243846710812213269'
]
const adminRoleId = ['1180028452179546183', '1108410825154244668']

export const config = {
	description: 'Bypass All Link!',
	options: [
		{
			name: 'link',
			type: 'string',
			description: 'The link to the key bypasser',
			required: true
		}
	],
	dmPermission: false
}

export default async (interaction) => {
	const userId = interaction.user.id
	const member = await interaction.guild.members.fetch(userId)

	const isDonator = donateRoleId.some((roleId) => member.roles.cache.has(roleId))
	const isAdmin = adminRoleId.some((roleId) => member.roles.cache.has(roleId))
	const isRestrictedRole = ![...donateRoleId, ...adminRoleId].some((roleId) => member.roles.cache.has(roleId))

	const userUsage = commandUsage.get(userId) || 0

	if (userUsage >= commandUsageLimit && isRestrictedRole) {
		const embed = new EmbedBuilder()
			.setColor('#FF0000')
			.setTitle('Limit')
			.setDescription('boost server or donate de su dung bot nhieu hon')
			.setTimestamp()

		return {
			embeds: [embed],
			ephemeral: true
		}
	}

	commandUsage.set(userId, userUsage + 1)
	const link = interaction.options.get('link').value

    // const apiUrls = 'https://byte.goatbypassers.xyz/api/bypass?url='
    const fluxusAPI = 'https://fluxus-eskeyz.vercel.app/api/hello?hwid='

    let endpoints = [
        "https://dlr-api.woozym.workers.dev/",
        "https://dlr-api-ba.woozym.workers.dev/",
        "https://dlr-backupapi.27x21zmd.workers.dev/",
        "https://dlr-api.5y29whua.workers.dev/"
    ]

	const urls = [
        'https://flux.li/android/external/start.php?HWID=',
		'https://spdmteam.com/key-system-1?hwid=',
		'https://mobile.codex.lol',
        "https://linkvertise.com",
        'https://keyrblx.com',
        'https://pandadevelopment.net',
		"https://gateway.platoboost.com/a/8?id=",
		'https://trigonevo.com/getkey/?hwid=',
		"https://gateway.platoboost.com/a/2569?id=",
	]

	if (!urls.some((url) => link.startsWith(url))) {
		const embed = new EmbedBuilder()
			.setColor('#FF00FF')
			.setTitle('Error')
			.setDescription('```Link Not Support!```')
			.setThumbnail(
				'https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&'
			)
			.setTimestamp()

		return {
			embeds: [embed],
			ephemeral: true
		}
	}

    function extractHWIDFromURL(url) {
        try {
            const urlObj = new URL(url);
            const hwid = urlObj.searchParams.get("HWID");
            return hwid;
        } catch (error) {
            console.error('Error extracting HWID:', error);
            return null;
        }
    }

    const hwid = extractHWIDFromURL(link)

    let data
    let data2
    let API = null;

    let url = encodeURIComponent(link)

    for (let endpoint of endpoints) {
        try {
            let response = await fetch(endpoint);
            if (response.status === 429) {
                return null
            } else {
                API = endpoint;
                break;
            }
        } catch (error) {
            console.error(`Error fetching from ${endpoint}:`, error);
        }
    }

    if (link.startsWith("https://flux.li/android/external/start.php?HWID=")) {
        try {
            const enhancedFetch = withCache(fetch)
            const response = await enhancedFetch(`${fluxusAPI}${hwid}`)
            data = await response.json()
            if (data.key) {
                const embed = new EmbedBuilder()
                    .setColor("Green")
                    .setTitle("HN Gaming Bypasser")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Result : ",
                            value: "```" + data.key + "```",
                        },
                        {
                            name: "**Made in HN Gaming**",
                            value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                        }
                    )
                return {
                    content: `hi, ${interaction.user}`,
                    embeds: [embed],
                };
            } else {
                const embed = new EmbedBuilder()
                    .setColor("Red")
                    .setTitle("HN Gaming Bypasser")
                    .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                    .setTimestamp()
                    .addFields(
                        {
                            name: "Result : ",
                            value: "```Error try again```",
                        },
                        {
                            name: "**Made in HN Gaming**",
                            value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                        }
                    )
                return {
                    content: `hi, ${interaction.user}`,
                    embeds: [embed],
                };
            }
        } catch (error) {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("HN Gaming Bypasser")
                .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                .setTimestamp()
                .addFields(
                    {
                        name: "Result : ",
                        value: "```Error try again```",
                    },
                    {
                        name: "**Made in HN Gaming**",
                        value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                    }
                )
            return {
                content: `hi, ${interaction.user}`,
                embeds: [embed],
            };
        }
    } else if (link.startsWith("https://spdmteam.com/key-system-1?hwid=") || link.startsWith("https://mobile.codex.lol")) {
        const enhancedFetch = withCache(fetch)
        const response = await enhancedFetch(`${API}?url=${url}`, {
            headers: {
                "x-api-key": "DLR_EE-1239812038203801293890213082139238921-FF"
            }
        })
        data2 = await response.json()

        if (data2.sucess === true) {
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("HN Gaming Bypasser")
                .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                .setTimestamp()
                .addFields(
                    {
                        name: "Result : ",
                        value: "```Bypassed```",
                    },
                    {
                        name: "**Made in HN Gaming**",
                        value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                    }
                )
            return {
                content: `hi, ${interaction.user}`,
                embeds: [embed],
            };
        } else {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("HN Gaming Bypasser")
                .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                .setTimestamp()
                .addFields(
                    {
                        name: "Result : ",
                        value: "```Error try again```",
                    },
                    {
                        name: "**Made in HN Gaming**",
                        value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                    }
                )
            return {
                content: `hi, ${interaction.user}`,
                embeds: [embed],
            };
        }
    }

    try {
        const enhancedFetch = withCache(fetch)
        const response = await enhancedFetch(`${API}?url=${url}`, {
            headers: {
                "x-api-key": "DLR_EE-1239812038203801293890213082139238921-FF"
            }
        })
        data2 = await response.json()
        if (data2.sucess === true) {
            let result = data2.result
            const embed = new EmbedBuilder()
                .setColor("Green")
                .setTitle("HN Gaming Bypasser")
                .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                .setTimestamp()
                .addFields(
                    {
                        name: "Result : ",
                        value: "```" + result + "```",
                    },
                    {
                        name: "**Made in HN Gaming**",
                        value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                    }
                )
            return {
                content: `hi, ${interaction.user}`,
                embeds: [embed],
            };
        } else {
            const embed = new EmbedBuilder()
                .setColor("Red")
                .setTitle("HN Gaming Bypasser")
                .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
                .setTimestamp()
                .addFields(
                    {
                        name: "Result : ",
                        value: "```Error try again```",
                    },
                    {
                        name: "**Made in HN Gaming**",
                        value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                    }
                )
            return {
                content: `hi, ${interaction.user}`,
                embeds: [embed],
            };
        }
    } catch (error) {
        const embed = new EmbedBuilder()
            .setColor("Red")
            .setTitle("HN Gaming Bypasser")
            .setThumbnail("https://cdn.discordapp.com/attachments/1175469677871370323/1180021154988171385/nx.gif?ex=657be757&is=65697257&hm=6d10b828b749d1c5ccec3c896e6587ad32dace5d86eea0a6cf9fb30099b92562&")
            .setTimestamp()
            .addFields(
                {
                    name: "Result : ",
                    value: "```Error try again```",
                },
                {
                    name: "**Made in HN Gaming**",
                    value: "[Subscribe channel HN Gaming](https://www.youtube.com/channel/UCVzNxeEWfSbnf_IK3YMhW3w)"
                }
            )
        return {
            content: `hi, ${interaction.user}`,
            embeds: [embed],
        };
    }
}
