<script lang="ts">
	import '../app.css'
	import { offset, shift } from 'svelte-floating-ui/core'
	import { createFloatingActions } from 'svelte-floating-ui'
	import { fly } from 'svelte/transition'
	import { preferences } from '$lib/preferences.js'

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(15), shift()],
	})

	let showTooltip = false
	let time: string

	setInterval(() => (time = new Date().toLocaleTimeString()), 1000)
</script>

<nav
	class="mx-auto bg-moonlightFocusMedium p-5 drop-shadow-sm overscroll-contain border-b-[1px] border-moonlightSoft"
>
	<div class="flex max-w-screen-md text-lg mx-auto justify-between">
		<h1 class="font-medium">Center</h1>
		<div class="flex gap-x-3 items-center [-webkit-app-region:no-drag]">
			<h1>{time ? time : ''}</h1>
			<button on:click={() => (showTooltip = !showTooltip)}>
				<img
					class="w-5 h-5 aspect-square"
					src="/settings.svg"
					alt="settings"
					use:floatingRef
				/>
			</button>
		</div>
	</div>
</nav>

{#if showTooltip}
	<div
		transition:fly
		class="absolute w-64 bg-moonlightFocusHigh shadow-xl rounded-lg p-4 space-y-4"
		use:floatingContent
	>
		<div class="flex justify-between">
			<h1>Enable Spotify</h1>
			<input
				type="checkbox"
				disabled={!window.electron}
				bind:checked={$preferences.spotify}
			/>
		</div>
		<div class="flex justify-between">
			<h1>Enable Spotify on startup</h1>
			<input
				type="checkbox"
				disabled={!window.electron}
				bind:checked={$preferences.spotifyOnStartup}
			/>
		</div>
		<div class="h-[2px] bg-moonlightPink rounded-full" />
		<div class="flex justify-between">
			<h1>Pomodoro length (minutes)</h1>
			<input
				bind:value={$preferences.pomodoroTime}
				class="bg-black border-[1px] border-moonlightSoft rounded-lg h-6 w-12 p-1 text-right"
				type="number"
			/>
		</div>
		<div class="flex justify-between">
			<h1>Break length (minutes)</h1>
			<input
				bind:value={$preferences.breakTime}
				class="bg-black border-[1px] border-moonlightSoft rounded-lg h-6 w-12 p-1 text-right"
				type="number"
			/>
		</div>
	</div>
{/if}

<slot />

<style lang="postcss">
	:global(body) {
		background-color: theme(colors.moonlightBase);
		color: theme(colors.moonlightWhite);
		font-family: 'Inter', sans-serif;
	}

	@supports (font-variation-settings: normal) {
		:global(body) {
			font-family: 'Inter var', sans-serif;
		}
	}

	@font-face {
		font-family: 'Inter var';
		font-weight: 100 900;
		font-display: swap;
		font-style: normal;
		font-named-instance: 'Regular';
		src: url('/Inter-roman.var.woff2') format('woff2');
	}

	nav {
		-webkit-app-region: drag;
		z-index: 100;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
