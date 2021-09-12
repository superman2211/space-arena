import { Component } from '../graphics/component';
import { game as createGame } from './game';
import { Connector } from './connector';
import { ui as createUI } from './ui';
import { mathMin } from '../utils/math';

const SIZE: number = 1024;

export interface Application extends Component {
	updateView(time: number): void;
}

export interface ApplicationOptions {
	getWidth(): number,
	getHeight(): number,
}

export function application(options: ApplicationOptions): Application {
	const connector: Connector = {};
	const game = createGame(connector);
	const ui = createUI({ connector, options });
	return {
		children: [game, ui],
		updateView(time: number) {
			const w = options.getWidth();
			const h = options.getHeight();

			const scale = mathMin(w / SIZE, h / SIZE);

			ui.scale = scale;

			game.scale = scale;
			game.x = w / 2;
			game.y = h / 2;

			game.updateCamera(time);
		},
	};
}
