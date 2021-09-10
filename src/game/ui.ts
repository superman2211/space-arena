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

	function getEnemies() {
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

	return {
		children: [
			health,
			opponents,
			reload,
		],
		onUpdate() {
			health.text!.value = `health: ${getHealth()} %`;
			health.x = border / this.scale!;
			health.y = border / this.scale!;

			reload.text!.value = `rocket: ${getRocketInfo()}`;
			reload.x = (options.getWidth() / 2) / this.scale!;
			reload.y = border / this.scale!;

			opponents.text!.value = `opponents: ${getEnemies()}`;
			opponents.x = (options.getWidth() - border) / this.scale!;
			opponents.y = border / this.scale!;
		},
	};
}
