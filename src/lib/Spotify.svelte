<script lang="ts">
	import { onDestroy, onMount } from 'svelte'
	import { blur } from 'svelte/transition'
	import { preferences } from '$lib/preferences.js'

	interface SpotifyState {
		volume: number
		position: number
		state: 'playing' | 'paused'
	}

	interface SpotifyTrack {
		artist: string
		album: string
		disc_number: number
		duration: number
		played_count: number
		track_number: number
		popularity: number
		id: string
		name: string
		album_artist: string
		artwork_url: string
		spotify_url: string
	}

	let song: SpotifyTrack
	let state: SpotifyState
	let interval: NodeJS.Timeout
	let alerted: boolean

	onMount(() => {
		window.electron.send('state')

		interval = setInterval(() => {
			window.electron.send('song')
		}, 1000)

		window.electron.receive('err', (data: any) => {
			$preferences.spotify = false
			clearInterval(interval)
			if (!alerted) alert(data + 'is spotify running?')
			alerted = true
		})

		window.electron.receive('state', (data: any) => {
			state = data
		})

		window.electron.receive('track', async (data: any) => {
			if (song?.name != data.name) song = data
			await delay(500)
			window.electron.send('state')
		})
	})

	onDestroy(() => {
		clearInterval(interval)
	})

	function delay(time: number) {
		return new Promise((resolve) => setTimeout(resolve, time))
	}
</script>

{#key song}
	<main
		transition:blur={{ duration: 300 }}
		class="h-full flex justify-center items-center gap-8 p-8"
	>
		{#if song}
			<div>
				<img
					src={song.artwork_url}
					class="aspect-square lg:w-48 w-32 rounded-lg drop-shadow-xl"
					alt="album art"
				/>
			</div>
			<div class="flex flex-col">
				<div class="mt-5 text-ellipsis max-w-lg">
					<h1 class="font-bold lg:text-3xl text-xl mb-2">
						{song.name}
					</h1>
					<h1 class="lg:text-xl">{song.artist}</h1>
					<h1 class="lg:text-xl">{song.album}</h1>
				</div>
				<div class="flex class mt-1 -ml-1">
					<button on:click={() => window.electron.send('previous')}>
						<img src="/left.svg" alt="left" />
					</button>
					<button
						on:click={async () => {
							window.electron.send('playPause')
							await delay(500)
							window.electron.send('state')
						}}
					>
						{#if state?.state == 'playing'}
							<img src="/pause.svg" alt="pause" />
						{:else}
							<img src="/play.svg" alt="play" />
						{/if}
					</button>
					<button on:click={() => window.electron.send('next')}>
						<img src="/right.svg" alt="right" />
					</button>
				</div>
			</div>
		{:else}
			<h1 class="text-3xl animate-pulse">Loading... (is spotify running?)</h1>
		{/if}
	</main>
{/key}
