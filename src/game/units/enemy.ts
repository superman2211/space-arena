import {
	deltaAngle,
	mathAtan2, mathRandom, randomFloat,
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

	const { size2 } = options;

	return {
		...base,
		targetTime: 0,
		rotationTime: 0,
		reactionTime: 0,
		findTargetTime: 0,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);

			// const { x, y } = this;
			// if (x! < -size2 || size2 < x! || y! < -size2 || size2 < y!) {
			// 	this.rotation = randomFloat(0, math2PI);
			// }

			// rotation
			if (!this.target) {
				this.rotationTime -= time;
				if (this.rotationTime <= 0) {
					if (this.rotationTarget === 0) {
						this.rotationTarget = mathRandom() < 0.5 ? -1 : 1;
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
				this.target = options.connector.getShips!().findTarget(this, this.id, 1000);
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
