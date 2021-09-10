import { Component } from '../../graphics/component';
import { FILL, PATH } from '../../graphics/shape';
import {
	randomInt, mathRandom, mathCos, mathSin,
} from '../../utils/math';

function generate(
	array: number[],
	color: number,
	x: number, y: number,
	countMin: number, countMax: number,
	radiusMin: number, radiusMax: number,
) {
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
}

interface AsteroidOptions {
	pallete: number[],
	rotationSpeed: number,
}

export function asteroid(options: AsteroidOptions): Component {
	const { pallete } = options;
	const shape: number[] = [];
	let count = randomInt(3, 6);

	while (count--) {
		generate(
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
	};
}
