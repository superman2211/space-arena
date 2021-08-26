import { Component } from './component';
import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';

const matrix = Matrix.empty();
const colorTransform = ColorTransform.empty();

const canvas: HTMLCanvasElement = document.getElementById('c') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

function updateSize() {
	const d = devicePixelRatio;

	const w = (innerWidth * d) | 0;
	const h = (innerHeight * d) | 0;

	canvas.width = w;
	canvas.height = h;

	matrix.a = matrix.d = d;
}

function clean() {
	context.setTransform();
	context.fillStyle = 'white';
	context.fillRect(0, 0, canvas.width, canvas.height);
}

export namespace Graphics {
	export function render(component: Component) {
		updateSize();
		clean();
		Component.render(component, matrix, colorTransform, context);
	}
}
