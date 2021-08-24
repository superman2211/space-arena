import { updateCanvas } from './graphics/canvas';

function init() {

}

function update() {
	requestAnimationFrame(update);
	updateCanvas();
}

function main() {
	init();
	update();
}

main();
