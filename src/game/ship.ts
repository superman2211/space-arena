import { Component } from '../graphics/component';
import { FILL, PATH, STROKE } from '../graphics/shape';

interface ShipOptions {
	colors: number[],
}

export function ship(options: ShipOptions): Component {
	const [color0, color1, color2, color3] = options.colors;

	const shape = [
		PATH, 4, 191, 217, 175, 207, 148, 235, 191, 217, FILL, color0,
		PATH, 5, 139, 239, 127, 240, 127, 248, 142, 248, 139, 239, FILL, color0,
		PATH, 5, 154, 116, 143, 99, 143, 143, 156, 159, 154, 116, FILL, color0,
		PATH, 3, 137, 58, 127, 45, 127, 59, FILL, color0,
		PATH, 4, 191, 184, 199, 191, 223, 159, 191, 184, FILL, color0,
		PATH, 5, 175, 35, 170, 31, 165, 105, 180, 100, 175, 35, FILL, color0,

		PATH, 6, 139, 163, 127, 160, 127, 224, 140, 220, 153, 192, 139, 163, FILL, color1,
		PATH, 5, 127, 105, 127, 135, 135, 127, 135, 111, 127, 105, FILL, color1,

		PATH, 27, 199, 191, 191, 184, 156, 159, 143, 143, 143, 99, 137, 58, 127, 59, 127, 105, 135, 111, 135, 127, 127, 135, 127, 160, 139, 163, 153, 192, 140, 220, 127, 224, 127, 240, 139, 239, 148, 235, 175, 207, 191, 217, 148, 235, 164, 247, 207, 223, 244, 159, 223, 159, 199, 191, FILL, color2,
		PATH, 13, 182, 26, 171, 15, 170, 31, 175, 35, 180, 100, 165, 105, 164, 116, 154, 116, 156, 159, 220, 136, 220, 122, 203, 111, 182, 26, FILL, color2,

		PATH, 5, 171, 15, 182, 26, 203, 111, 220, 122, 220, 136, STROKE, color3, 4,
	];

	return {
		scale: 1,
		children: [
			{
				shape, x: -127, y: -127,
			},
			{
				shape, scaleX: -1, x: 128, y: -127,
			},
		],
	} as Component;
}
