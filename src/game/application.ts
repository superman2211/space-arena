import { Component } from '../graphics/component';
import { asteroid } from './asteroid';
import { ship } from './ship';

interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Component {
	const pallete = [0xff26333E, 0xff666666, 0xffB3B3AF, 0xffF9AC35, 0xffff0000];
	const asteroidsPallete = [0xff555555, 0xff666666];
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
			asteroid({ pallete: [0xff996666, 0xff997777] }),
			asteroid({ pallete: [0xff669966, 0xff779977] }),
			asteroid({ pallete: [0xff666699, 0xff777799] }),
		],
		onUpdate(time: number) {
			const ships = this.children!;

			let x = 127;
			let y = 127;

			ships.forEach((s) => {
				s.scale = 0.5;
				s.x = x;
				s.y = y;

				x += 150;
				if (x > 500) {
					x = 127;
					y += 150;
				}

				if (!s.rotation) {
					s.rotation = 0;
				}
				s.rotation += time;
			});
		},
	};
}
