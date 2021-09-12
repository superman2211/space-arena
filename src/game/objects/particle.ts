import { Component } from '../../graphics/component';
import { Shape } from '../../graphics/shape';
import { mathCos, mathSin } from '../../utils/math';
import { Connector } from '../connector';

export interface ParticleOptions {
	x: number;
	y: number;
	speed: number;
	acceleration: number;
	rotation: number;
	rotationSpeed: number;
	shape: Shape;
	pallete: number[];
	time: number;
	alpha: number;
	connector: Connector;
}

export function particle(options: ParticleOptions): Component {
	const {
		x, y, speed, acceleration, rotation, rotationSpeed, shape, pallete,
	} = options;

	let lifeTime = 0;

	let speedX = speed * mathCos(rotation);
	let speedY = speed * mathSin(rotation);

	const accelerationX = acceleration * mathCos(rotation);
	const accelerationY = acceleration * mathSin(rotation);

	return {
		x,
		y,
		rotation: 0,
		shape,
		pallete,
		alpha: 1,
		onUpdate(time) {
			speedX += accelerationX;
			speedY += accelerationY;

			this.x! += speedX;
			this.y! += speedY;

			this.rotation! += rotationSpeed;

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
