import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const enum Theme {
	Dark = 'dark',
	Light = 'light',
}

export const theme = writable(getTheme());

function getTheme() {
	if (!browser) {
		return Theme.Dark;
	}

	const theme = localStorage.getItem('theme');
	if (theme && isTheme(theme)) {
		return theme;
	}

	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return Theme.Dark;
	}

	return Theme.Light;
}

function isTheme(theme: string): theme is Theme {
	return theme === Theme.Dark || theme === Theme.Light;
}
