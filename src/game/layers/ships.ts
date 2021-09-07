import { Point } from '../../geom/point';
import { Component } from '../../graphics/component';
import {
	randomInt, randomFloat, math2PI, mathPI2,
} from '../../utils/math';
import { Layer } from './layer';
import { enemy } from '../units/enemy';
import { player } from '../units/player';
import { SHIPS } from '../objects/ship';

export interface ShipsOptions {
	count: number;
	size: number;
	camera: Point;
}

function randomName(): string {
	return SHIPS[randomInt(0, SHIPS.length - 1)];
}

export function ships(options: ShipsOptions): Layer {
	const children: Component[] = [];

	const { size, camera } = options;
	const size2 = size / 2;

	const pallete = [0xff26333E, 0xff666666, 0xffB3B3AF, 0xffF9AC35, 0xffff0000];

	const playerShip = player({
		name: randomName(), pallete, size2, camera,
	});
	playerShip.rotation = -mathPI2;
	children.push(playerShip);

	let { count } = options;

	while (count--) {
		const child = enemy({
			pallete, name: randomName(), size2,
		});
		child.x = randomFloat(-size2, size2);
		child.y = randomFloat(-size2, size2);
		child.rotation = randomFloat(0, math2PI);
		children.push(child);
	}

	return {
		children,
		parallax: 0,
	};
}
