import { Component } from '../../graphics/component';
import { LINE, MOVE, STROKE } from '../../graphics/shape';
import { mathCos, mathSin } from '../../utils/math';
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
	destroy?: (b: Bullet) => void,
}

export function bullet(options: BulletOptions): Bullet {
	const {
		speed, distance, width, length, color, damage, type,
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
			const delta = speed * time;
			this.x! += delta * mathCos(this.rotation!);
			this.y! += delta * mathSin(this.rotation!);

			this.distance += delta;

			if (this.distance > distance) {
				options.destroy!(this);
			}
		},
	};
}
