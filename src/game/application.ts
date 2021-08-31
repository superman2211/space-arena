import { Component } from '../graphics/component';
import { ship } from './ship';

interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Component {
	return {
		children: [
			ship({ colors: [0xff26333E, 0xffB3B3AF, 0xff36465A, 0xffF9AC35] }),
			ship({ colors: [0xffB3B3AF, 0xff26333E, 0xff36995A, 0xffffff00] }),
			ship({ colors: [0xff369900, 0xffB3B3AF, 0xff26333E, 0xffff0000] }),
		],
		onUpdate(time: number) {
			const [ship0, ship1, ship2] = this.children!;

			const width = options.getWidth();
			const height = options.getHeight();

			ship0.x = width / 2;
			ship0.y = height / 2;

			ship1.x = width / 2 + 255;
			ship1.y = height / 2;

			ship2.x = width / 2 - 255;
			ship2.y = height / 2;

			if (ship0.rotation === undefined) {
				ship0.rotation = 0;
			}
			ship0.rotation! += time;
		},
	};
}
