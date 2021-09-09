import { Point } from '../../geom/point';
import { Component } from '../../graphics/component';
import {
	randomInt, randomFloat, math2PI, mathPI2,
} from '../../utils/math';
import { Layer } from './layer';
import { enemy } from '../units/enemy';
import { player } from '../units/player';
import { Ship, SHIPS } from '../objects/ship';
import { Connector } from './connector';

export interface ShipsOptions {
	count: number;
	size: number;
	camera: Point;
	connector: Connector;
}

export interface Ships extends Layer {
	destroy(s: Ship): void;
}

function randomName(): string {
	return SHIPS[randomInt(0, SHIPS.length - 1)];
}

export function ships(options: ShipsOptions): Ships {
	const children: Component[] = [];

	const { size, camera, connector } = options;
	const size2 = size / 2;

	const pallete = [0xff26333E, 0xff666666, 0xffB3B3AF, 0xffF9AC35, 0xffff0000];

	const playerShip = player({
		name: randomName(), pallete, size2, camera, connector,
	});
	playerShip.rotation = -mathPI2;
	children.push(playerShip);

	let { count } = options;

	while (count--) {
		const child = enemy({
			pallete, name: randomName(), size2, connector,
		});
		child.x = randomFloat(-size2, size2);
		child.y = randomFloat(-size2, size2);
		child.rotation = randomFloat(0, math2PI);
		children.push(child);
	}

	const layer: Ships = {
		children,
		parallax: 0,
		destroy(b: Ship): void {
			const index = this.children!.indexOf(b);
			if (index !== -1) {
				this.children!.splice(index, 1);
			}
		},
	};

	options.connector.getShips = () => layer;

	return layer;
}
