<script lang="ts">
	import Pomodoro from '$lib/Pomodoro.svelte'
	import Spotify from '$lib/Spotify.svelte'
	import TodoContainer from '$lib/TodoContainer.svelte'
	import { preferences } from '$lib/preferences.js'
</script>

<main
	class="{!$preferences.spotify
		? 'md:min-h-smaller border-b-0'
		: ''} max-w-screen mx-auto h-[calc(100vh-69px)] lg:min-h-[35rem] md:min-h-[45rem] min-h-[60rem] grid-cols-3 grid-rows-4 grid"
>
	<div
		class="{!$preferences.spotify
			? 'md:full-width'
			: ''} lg:row-span-4 lg:col-span-1 lg:border-b-0 md:row-span-3 md:col-span-2 col-span-3 row-span-2 border-r border-b border-moonlightSoft"
	>
		<TodoContainer />
	</div>
	<div
		class="{!$preferences.spotify
			? 'lg:full-width md:full-width border-b-0'
			: ''} lg:col-span-2 lg:row-span-2 md:col-span-1 md:row-span-3 col-span-3 row-span-2 border-b border-moonlightSoft"
	>
		<Pomodoro />
	</div>
	{#if $preferences.spotify}
		<div class="lg:col-span-2 col-span-3 row-span-2 overflow-hidden">
			<Spotify />
		</div>
	{/if}
</main>

<style>
	@media (min-width: 1024px) {
		.lg\:full-width {
			grid-row: span 4 / span 4;
		}
	}

	@media (min-width: 768px) {
		.md\:full-width {
			grid-row: span 4 / span 4;
		}
	}

	@media (min-width: 768px) {
		.md\:min-h-smaller {
			min-height: 30rem;
		}
	}
</style>
