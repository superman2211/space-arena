import { Component } from '../../graphics/component';
import { Shape } from '../../graphics/shape';
import { mathCos, mathSin } from '../../utils/math';
import { Connector } from '../connector';

export interface ParticleOptions {
	x: number;
	y: number;
	speed: number;
	rotation: number;
	shape: Shape;
	pallete: number[];
	time: number;
	alpha: number;
	radius: number;
	connector: Connector;
}

export function particle(options: ParticleOptions): Component {
	const {
		x, y, speed, rotation, shape, pallete, radius,
	} = options;

	let lifeTime = 0;

	const speedX = speed * mathCos(rotation);
	const speedY = speed * mathSin(rotation);

	return {
		x,
		y,
		rotation: 0,
		shape,
		pallete,
		alpha: 1,
		radius,
		onUpdate(time) {
			this.x! += speedX;
			this.y! += speedY;

			lifeTime += time;
			if (lifeTime > options.time) {
				this.alpha! -= time * options.alpha;
				if (this.alpha! < 0) {
					options.connector.getParticles!().destroy(this);
				}
			}
		},
	};
}
