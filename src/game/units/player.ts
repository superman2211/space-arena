import { Point } from '../../geom/point';
import { playLaser } from '../../media/sound-effect';
import { Ship, ship, ShipOptions } from '../objects/ship';

interface PlayerOptions extends ShipOptions {
	camera: Point;
}

export function player(options: PlayerOptions): Ship {
	const base = ship(options);

	return {
		...base,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);
			options.camera.x = this.x!;
			options.camera.y = this.y!;
		},
		onKeyDown(e: KeyboardEvent): void {
			switch (e.code) {
				case 'ArrowLeft':
					this.rotationTarget = -1;
					break;

				case 'ArrowRight':
					this.rotationTarget = 1;
					break;

				case 'Space':
					this.mainFire = true;
					playLaser(1);
					break;

				case 'ArrowUp':
					this.shootRocket();
					break;

				default:
					break;
			}
		},
		onKeyUp(e: KeyboardEvent) {
			switch (e.code) {
				case 'ArrowLeft':
					this.rotationTarget = 0;
					break;

				case 'ArrowRight':
					this.rotationTarget = 0;
					break;

				case 'Space':
					this.mainFire = false;
					break;

				default:
					break;
			}
		},
	};
}
