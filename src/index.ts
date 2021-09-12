import { Application, application } from './game/application';
import { Component } from './graphics/component';
import { Graphics } from './graphics/graphics';
import { loadShapes } from './resources/shapes';

let app: Application;

let oldTime = performance.now();

function calculateTime(): number {
	const currentTime = performance.now();
	const time = currentTime - oldTime;
	oldTime = currentTime;
	return time / 1000;
}

function update() {
	requestAnimationFrame(update);
	const time = calculateTime();
	Component.update(app, time);
	app.updateView(time);
	Graphics.render(app);
}

function start() {
	app = application({ getWidth: () => innerWidth, getHeight: () => innerHeight });

	oldTime = performance.now();
	update();

	document.addEventListener('keydown', (e) => {
		Component.keyDown(app, e);
		e.preventDefault();
	});
	document.addEventListener('keyup', (e) => {
		Component.keyUp(app, e);
		e.preventDefault();
	});
}

async function preload() {
	await loadShapes();
}

async function main() {
	await preload();
	start();
}

main();
