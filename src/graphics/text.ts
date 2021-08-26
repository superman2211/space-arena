import { ColorTransform } from '../geom/color';

export interface Text {
	value: string;
	color?: number;
	font?: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function renderText(text: Text, ct: ColorTransform, context: CanvasRenderingContext2D) {
	throw 'not implemented';
}
