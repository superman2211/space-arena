import { Shape } from '../../graphics/shape';
import { Transform } from '../../graphics/transform';
import { generateShape } from '../../utils/generate-shape';
import {
	math2PI, randomFloat, randomInt,
} from '../../utils/math';
import { Connector } from '../connector';

export function explosion(component: Transform, pallete: number[], connector: Connector) {
	// ship
	let count = 20;
	const radius = 10;
	while (count--) {
		const shape: Shape = [];

		generateShape(shape, 0, 0, 0, 5, 10, radius / 2, radius);

		const color = pallete[randomInt(0, pallete.length)];

		connector.getParticles!().create({
			x: component.x!,
			y: component.y!,
			pallete: [color],
			speed: randomFloat(2, 5),
			rotation: randomFloat(0, math2PI),
			shape,
			time: randomFloat(0.5, 0.7),
			alpha: 2,
			connector,
			radius,
		});
	}

	// fire & smoke
	const firePallete = [0x99999999, 0x99666666];
	const fireRadius = 20;
	count = 50;
	while (count--) {
		const shape: Shape = [];

		generateShape(shape, 0, 0, 0, 5, 10, fireRadius / 2, fireRadius);

		const color = firePallete[randomInt(0, firePallete.length)];

		connector.getParticles!().create({
			x: component.x!,
			y: component.y!,
			pallete: [color],
			speed: randomFloat(0, 5),
			rotation: randomFloat(0, math2PI),
			shape,
			time: randomFloat(0.5, 0.7),
			alpha: 2,
			connector,
			radius,
		});
	}

	connector.getGame!().shakingTime = 0.5;
}
