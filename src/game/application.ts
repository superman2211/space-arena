import { Component } from '../graphics/component';
import { game as createGame } from './game';

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

			game.scale = 1;
			game.x = w / 2;
			game.y = h / 2;
		},
	};
}
