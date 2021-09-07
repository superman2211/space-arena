import { Component } from '../../graphics/component';
import { randomInt } from '../../utils/math';
import { Layer } from '../layer';
import { asteroid } from './asteroid';

interface AsteroidsOptions {
	width: number;
	height: number;
	count: number;
	parallax: number;
	scale: number;
	brightness: number;
}

export function asteroids(options: AsteroidsOptions): Layer {
	const children: Component[] = [];

	let { count } = options;
	const { scale, parallax, brightness } = options;

	const pallete = [0xff555555, 0xff666666];

	const halfWidth = options.width / 2;
	const halfHeight = options.height / 2;

	while (count--) {
		const child = asteroid({ pallete });
		child.x = randomInt(-halfWidth, halfWidth);
		child.y = randomInt(-halfHeight, halfHeight);
		children.push(child);
	}

	return {
		children,
		parallax,
		scale,
		brightness,
	};
}
