import moment from 'moment'

import siteConfig from './site-config.json'

export default {
	...siteConfig,
	episodes: [
		'1羽 「にっこりカフェの魔法使い」',
		'2羽 「幼馴染ハート強奪事件」',
		'3羽 「世界のすべては私の経験値」',
		'4羽 「あったかもしれない日常」',
		'5羽',
		'6羽',
		'7羽',
		'8羽',
		'9羽',
		'10羽',
		'11羽',
		'12羽',
	],
	channels: new Map([
		['atx', {
			name: 'AT-X',
			time: new Map([
				[1, moment('2020-10-10T21:30:00')]
			])
		}],
		['tokyomx', {
			name: 'TOKYO MX',
			time: new Map([
				[1, moment('2020-10-10T22:00:00')]
			])
		}],
		['bs11', {
			name: 'BS11',
			time: new Map([
				[1, moment('2020-10-10T22:00:00')]
			])
		}],
		['abema', {
			name: 'ABEMA',
			time: new Map([
				[1, moment('2020-10-10T22:00:00')]
			])
		}],
		['suntv', {
			name: 'サンテレビ',
			time: new Map([
				[1, moment('2020-10-10T22:30:00')]
			])
		}],
		['kbskyoto', {
			name: 'KBS京都',
			time: new Map([
				[1, moment('2020-10-10T23:00:00')]
			])
		}],
	]),
	defaultChannelId: 'atx'
}
