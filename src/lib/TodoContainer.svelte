<script lang="ts">
	import { onMount } from 'svelte'
	import { browser } from '$app/environment'
	import TodoList from './TodoList.svelte'

	interface Todo {
		id: string
		name: string
		completed: boolean
	}

	let todos: Todo[] = []
	let input = ''
	let view: 'active' | 'completed' = 'active'

	onMount(() => {
		todos = JSON.parse(localStorage.getItem('todos') || '[]')
	})

	function addTodo() {
		if (input == '') return
		todos = [
			{
				id: Math.random().toString(16).slice(2),
				name: input,
				completed: false,
			},
			...todos,
		]
		input = ''
	}

	$: {
		if (browser && todos.length != 0) {
			localStorage.setItem('todos', JSON.stringify(todos))
		}
	}
	$: completedTodos = todos.filter((todo) => todo.completed)
	$: uncompletedTodos = todos.filter((todo) => !todo.completed)
</script>

<section class="flex h-full flex-col">
	<section class="flex h-full flex-col overflow-hidden bg-moonlightBase">
		<form
			on:submit|preventDefault={addTodo}
			class="flex flex-col justify-between border-b border-moonlightSoft p-3"
		>
			<input
				class="h-[50px] w-full rounded-md bg-moonlightFocusHigh p-3 outline-none transition-all placeholder:italic focus:bg-zinc-900 focus:placeholder:text-moonlightWhite"
				type="text"
				bind:value={input}
				placeholder="what needs to be done?"
			/>
		</form>

		<div class="h-full overflow-scroll px-3 pt-3 [scrollbar-width:thin]">
			{#if view == 'active'}
				<TodoList bind:todos bind:focusedTodos={uncompletedTodos} />
			{:else if view == 'completed'}
				<TodoList bind:todos bind:focusedTodos={completedTodos} />
			{/if}
		</div>

		<div
			class="flex w-full justify-evenly bg-moonlightOverlay text-moonlightStone border-t border-moonlightSoft"
		>
			<button
				class:selected={view == 'active'}
				on:click={() => (view = 'active')}
				class="w-full border-r border-moonlightSoft p-3"
			>
				Active
			</button>
			<button
				class:selected={view == 'completed'}
				on:click={() => (view = 'completed')}
				class="w-full p-3"
			>
				Completed
			</button>
		</div>
	</section>
</section>

<style lang="postcss">
	.selected {
		background: theme(colors.moonlightFocusHigh);
		color: theme(colors.moonlightWhite);
	}
</style>
