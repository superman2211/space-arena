import { Component } from '../../graphics/component';
import {
	math2PI, mathCos, mathSin, randomFloat,
} from '../../utils/math';
import { Layer } from './layer';
import { asteroid } from '../objects/asteroid';
import { Connector } from '../connector';
import { Ship } from '../objects/ship';
import { Point } from '../../geom/point';

interface AsteroidsOptions {
	size: number;
	count: number;
	parallax: number;
	scale: number;
	brightness: number;
	pallete: number[],
	connector?: Connector,
}

export function asteroids(options: AsteroidsOptions): Layer {
	const children: Component[] = [];

	let { count } = options;
	const {
		scale, parallax, brightness, size, pallete, connector,
	} = options;

	const size2 = size * 1.5 / parallax;
	const centerSize = parallax === 1 ? size2 * 0.2 : 0;

	while (count--) {
		const child = asteroid({ pallete, rotationSpeed: 0 });
		const angle = randomFloat(0, math2PI);
		const length = randomFloat(centerSize, size2);
		child.x = mathCos(angle) * length;
		child.y = mathSin(angle) * length;
		children.push(child);
	}

	return {
		children,
		parallax,
		scale,
		brightness,
		onUpdate() {
			if (this.parallax === 1 && connector) {
				const shipsList: Ship[] = connector.getShips!().children! as Ship[];
				const asteroidsList: Component[] = this.children!;

				asteroidsList.forEach((b) => {
					shipsList.forEach((ship) => {
						const distance = Point.distanceSquared(b as Point, ship as Point);
						const raduises = ship.damageRadius + b.radius! / 3;
						if (distance < raduises * raduises) {
							ship.changeHealth(-1000);
						}
					});
				});
			}
		},
	};
}
