import { Component } from '../graphics/component';
import { ship } from './ship';

interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Component {
	const pallete = [0xff26333E, 0xffB3B3AF, 0xff36465A, 0xffbbbbbb, 0xffF9AC35];
	return {
		children: [
			ship({ name: 'ship01', pallete }),
			ship({ name: 'ship02', pallete }),
			ship({ name: 'ship03', pallete }),
			ship({ name: 'ship04', pallete }),
			ship({ name: 'ship05', pallete }),
		],
		onUpdate(time: number) {
			const ships = this.children!;
			ships.forEach((s) => {
				s.scale = 0.5;
			});

			const [ship01, ship02, ship03, ship04, ship05] = ships;

			const width = options.getWidth();
			const height = options.getHeight();

			ship01.x = width / 2;
			ship01.y = height / 2;

			ship02.x = width / 2 + 255;
			ship02.y = height / 2;

			ship03.x = width / 2 - 255;
			ship03.y = height / 2;

			ship04.x = width / 2;
			ship04.y = height / 2 - 255;

			ship05.x = width / 2;
			ship05.y = height / 2 + 255;

			if (ship01.rotation === undefined) {
				ship01.rotation = 0;
			}
			ship01.rotation! += time;
		},
	};
}
