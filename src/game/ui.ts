import { Component } from '../graphics/component';
import { Text } from '../graphics/text';
import { mathRound } from '../utils/math';
import { ApplicationOptions } from './application';
import { Connector } from './connector';
import { Ship } from './objects/ship';

interface UIOptions {
	connector: Connector,
	options: ApplicationOptions;
}

export function ui(uiOptions: UIOptions): Component {
	const { connector, options } = uiOptions;
	function getPlayer(): Ship | undefined {
		const player = connector.getShips!().children![0] as Ship;
		if (player.id === 0) {
			return player;
		}
		return undefined;
	}

	function getHealth() {
		const player = getPlayer();
		if (player) {
			return mathRound(player.health);
		}
		return 0;
	}

	function getOpponents() {
		let shipsCount = connector.getShips!().children!.length;
		const player = getPlayer();
		if (player) {
			shipsCount--;
		}
		return shipsCount;
	}

	function getRocketInfo(): string {
		const player = getPlayer();
		if (player) {
			if (player.rocketTime <= 0) {
				return 'ready';
			}
			return `${player.rocketTime.toFixed(1)} s`;
		}
		return '';
	}

	const style: Text = {
		color: 0xffffffff, font: 'arial', size: 30,
	};

	const border = 20;

	const health: Component = {
		text: { ...style, value: 'health' },
	};

	const opponents: Component = {
		text: { ...style, align: 1 },
	};

	const reload: Component = {
		text: { ...style, align: 0.5 },
	};

	const result: Component = {
		text: { ...style, size: 50, align: 0.5 },
	};

	const instruction: Component = {
		text: { ...style, align: 0.5 },
	};

	function finish(message: string) {
		result.text!.value = message;
		instruction.text!.value = 'press ENTER to start again';
		connector.getGame!().enabled = false;
	}

	return {
		children: [
			health,
			opponents,
			reload,
			result,
			instruction,
		],
		onUpdate() {
			const healthValue = getHealth();
			const opponentsValue = getOpponents();

			health.text!.value = `health: ${healthValue} %`;
			health.x = border / this.scale!;
			health.y = border / this.scale!;

			reload.text!.value = `rocket: ${getRocketInfo()}`;
			reload.x = (options.getWidth() / 2) / this.scale!;
			reload.y = border / this.scale!;

			opponents.text!.value = `opponents: ${opponentsValue}`;
			opponents.x = (options.getWidth() - border) / this.scale!;
			opponents.y = border / this.scale!;

			result.x = (options.getWidth() / 2) / this.scale!;
			result.y = (options.getHeight() / 2 - 50) / this.scale!;

			instruction.x = (options.getWidth() / 2) / this.scale!;
			instruction.y = (options.getHeight() - 30 - border) / this.scale!;

			if (opponentsValue === 0) {
				finish('WIN!');
			} else if (healthValue <= 0) {
				finish('WASTED!');
			} else {
				result.text!.value = '';
				instruction.text!.value = 'LEFT & RIGHT - move    SPACE - fire    UP - rocket';
			}
		},
		onKeyDown(e) {
			if (e.code === 'Enter' && !connector.getGame!().enabled) {
				connector.getGame!().enabled = true;
				connector.getShips!().start();
				connector.getBullets!().children = [];
			}
		},
	};
}
