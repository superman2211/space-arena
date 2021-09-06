import { Component } from '../graphics/component';
import { FILL, PATH, Shape } from '../graphics/shape';

function random(min: number, max: number): number {
	return Math.round(min + Math.random() * (max - min));
}

function generate(array: number[], color: number, x: number, y: number, countMin: number, countMax: number, radiusMin: number, radiusMax: number): Shape {
	let count = random(countMin, countMax);

	array.push(PATH, count);

	const angleStep = Math.PI * 2 / count;
	let angle = Math.PI * Math.random();

	while (count--) {
		array.push(
			x + Math.cos(angle) * random(radiusMin, radiusMax),
			y + Math.sin(angle) * random(radiusMin, radiusMax),
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
	let count = random(3, 6);

	while (count--) {
		generate(
			array, random(0, pallete.length - 1),
			random(127 - 50, 127 + 50), random(127 - 50, 127 + 50),
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
