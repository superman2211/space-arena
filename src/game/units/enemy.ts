import { Point } from '../../geom/point';
import {
	deltaAngle,
	mathAtan2, mathChance, randomFloat,
} from '../../utils/math';
import {
	Ship, ship, ShipOptions,
} from '../objects/ship';

interface Enemy extends Ship {
	target?: Ship;
	findTargetTime: number;
	targetTime: number;
	rotationTime: number;
	reactionTime: number;
}

export function enemy(options: ShipOptions): Enemy {
	const base = ship(options);

	const sizeSquared = options.size * 0.8 * options.size * 0.8;

	let safeTime = 0;
	let ignoreSafeTime = 0;

	return {
		...base,
		targetTime: 0,
		rotationTime: 0,
		reactionTime: 0,
		findTargetTime: 0,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);

			// check border - safe
			if (ignoreSafeTime > 0) {
				ignoreSafeTime -= time;
			} else {
				const centerDistance = Point.lengthSquared(this as Point);
				if (centerDistance > sizeSquared) {
					this.target = undefined;
					this.rotationTarget = 1;
					safeTime += time;
					if (safeTime > 1) {
						ignoreSafeTime = 2;
					}
					return;
				}
			}

			// rotation
			if (!this.target) {
				this.rotationTime -= time;
				if (this.rotationTime <= 0) {
					if (this.rotationTarget === 0) {
						this.rotationTarget = mathChance() ? -1 : 1;
						this.rotationTime = randomFloat(0.5, 2);
					} else {
						this.rotationTarget = 0;
						this.rotationTime = randomFloat(3, 7);
					}
				}
			}

			// reset target
			this.reactionTime -= time;
			if (this.reactionTime <= 0) {
				this.reactionTime = randomFloat(3, 5);
				this.target = undefined;
				this.findTargetTime = randomFloat(0.5, 2);
			}

			// find target
			this.findTargetTime -= time;
			if (this.findTargetTime <= 0 && !this.target) {
				this.target = options.connector.getShips!().findTarget(this, this.id, 100, 1000);
			}

			// attack
			if (this.target && this.target.health > 0) {
				const targetRotation = mathAtan2(this.target.y! - this.y!, this.target.x! - this.x!);
				this.rotation! += deltaAngle(targetRotation, this.rotation!) * time * 5;
				this.mainFire = true;
				this.shootRocket();
			} else {
				this.mainFire = false;
			}
		},
	};
}
