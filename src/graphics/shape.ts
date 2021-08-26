import { ColorTransform } from '../geom/color';
import { Pattern } from './pattern';

export type Shape = Array<string | number>;

export function renderShape(shape: Shape, ct: ColorTransform, context: CanvasRenderingContext2D) {
	for (let i = 0; i < shape.length; i++) {
		switch (shape[i]) {
			case 'f':
				context.fillStyle = Pattern.color(shape[++i] as number, ct);
				context.fill();
				break;

			case 's':
				context.strokeStyle = Pattern.color(shape[++i] as number, ct);
				context.lineWidth = shape[++i] as number;
				context.stroke();
				break;

			case 'm':
				context.beginPath();
				context.moveTo(shape[++i] as number, shape[++i] as number);
				break;

			case 'l':
				context.lineTo(shape[++i] as number, shape[++i] as number);
				break;

			default:
				throw `unknown command: ${shape[i]}`;
		}
	}
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderMesh(shape: Shape, ct: ColorTransform, context: CanvasRenderingContext2D) {
	throw 'not implemented';
}
