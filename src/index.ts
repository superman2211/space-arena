/* eslint-disable max-classes-per-file */
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

// declare function jsfxr(params: any): string;

// document.addEventListener('keydown', () => {
// 	// fetch('explosion')
// 	// 	.then((response) => response.arrayBuffer())
// 	// 	.then((buffer) => {
// 	// 		console.log(buffer);

// 	// 	});
// 	// const playString = '1,0,0.2617941639470922,0.4,0.051897348843711735,0.5143744956632581,0.014957228051626005';
// 	const playString = '0,0,0.2996286612451152,0.049831483062296344,0.15737676185023775,0.5703562729712254,0.037420144186540515,-0.3879256862405088,0,0,0,0,0,0.18821061188407817,0.09033692527451312,0,0,0,1,0,0,0.024003649437587614,0,0.5';
// 	const array = playString.split(',').map((i) => parseFloat(i));
// 	console.log(array);
// 	const audio = new Audio();
// 	audio.src = jsfxr(array);
// 	console.log(audio.src);
// 	audio.play();
// 	// const s = new SoundEffect(playString).generate();
// 	// // returns a webaudio object if supported, or an Audio object
// 	// s.getAudio().play();
// });
