import { Component } from '../graphics/component';
import { FILL, PATH, Shape } from '../graphics/shape';

function random(min: number, max: number): number {
	return Math.round(min + Math.random() * (max - min));
}

function generate(array: number[], color: number, countMin: number, countMax: number, radiusMin: number, radiusMax: number): Shape {
	let count = random(countMin, countMax);

	array.push(PATH, count);

	const angleStep = Math.PI * 2 / count;
	let angle = Math.PI * Math.random();

	while (count--) {
		array.push(
			127 + Math.cos(angle) * random(radiusMin, radiusMax),
			127 + Math.sin(angle) * random(radiusMin, radiusMax),
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
	generate(array, 0, 7, 15, 80, 120);
	generate(array, 1, 5, 10, 50, 90);
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
