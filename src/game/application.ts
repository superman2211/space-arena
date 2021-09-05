import { Component } from '../graphics/component';
import { asteroid } from './asteroid';
import { ship } from './ship';

interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Component {
	const pallete = [0xff26333E, 0xffB3B3AF, 0xff36465A, 0xffbbbbbb, 0xffF9AC35];
	const asteroidsPallete = [0xff666666, 0xff999999];
	return {
		children: [
			ship({ name: 'ship01', pallete }),
			ship({ name: 'ship02', pallete }),
			ship({ name: 'ship03', pallete }),
			ship({ name: 'ship04', pallete }),
			ship({ name: 'ship05', pallete }),
			asteroid({ pallete: asteroidsPallete }),
			asteroid({ pallete: asteroidsPallete }),
			asteroid({ pallete: asteroidsPallete }),
			asteroid({ pallete: asteroidsPallete }),
		],
		onUpdate() {
			const ships = this.children!;

			let x = 127;
			let y = 127;

			ships.forEach((s) => {
				s.scale = 0.5;
				s.x = x;
				s.y = y;

				x += 127;
				if (x > 400) {
					x = 127;
					y += 127;
				}
			});
		},
	};
}
