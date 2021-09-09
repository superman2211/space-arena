import { Component } from '../../graphics/component';
import { LINE, MOVE, STROKE } from '../../graphics/shape';
import {
	deltaAngle, mathAtan2, mathCos, mathSin,
} from '../../utils/math';
import { Connector } from '../layers/connector';
import { Ship } from './ship';

export const BULLET = 0;
export const ROCKET = 1;
export const BOMB = 2;

export interface Bullet extends Component {
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
	distance: number,
	color: number,
	width: number,
	length: number,
	type: number,
	connector: Connector;
}

export function bullet(options: BulletOptions): Bullet {
	const {
		speed, distance, width, length, color, damage, type, connector,
	} = options;

	return {
		type,
		damage,
		id: options.id,
		x: 0,
		y: 0,
		rotation: 0,
		distance: 0,
		pallete: [color],
		shape: [MOVE, 0, 0, LINE, length, 0, STROKE, 0, width],
		onUpdate(time) {
			if (this.type === ROCKET) {
				if (this.target && this.target.health <= 0) {
					this.target = undefined;
				}

				if (!this.target) {
					this.target = connector.getShips!().findTarget(this);
				}

				if (this.target) {
					const targetRotation = mathAtan2(this.target.y! - this.y!, this.target.x! - this.x!);
					this.rotation! += deltaAngle(targetRotation, this.rotation!) * time * 5;
				}
			}

			const delta = speed * time;
			this.x! += delta * mathCos(this.rotation!);
			this.y! += delta * mathSin(this.rotation!);

			this.distance += delta;

			if (this.distance > distance) {
				connector.getBullets!().destroy!(this);
			}
		},
	};
}
