import moment from 'moment'

import siteConfig from './site-config.json'

export default {
	...siteConfig,
	episodes: [
		'1話',
		'2話',
		'3話',
		'4話',
		'5話',
		'6話',
		'7話',
		'8話',
		'9話',
		'10話',
		'11話',
		'12話',
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
