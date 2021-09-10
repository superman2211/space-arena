import { distanceSquared, Point } from '../../geom/point';
import { Component } from '../../graphics/component';
import {
	randomInt, randomFloat, math2PI, mathPI2, mathAtan2, mathAbs, deltaAngle,
} from '../../utils/math';
import { Layer } from './layer';
import { enemy } from '../units/enemy';
import { player } from '../units/player';
import { Ship, SHIPS } from '../objects/ship';
import { Connector } from '../connector';
import { Transform } from '../../graphics/transform';

export interface ShipsOptions {
	count: number;
	size: number;
	camera: Point;
	connector: Connector;
	parallax: number,
}

export interface Ships extends Layer {
	destroy(s: Ship): void;
	findTarget(p: Transform, id: number, minDistance: number, maxDistance: number): Ship | undefined;
	start(): void;
}

function randomName(): string {
	return SHIPS[randomInt(0, SHIPS.length - 1)];
}

export function ships(options: ShipsOptions): Ships {
	const {
		size, camera, connector, parallax,
	} = options;

	const pallete = [0xff26333E, 0xff666666, 0xffB3B3AF, 0xffF9AC35, 0xffff0000];

	const layer: Ships = {
		parallax,
		destroy(b: Ship): void {
			const index = this.children!.indexOf(b);
			if (index !== -1) {
				this.children!.splice(index, 1);
			}
		},
		findTarget(t: Transform, id: number, distanceMin: number, distanceMax: number): Ship | undefined {
			const shipsList: Ship[] = this.children! as Ship[];
			let target: Ship | undefined;
			const targetDistanceMin = distanceMin * distanceMin;
			let targetDistanceMax = distanceMax * distanceMax;
			shipsList.forEach((s) => {
				if (s.id !== id) {
					const rotation = mathAtan2(s.y! - t.y!, s.x! - t.x!);
					const deltaRotation = mathAbs(deltaAngle(rotation, t.rotation!));
					if (deltaRotation < 1) {
						const distance = distanceSquared(s as Point, t as Point);
						if (targetDistanceMin < distance && distance < targetDistanceMax) {
							target = s;
							targetDistanceMax = distance;
						}
					}
				}
			});
			return target;
		},
		start() {
			let nextId = 0;

			const children: Component[] = [];

			const playerShip = player({
				name: randomName(), pallete, size, camera, connector, id: nextId++,
			});
			playerShip.rotation = -mathPI2;
			children.push(playerShip);

			let { count } = options;

			while (count--) {
				const child = enemy({
					pallete, name: randomName(), size, connector, id: nextId++,
				});
				child.x = randomFloat(-size, size);
				child.y = randomFloat(-size, size);
				child.rotation = randomFloat(0, math2PI);
				children.push(child);
			}

			this.children = children;
		},
	};

	options.connector.getShips = () => layer;

	return layer;
}
