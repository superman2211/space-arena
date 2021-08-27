import { ColorTransform } from '../geom/color';
import { Pattern } from './pattern';

export type Shape = Array<number>;

export const MOVE = 0;
export const LINE = 1;
export const FILL = 2;
export const STROKE = 3;

export function parseShape(data: string): Shape {
	// eslint-disable-next-line radix
	return data.split(' ').map((value) => parseInt(value));
}

export function renderShape(shape: Shape, ct: ColorTransform, context: CanvasRenderingContext2D) {
	for (let i = 0; i < shape.length; i++) {
		switch (shape[i]) {
			case FILL:
				context.fillStyle = Pattern.color(shape[++i], ct);
				context.fill();
				break;

			case STROKE:
				context.strokeStyle = Pattern.color(shape[++i], ct);
				context.lineWidth = shape[++i];
				context.stroke();
				break;

			case MOVE:
				context.beginPath();
				context.moveTo(shape[++i], shape[++i]);
				break;

			case LINE:
				context.lineTo(shape[++i], shape[++i]);
				break;

			default:
				throw `unknown command: ${shape[i]}`;
		}
	}
}
