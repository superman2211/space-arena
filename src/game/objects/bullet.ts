import { Point, pointLengthSquared } from '../../geom/point';
import { Component } from '../../graphics/component';
import { LINE, MOVE, STROKE } from '../../graphics/shape';
import {
	deltaAngle, mathAtan2, mathCos, mathPI, mathSin,
} from '../../utils/math';
import { Connector } from '../connector';
import { exhaust } from '../effects/exhaust';
import { Ship } from './ship';

export const BULLET = 0;
export const ROCKET = 1;
export const BOMB = 2;

export interface Bullet extends Component {
	speed: number;
	distance: number;
	id: number;
	damage: number,
	type: number,
	target?: Ship,
}

export interface BulletOptions {
	id: number,
	damage: number,
	speed: number,
	acceleration: number,
	distance: number,
	color: number,
	width: number,
	length: number,
	type: number,
	size: number,
	connector: Connector;
}

export function bullet(options: BulletOptions): Bullet {
	const {
		speed, distance, width, length, color, damage, type, connector, id, acceleration, size,
	} = options;

	const sizeSquared = size * size;

	let exhaustTime = 0;

	return {
		type,
		damage,
		speed,
		id,
		x: 0,
		y: 0,
		rotation: 0,
		distance: 0,
		pallete: [color],
		radius: length + width,
		shape: [MOVE, 0, 0, LINE, length, 0, STROKE, 0, width],
		onUpdate(time) {
			if (this.type === ROCKET) {
				if (this.target && this.target.health <= 0) {
					this.target = undefined;
				}

				if (!this.target) {
					this.target = connector.getShips!().findTarget(this, this.id, 100, 2000);
				}

				if (this.target) {
					const targetRotation = mathAtan2(this.target.y! - this.y!, this.target.x! - this.x!);
					this.rotation! += deltaAngle(targetRotation, this.rotation!) * time * 5;
				}

				this.speed += time * acceleration;

				// exhaust
				exhaustTime -= time;
				if (exhaustTime <= 0) {
					exhaustTime = 0.01;
					exhaust(this as Point, this.rotation! + mathPI, 0, connector);
				}
			}

			const delta = this.speed * time;
			this.x! += delta * mathCos(this.rotation!);
			this.y! += delta * mathSin(this.rotation!);

			// check distance
			this.distance += delta;
			if (this.distance > distance) {
				connector.getBullets!().destroy!(this);
			}

			// check border
			const centerDistance = pointLengthSquared(this as Point);
			if (centerDistance > sizeSquared) {
				connector.getBullets!().destroy!(this);
			}
		},
	};
}
