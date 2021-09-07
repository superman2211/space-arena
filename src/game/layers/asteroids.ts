import { Component } from '../../graphics/component';
import { randomInt } from '../../utils/math';
import { Layer } from './layer';
import { asteroid } from '../objects/asteroid';

interface AsteroidsOptions {
	size: number;
	count: number;
	parallax: number;
	scale: number;
	brightness: number;
}

export function asteroids(options: AsteroidsOptions): Layer {
	const children: Component[] = [];

	let { count } = options;
	const {
		scale, parallax, brightness, size,
	} = options;

	const pallete = [0xff555555, 0xff666666];

	const size2 = size / 2 / parallax;

	while (count--) {
		const child = asteroid({ pallete });
		child.x = randomInt(-size2, size2);
		child.y = randomInt(-size2, size2);
		children.push(child);
	}

	return {
		children,
		parallax,
		scale,
		brightness,
	};
}
