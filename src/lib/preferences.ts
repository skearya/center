import { writable } from 'svelte/store'

interface Preferences {
	spotifyOnStartup: boolean
	spotify: boolean
	pomodoroTime: number
	breakTime: number
}

let local: Preferences = JSON.parse(localStorage.getItem('preferences') || '{}')

if (local.spotifyOnStartup) local.spotify = true

export const preferences = writable<Preferences>(local)

preferences.subscribe((value) => (localStorage.preferences = JSON.stringify(value)))
