import { Shape } from '../graphics/shape';

const SHAPES = [
	'ship01',
	'ship02',
	'ship03',
	'ship04',
	'ship05',
];

let DATAS: Shape[];

export async function loadShapes() {
	const promises = SHAPES.map(async (shape) => {
		const response = await fetch(`shapes/${shape}`);
		const buffer = await response.arrayBuffer();
		const data = new Uint8Array(buffer);
		return data;
	});
	DATAS = await Promise.all(promises);
}

export function getShape(name: string): Shape {
	return DATAS[SHAPES.indexOf(name)];
}
