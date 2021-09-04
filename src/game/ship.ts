import { Component } from '../graphics/component';
import { getShape } from '../resources/shapes';

interface ShipOptions {
	pallete: number[],
	name: string,
}

export function ship(options: ShipOptions): Component {
	const { pallete, name } = options;
	const shape = getShape(name);
	return {
		scale: 1,
		children: [
			{
				shape, pallete, x: -127, y: -127,
			},
			{
				shape, pallete, scaleX: -1, x: 128, y: -127,
			},
		],
	} as Component;
}
