<script lang="ts">
	import { preferences } from '$lib/preferences'

	let interval: NodeJS.Timeout
	let seconds = $preferences.pomodoroTime * 60 || 1500
	let state: 'pomodoro' | 'break' = 'pomodoro'
	let running = false
	let paused: boolean

	function startPomodoro(time?: any) {
		running = true
		state = 'pomodoro'
		paused = false
		if (!time) seconds = $preferences.pomodoroTime * 60
		interval = setInterval(() => {
			if (seconds == 0) {
				clearInterval(interval)
				return startBreak()
			}
			seconds--
		}, 1000)
	}

	function startBreak(time?: number) {
		state = 'break'
		paused = false
		if (!time) seconds = $preferences.breakTime * 60 || 300
		interval = setInterval(() => {
			if (seconds == 0) {
				clearInterval(interval)
				return startPomodoro()
			}
			seconds--
		}, 1000)
	}

	function toggle() {
		if (paused) {
			if (state == 'pomodoro') {
				startPomodoro(seconds)
			} else if (state == 'break') {
				startBreak(seconds)
			}
		} else {
			clearInterval(interval)
			paused = true
		}
	}

	function skipBreak() {
		clearInterval(interval)
		startPomodoro()
	}

	const secondsToMinutes = (seconds: number) => {
		return Math.floor(seconds / 60) + ':' + ('0' + Math.floor(seconds % 60)).slice(-2)
	}

	$: formatted = secondsToMinutes(seconds)
</script>

<main class="flex h-full flex-col items-center justify-between p-5 gap-4">
	<div class="flex gap-2 rounded-md bg-moonlightFocusMedium p-1 text-moonlightStone text-lg">
		<div class:selected={state == 'pomodoro'} class="rounded-md p-2">Pomodoro</div>
		<div class:selected={state == 'break'} class="rounded-md p-2">Break</div>
	</div>
	<h1 class="text-7xl">{formatted}</h1>
	<div class="space-x-3">
		{#if running}
			<button on:click={toggle} class="text-xl">{paused ? 'Resume' : 'Pause'}</button>
			{#if state == 'break'}
				<button on:click={skipBreak} class="text-xl">Skip</button>
			{/if}
		{:else}
			<button on:click={startPomodoro} class="text-xl">Start</button>
		{/if}
	</div>
</main>

<style lang="postcss">
	.selected {
		background-color: theme(colors.moonlightSoft);
		color: theme(colors.moonlightWhite);
	}
</style>
