<script lang="ts">
	import { fade } from 'svelte/transition'

	interface Todo {
		id: string
		name: string
		completed: boolean
	}

	export let todos: Todo[] = []
	export let focusedTodos: Todo[] = []

	function removeTodo(id: string) {
		todos = todos.filter((todo) => todo.id !== id)
	}
</script>

{#each focusedTodos as todo}
	<div
		in:fade
		class="mb-4 min-h-min rounded-lg bg-moonlightFocusMedium p-4 transition-all hover:border-moonlightWhite"
	>
		<input id="checkbox" class="mr-1 rounded" type="checkbox" bind:checked={todo.completed} />
		<label for="checkbox">{todo.name}</label>
		<button on:click={() => removeTodo(todo.id)} class="float-right">
			<svg
				width="24"
				height="24"
				viewBox="0 0 15 15"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
					fill="currentColor"
					fill-rule="evenodd"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
{/each}

<style lang="postcss">
	svg {
		color: theme(colors.moonlightSoft);
		transition: all 200ms;
	}

	svg:hover {
		color: theme(colors.moonlightPink);
	}
</style>
