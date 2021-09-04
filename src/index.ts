import { application } from './game/application';
import { Component } from './graphics/component';
import { Graphics } from './graphics/graphics';
import { loadShapes } from './resources/shapes';

let app: Component;

let oldTime = performance.now();

function calculateTime(): number {
	const currentTime = performance.now();
	const time = currentTime - oldTime;
	oldTime = currentTime;
	return time / 1000;
}

function update() {
	requestAnimationFrame(update);
	Component.update(app, calculateTime());
	Graphics.render(app);
}

function start() {
	app = application({ getWidth: () => innerWidth, getHeight: () => innerHeight });
	console.log(app);
	oldTime = performance.now();
	update();
}

async function preload() {
	await loadShapes();
}

async function main() {
	await preload();
	start();
}

main();
