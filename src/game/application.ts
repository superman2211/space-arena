import { Component } from '../graphics/component';
import { game as createGame } from './game';

const SIZE: number = 1024;

interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Component {
	const game = createGame();
	return {
		children: [game],
		onUpdate() {
			const w = options.getWidth();
			const h = options.getHeight();

			game.scale = Math.min(w / SIZE, h / SIZE);
			game.x = w / 2;
			game.y = h / 2;
		},
	};
}
