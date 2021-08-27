import { Component } from './component';
import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';

const matrix = Matrix.empty();
const colorTransform = ColorTransform.empty();

const canvas: HTMLCanvasElement = document.getElementById('c') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

const dpr = devicePixelRatio;

function updateSize() {
	const w = (innerWidth * dpr) | 0;
	const h = (innerHeight * dpr) | 0;

	if (w !== canvas.width) {
		canvas.width = w;
	}

	if (h !== canvas.height) {
		canvas.height = h;
	}

	matrix.a = matrix.d = dpr;
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
