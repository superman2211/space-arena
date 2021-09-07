import { Point } from '../../geom/point';
import { Ship, ship, ShipOptions } from '../objects/ship';

interface PlayerOptions extends ShipOptions {
	camera: Point;
}

export function player(options: PlayerOptions): Ship {
	const base = ship(options);

	// const { width2, height2 } = options;

	const component: Ship = {
		...base,
		speed: 200,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);
			options.camera.x = this.x!;
			options.camera.y = this.y!;
		},
	};

	document.addEventListener('keydown', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				component.rotationSpeed = -2;
				break;
			case 'ArrowRight':
				component.rotationSpeed = 2;
				break;
			default:
				break;
		}
		e.preventDefault();
	});

	document.addEventListener('keyup', (e) => {
		switch (e.code) {
			case 'ArrowLeft':
				component.rotationSpeed = 0;
				break;
			case 'ArrowRight':
				component.rotationSpeed = 0;
				break;
			default:
				break;
		}
		e.preventDefault();
	});

	return component;
}
