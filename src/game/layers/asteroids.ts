import { Component } from '../../graphics/component';
import { randomFloat } from '../../utils/math';
import { Layer } from './layer';
import { asteroid } from '../objects/asteroid';
import { Connector } from '../connector';
import { Ship } from '../objects/ship';
import { distanceSquared, Point } from '../../geom/point';

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

	while (count--) {
		const child = asteroid({ pallete, rotationSpeed: 0 });
		child.x = randomFloat(-size2, size2);
		child.y = randomFloat(-size2, size2);
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
						const distance = distanceSquared(b as Point, ship as Point);
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
