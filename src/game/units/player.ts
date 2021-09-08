import { Point } from '../../geom/point';
import { playBackground } from '../../media/background-sound';
import { Ship, ship, ShipOptions } from '../objects/ship';

interface PlayerOptions extends ShipOptions {
	camera: Point;
}

export function player(options: PlayerOptions): Ship {
	const base = ship(options);

	// const { width2, height2 } = options;

	const component: Ship = {
		...base,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);
			options.camera.x = this.x!;
			options.camera.y = this.y!;
		},
	};

	document.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				component.rotationTarget = -1;
				break;
			case 'ArrowRight':
				component.rotationTarget = 1;
				break;
			default:
				break;
		}
		e.preventDefault();
		playBackground();
	});

	document.addEventListener('keyup', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				component.rotationTarget = 0;
				break;

			case 'ArrowRight':
				component.rotationTarget = 0;
				break;

			default:
				break;
		}
		e.preventDefault();
	});

	return component;
}
