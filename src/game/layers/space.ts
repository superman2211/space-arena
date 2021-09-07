import { Component } from '../../graphics/component';
import { mathPI2, randomFloat, randomInt } from '../../utils/math';
import { Layer } from './layer';

interface SpaceOptions {
	size: number;
	stars: number;
	parallax: number;
}

function createStars(count: number, size: number): HTMLCanvasElement {
	const image: HTMLCanvasElement = document.createElement('canvas');
	image.width = size;
	image.height = size;

	const context = image.getContext('2d')!;

	const starSize = 3;

	while (count--) {
		const x = randomFloat(starSize, size - starSize);
		const y = randomFloat(starSize, size - starSize);
		const radius = randomFloat(starSize / 2, starSize);

		context.fillStyle = `#${randomInt(0x999999, 0xffffff).toString(16)}`;
		context.beginPath();
		context.arc(x, y, radius, 0, mathPI2);
		context.fill();
	}
	return image;
}

export function space(options: SpaceOptions): Layer {
	const {
		stars, parallax, size,
	} = options;

	const starsSize = 2048;
	const image: HTMLCanvasElement = createStars(stars, starsSize);

	const children: Component[] = [];

	for (let ix = -size; ix < size; ix += starsSize) {
		for (let iy = -size; iy < size; iy += starsSize) {
			children.push(
				{
					image,
					x: ix,
					y: iy,
				},
			);
		}
	}

	return {
		children,
		parallax,
	};
}
