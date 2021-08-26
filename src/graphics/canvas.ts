import { dpr } from '../core/window';
import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';

const canvas: HTMLCanvasElement = document.getElementById('c') as HTMLCanvasElement;
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

function colorPattern(color: number, ct: ColorTransform): string {
	let a = color >> 24 & 0xff;
	let r = color >> 16 & 0xff;
	let g = color >> 8 & 0xff;
	let b = color & 0xff;

	a = (a * ct.am + ct.ao) & 0xff;
	r = (r * ct.rm + ct.ro) & 0xff;
	g = (g * ct.gm + ct.go) & 0xff;
	b = (b * ct.bm + ct.bo) & 0xff;

	return `rgba(${r}, ${g}, ${b}, ${a / 0xff})`;
}

export namespace Canvas {
	export function update() {
		canvas.width = (innerWidth * dpr) | 0;
		canvas.height = (innerHeight * dpr) | 0;
	}

	export function drawShape(shape: Array<string | number>, matrix: Matrix, ct: ColorTransform) {
		context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.x, matrix.y);

		context.beginPath();

		for (let i = 0; i < shape.length; i++) {
			switch (shape[i]) {
				case 'f':
					context.fillStyle = colorPattern(shape[++i] as number, ct);
					context.fill();
					break;

				case 's':
					context.strokeStyle = colorPattern(shape[++i] as number, ct);
					context.lineWidth = shape[++i] as number;
					context.stroke();
					break;

				case 'm':
					context.moveTo(shape[++i] as number, shape[++i] as number);
					break;

				case 'l':
					context.lineTo(shape[++i] as number, shape[++i] as number);
					break;

				default:
					// eslint-disable-next-line no-console
					console.error(`unknown command: ${shape[i]}`);
					break;
			}
		}
	}
}
