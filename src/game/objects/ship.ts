import { Component } from '../../graphics/component';
import { getShape } from '../../resources/shapes';
import {
	mathCos, mathPI2, mathSin,
} from '../../utils/math';

export const SHIP01 = 'ship01';
const SHIP02 = 'ship02';
const SHIP03 = 'ship03';
const SHIP04 = 'ship04';
const SHIP05 = 'ship05';

type ShipRotationTarget = -1 | 0 | 1;

export const SHIPS = [
	SHIP01,
	SHIP02,
	SHIP03,
	SHIP04,
	SHIP05,
];

export interface ShipSettings {
	speedMax: number;
	rotationSpeedMax: number;
}

const SETTINGS: { [key: string]: ShipSettings } = {
	[SHIP01]: { speedMax: 200, rotationSpeedMax: 2 },
	[SHIP02]: { speedMax: 300, rotationSpeedMax: 3 },
	[SHIP03]: { speedMax: 250, rotationSpeedMax: 3 },
	[SHIP04]: { speedMax: 350, rotationSpeedMax: 3.5 },
	[SHIP05]: { speedMax: 200, rotationSpeedMax: 3 },
};

export interface Ship extends Component {
	speed: number,
	rotationSpeed: number,
	rotationTarget: ShipRotationTarget,
	speedMax: number,
	rotationSpeedMax: number,
}

export interface ShipOptions {
	pallete: number[],
	name: string,
	size2: number,
}

export function ship(options: ShipOptions): Ship {
	const { pallete, name } = options;

	const shape = getShape(name);
	const settings = SETTINGS[name];

	return {
		scale: 0.5,
		x: 0,
		y: 0,
		rotation: 0,
		speed: 0,
		rotationSpeed: 0,
		rotationTarget: 0,
		...settings,
		children: [
			{
				rotation: mathPI2,
				children: [
					{
						shape,
						pallete,
						x: -127,
						y: -127,
					},
					{
						shape,
						pallete,
						scaleX: -1,
						x: 128,
						y: -127,
					},
				],
			},
		],
		onUpdate(time: number) {
			this.speed += (this.speedMax - this.speed) * time * 3;
			const currentSpeed = time * this.speed;

			const rotationTarget = this.rotationTarget * this.rotationSpeedMax;
			this.rotationSpeed += (rotationTarget - this.rotationSpeed) * time * 3;
			this.rotation! += time * this.rotationSpeed;
			const currentRotation = this.rotation!;

			const speedX = mathCos(currentRotation) * currentSpeed;
			const speedY = mathSin(currentRotation) * currentSpeed;

			this.x! += speedX;
			this.y! += speedY;
		},
	};
}
