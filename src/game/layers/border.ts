import { Component } from '../../graphics/component';
import {
	math2PI, mathCos, mathSin, randomFloat,
} from '../../utils/math';
import { asteroid } from '../objects/asteroid';
import { Layer } from './layer';

interface BorderOptions {
	size: number,
	parallax: number,
}

export function border(options: BorderOptions): Layer {
	const { size, parallax } = options;

	const children: Component[] = [];

	const count = 200;
	const step = math2PI / count;

	const pallete = [0xff550000, 0xff990000];

	for (let i = 0; i < count; i++) {
		const child = asteroid({ pallete, rotationSpeed: randomFloat(-5, 5) });
		const angle = step * i;
		child.x = mathCos(angle) * size + randomFloat(-30, 30);
		child.y = mathSin(angle) * size + randomFloat(-30, 30);
		child.scale = randomFloat(0.2, 0.4);
		child.rotation = 0;
		children.push(child);
	}

	return {
		children,
		parallax,
		rotation: 0,
		onUpdate(time) {
			this.rotation! += time * 0.3;
		},
	};
}
