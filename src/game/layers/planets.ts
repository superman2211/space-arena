import { Component } from '../../graphics/component';
import { Pattern } from '../../graphics/pattern';
import { Layer } from './layer';

interface PlanetsOptions {
	size: number;
	parallax: number;
}

function createPlanet(size: number, colors: number[], ratios: number[], shadow: boolean): HTMLCanvasElement {
	const image: HTMLCanvasElement = document.createElement('canvas');
	image.width = size;
	image.height = size;

	const size2 = size / 2;

	const context = image.getContext('2d')!;

	const pattern = context.createRadialGradient(size2, size2, 0, size2, size2, size2);
	colors.forEach((color, index) => {
		pattern.addColorStop(ratios[index], Pattern.easyColor(color));
	});

	context.fillStyle = pattern;
	context.fillRect(0, 0, size, size);

	// if (shadow) {
	// 	const size24 = size / 2 + size / 4;
	// 	const shadowPattern = context.createRadialGradient(size24, size24, 0, size24, size24, size2);
	// 	shadowPattern.addColorStop(0, Pattern.easyColor(0x00000000));
	// 	shadowPattern.addColorStop(1, Pattern.easyColor(0xff000000));
	// 	context.globalCompositeOperation = 'darken';
	// 	context.fillStyle = shadowPattern;
	// 	context.fillRect(0, 0, size, size);
	// 	context.globalCompositeOperation = 'source-over';
	// }
	return image;
}

export function planets(options: PlanetsOptions): Layer {
	const {
		parallax, size,
	} = options;

	const size2 = size / 2;

	const children: Component[] = [
		{
			// sun
			image: createPlanet(
				2048,
				[0xffffff00, 0xffffff00, 0x66ffff00, 0],
				[0, 0.3, 0.33, 1],
				false,
			),
			x: size2 / 2 - 1024,
			y: size2 / 2 - 1024,
		},
		{
			// earth
			image: createPlanet(
				1024,
				[0xff009900, 0xff009900, 0x33009900, 0],
				[0, 0.5, 0.53, 1],
				true,
			),
			x: -size2 / 2 - 512,
			y: -size2 / 2 - 512,
		},
		{
			// moon
			image: createPlanet(
				512,
				[0xff999999, 0xff999999, 0x22000000, 0x22000000, 0],
				[0, 0.5, 0.53, 0.6, 1],
				true,
			),
			x: -size2 / 2 - 512,
			y: -size2 / 2 - 512 + 128,
		},
		{
			// mars
			image: createPlanet(
				1536,
				[0xffbb0000, 0xffbb0000, 0x22bb0000, 0],
				[0, 0.3, 0.33, 1],
				true,
			),
			x: size2 / 2 - 768,
			y: -size2 / 2 - 768,
		},
		{
			// black
			image: createPlanet(
				2048,
				[0xff000000, 0xff000000, 0xaa000000, 0],
				[0, 0.3, 0.33, 1],
				false,
			),
			x: -size2 / 2 - 1024,
			y: size2 / 2 - 1024,
		},
	];

	return {
		children,
		parallax,
	};
}
