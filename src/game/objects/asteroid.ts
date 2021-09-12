import { Component } from '../../graphics/component';
import { generateShape } from '../../utils/generate-shape';
import { randomInt } from '../../utils/math';

interface AsteroidOptions {
	pallete: number[],
	rotationSpeed: number,
}

export function asteroid(options: AsteroidOptions): Component {
	const { pallete } = options;
	const shape: number[] = [];
	let count = randomInt(3, 6);

	while (count--) {
		generateShape(
			shape,
			randomInt(0, pallete.length - 1), // color
			randomInt(-50, 50), // x
			randomInt(-50, 50), // y
			7, 15, // count
			40, 70, // size
		);
	}

	return {
		pallete,
		shape,
		rotation: 0,
		radius: 50 + 70,
		x: 0,
		y: 0,
		onUpdate(time) {
			this.rotation! += options.rotationSpeed * time;
		},
	};
}
