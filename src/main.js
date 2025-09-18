import { mount } from 'svelte';
import './app.css';
import App from './App.svelte';

const target = document.getElementById('app');
if (!(target instanceof HTMLElement)) {
	throw new Error('Missing #app mount target');
}

const app = mount(App, { target });

export default app;
