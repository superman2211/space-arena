import { dpr } from './core/window';
import { ColorTransform } from './geom/color';
import { Matrix } from './geom/matrix';
import { Canvas } from './graphics/canvas';

function init() {

}

function drawShip() {
	const matrix = Matrix.empty();
	Matrix.box(matrix, 50, 50, dpr, dpr, 0);

	const ct = ColorTransform.empty();
	ColorTransform.alpha(ct, 0.5);

	Canvas.drawShape(
		[
			'm', 10, 10, 'l', 100, 10, 'l', 50, 100, 'f', 0xffff0000, 's', 0xff0000ff, 3,
			'm', 100, 100, 'l', 200, 100, 'l', 200, 200, 'l', 100, 200, 'l', 100, 100, 's', 0xff0000ff, 2,
		],
		matrix,
		ct,
	);
}

function update() {
	requestAnimationFrame(update);
	Canvas.update();
	drawShip();
}

function main() {
	init();
	update();
}

main();
