import moment from 'moment'

import siteConfig from './site-config.json'

export default {
	...siteConfig,
	episodes: [
		'1羽 「にっこりカフェの魔法使い」',
		'2羽 「幼馴染ハート強奪事件」',
		'3羽 「世界のすべては私の経験値」',
		'4羽 「あったかもしれない日常」',
		'5羽 「彼女は熱き旋風 彼女は気ままなそよ風」',
		'6羽 「うさぎの団体さんも大歓迎です」',
		'7羽 「今夜は幽霊とだって踊り明かせる Halloween Night!」',
		'8羽 「スタンプ スリープ スタディ スマイル」',
		'9羽 「やきもち風味のカモミール」',
		'10羽 「ハートがいっぱいの救援要請」',
		'11羽 「にっこりカフェと七色の魔法使い」',
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
