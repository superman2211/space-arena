import { Component } from '../../graphics/component';
import { randomFloat } from '../../utils/math';
import { Layer } from './layer';
import { asteroid } from '../objects/asteroid';

interface AsteroidsOptions {
	size: number;
	count: number;
	parallax: number;
	scale: number;
	brightness: number;
	pallete: number[],
}

export function asteroids(options: AsteroidsOptions): Layer {
	const children: Component[] = [];

	let { count } = options;
	const {
		scale, parallax, brightness, size, pallete,
	} = options;

	const size2 = size * 1.5 / parallax;

	while (count--) {
		const child = asteroid({ pallete, rotationSpeed: 0 });
		child.x = randomFloat(-size2, size2);
		child.y = randomFloat(-size2, size2);
		children.push(child);
	}

	return {
		children,
		parallax,
		scale,
		brightness,
	};
}
