import { application } from './game/application';
import { Component } from './graphics/component';
import { Graphics } from './graphics/graphics';

const app = application();

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

function main() {
	update();
}

main();
