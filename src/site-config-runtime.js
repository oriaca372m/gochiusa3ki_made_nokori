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
		['pending', {
			name: '放送局未定',
			time: new Map([
				[1, moment('2020-10-10T22:30:00')]
			])
		}],
	]),
	defaultChannelId: 'pending'
}
