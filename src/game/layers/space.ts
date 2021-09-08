import { Component } from '../../graphics/component';
import { Pattern } from '../../graphics/pattern';
import {
	mathPI2, mathRandom, randomFloat, randomInt,
} from '../../utils/math';
import { Layer } from './layer';

interface SpaceOptions {
	size: number;
	stars: number;
	bigStartsChance: number,
	parallax: number;
}

function createStars(count: number, size: number, bigStartsChance: number): HTMLCanvasElement {
	const image: HTMLCanvasElement = document.createElement('canvas');
	image.width = size;
	image.height = size;

	const context = image.getContext('2d')!;

	const starSize = 3;

	while (count--) {
		const x = randomFloat(starSize, size - starSize);
		const y = randomFloat(starSize, size - starSize);

		let radius = randomFloat(starSize / 2, starSize);

		if (mathRandom() < bigStartsChance) {
			radius *= 2;
		}

		context.fillStyle = Pattern.easyColor(randomInt(0xff999999, 0xffffffff));
		context.beginPath();
		context.arc(x, y, radius, 0, mathPI2);
		context.fill();
	}
	return image;
}

export function space(options: SpaceOptions): Layer {
	const {
		stars, parallax, size, bigStartsChance,
	} = options;

	const starsSize = 2048;
	const image: HTMLCanvasElement = createStars(stars, starsSize, bigStartsChance);

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
