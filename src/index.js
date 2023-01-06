import { DateTime, Duration, Interval } from 'luxon'

import config from './site-config-runtime.js'

function formatIntervalMs(interval) {
	const { years, months, days, hours, minutes, seconds, milliseconds } = interval
		.toDuration(['years', 'months', 'days', 'hours', 'minutes', 'seconds', 'milliseconds'])
		.toObject()

	let str = ''

	str += years !== 0 ? `${years}年` : ''
	str += months !== 0 ? `${months}ヶ月` : ''
	str += days !== 0 ? `${days}日` : ''
	str += hours !== 0 ? `${hours}時間` : ''
	str += minutes !== 0 ? `${minutes}分` : ''
	str += `${seconds}.${`${milliseconds}0`.substring(0, 2)}秒`

	return str
}

function formatIntervalD(interval) {
	const { years, months, days } = interval.toDuration(['years', 'months', 'days']).toObject()

	let str = ''

	str += years !== 0 ? `${years}年` : ''
	str += months !== 0 ? `${months}ヶ月` : ''
	str += str === '' || days !== 0 ? `${days.toFixed()}日` : ''

	return str
}

function generateText(now, channel, episodes) {
	const afterLastEpisodeNumber = channel.time.length
	const episodeLength = Duration.fromObject({ minutes: 30 })

	let episodeNumber = afterLastEpisodeNumber

	for (let i = 0; i < channel.time.length; i++) {
		if (now < channel.time[i]) {
			episodeNumber = i
			break
		}
	}

	if (0 < episodeNumber && now < channel.time[episodeNumber - 1].plus(episodeLength)) {
		const episodeTitle = episodes[episodeNumber - 1]
		return {
			main: `${episodeTitle} 放送中`,
			sub: '',
			tweet: `${config.title}は放送開始しました! ${episodeTitle}が放送中です! (${channel.name})`,
		}
	}

	if (episodeNumber === afterLastEpisodeNumber) {
		const lastEpisodeTime = channel.time[channel.time.length - 1].plus(episodeLength)
		const interval = Interval.fromDateTimes(lastEpisodeTime, now)
		const passedTime = formatIntervalD(interval)

		return {
			main: '放送終了',
			sub: `(放送終了から ${passedTime} 経過)`,
			tweet: `${config.title}の放送は終了しました。終了から ${passedTime} 経過しました。 (${channel.name})`,
		}
	}

	const interval = Interval.fromDateTimes(now, channel.time[episodeNumber])
	const timeLeftMsg = formatIntervalMs(interval)

	if (episodeNumber === 0) {
		return {
			main: timeLeftMsg,
			sub: '',
			tweet: `${config.title}まで残り ${timeLeftMsg} (${channel.name})`,
		}
	}

	const episodeTitle = episodes[episodeNumber]
	return {
		main: '放送開始',
		sub: `${episodeTitle}まで残り ${timeLeftMsg}`,
		tweet: `${config.title}は放送開始しました! ${episodeTitle}まで残り ${timeLeftMsg} (${channel.name})`,
	}
}

function generateChannelUrl(channel) {
	let url = new URL(config.publishedUrl)
	url.searchParams.append('channel', channel)
	return url.toString()
}

function generateTimeTable(channels, episodes) {
	const retTable = new Map()
	const finalEpisode = episodes.length

	for (const [key, value] of channels) {
		const time = []
		const vtime = value.time

		let oldTime = DateTime.fromISO(vtime.get(1))
		time.push(oldTime)

		for (let i = 2; i <= finalEpisode; i++) {
			const currentTime = vtime.has(i)
				? DateTime.fromISO(vtime.get(i))
				: oldTime.plus({ days: 7 })

			time.push(currentTime)
			oldTime = currentTime
		}

		retTable.set(key, { name: value.name, time })
	}

	return retTable
}

const episodes = config.episodes
const timeTable = generateTimeTable(config.channels, episodes)
let channelId = config.defaultChannelId

{
	const params = new URLSearchParams(window.location.search)
	const channel = params.get('channel')
	if (channel !== null && config.channels.has(channel)) {
		channelId = channel
	}
}

function updateTextContent(elm, text) {
	if (elm.textContent !== text) {
		elm.textContent = text
	}
}

document.addEventListener('DOMContentLoaded', () => {
	const display = document.getElementById('time-display')
	const subdisplay = document.getElementById('time-sub-display')

	const channel = document.getElementById('channel')

	for (const [key, value] of config.channels) {
		const elm = document.createElement('option')
		elm.setAttribute('value', key)
		elm.appendChild(document.createTextNode(value.name))
		channel.appendChild(elm)
	}

	channel.value = channelId

	channel.addEventListener('change', (e) => {
		channelId = e.target.value
		window.history.replaceState(null, null, generateChannelUrl(channelId))
	})

	window.setInterval(() => {
		const text = generateText(DateTime.now(), timeTable.get(channelId), episodes)
		updateTextContent(display, text.main)
		updateTextContent(subdisplay, text.sub)
	}, 10)

	document.getElementById('tweet').addEventListener('click', () => {
		let url = new URL('https://twitter.com/intent/tweet')
		url.searchParams.append(
			'text',
			generateText(DateTime.now(), timeTable.get(channelId), episodes).tweet
		)
		url.searchParams.append('url', generateChannelUrl(channelId))
		url.searchParams.append('hashtags', config.hashtags)
		window.open().location.href = url.toString()
	})
})
