import { Component } from '../../graphics/component';
import { FILL, PATH, Shape } from '../../graphics/shape';
import {
	randomInt, mathRandom, mathCos, mathSin,
} from '../../utils/math';

function generate(array: number[], color: number, x: number, y: number, countMin: number, countMax: number, radiusMin: number, radiusMax: number): Shape {
	let count = randomInt(countMin, countMax);

	array.push(PATH, count);

	const angleStep = Math.PI * 2 / count;
	let angle = Math.PI * mathRandom();

	while (count--) {
		array.push(
			x + mathSin(angle) * randomInt(radiusMin, radiusMax),
			y + mathCos(angle) * randomInt(radiusMin, radiusMax),
		);
		angle += angleStep;
	}

	array.push(FILL, color);

	return new Uint8Array(array);
}

interface AsteroidOptions {
	pallete: number[],
}

export function asteroid(options: AsteroidOptions): Component {
	const { pallete } = options;
	const array: number[] = [];
	let count = randomInt(3, 6);

	while (count--) {
		generate(
			array, randomInt(0, pallete.length - 1),
			randomInt(127 - 50, 127 + 50), // x
			randomInt(127 - 50, 127 + 50), // y
			7, 15,
			40, 70,
		);
	}

	const shape: Shape = new Uint8Array(array);

	return {
		children: [
			{
				pallete,
				shape,
				x: -127,
				y: -127,
			},
		],
	};
}
