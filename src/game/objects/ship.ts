import { Point } from '../../geom/point';
import { Component } from '../../graphics/component';
import { Transform } from '../../graphics/transform';
import { getShape } from '../../resources/shapes';
import {
	mathCos, mathPI2, mathSin,
} from '../../utils/math';
import { createBullet } from '../layers/bullets';

export const SHIP01 = 'ship01';
export const SHIP02 = 'ship02';
export const SHIP03 = 'ship03';
export const SHIP04 = 'ship04';
export const SHIP05 = 'ship05';

const tempPoint = Point.empty();

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
	fireTimeout: number,
	bulletSpeed: number,
	bulletLength: number,
	guns: Point[],
}

const SETTINGS: { [key: string]: ShipSettings } = {
	[SHIP01]: {
		speedMax: 200,
		rotationSpeedMax: 2,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		guns: [
			{ x: 100, y: -40 },
			{ x: 100, y: 40 },
		],
	},
	[SHIP02]: {
		speedMax: 300,
		rotationSpeedMax: 3,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		guns: [
			{ x: 0, y: -45 },
			{ x: 0, y: 45 },
		],
	},
	[SHIP03]: {
		speedMax: 250,
		rotationSpeedMax: 3,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		guns: [
			{ x: 90, y: -35 },
			{ x: 90, y: 35 },
		],
	},
	[SHIP04]: {
		speedMax: 350,
		rotationSpeedMax: 3.5,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		guns: [
			{ x: 50, y: -70 },
			{ x: 50, y: 70 },
		],
	},
	[SHIP05]: {
		speedMax: 200,
		rotationSpeedMax: 3,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		guns: [
			{ x: 50, y: -60 },
			{ x: 50, y: 60 },
		],
	},
};

export interface Ship extends Component {
	speed: number,
	rotationSpeed: number,
	rotationTarget: ShipRotationTarget,
	mainFire: boolean;
	mainFireTime: number;
	currentGun: number;
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
		mainFire: false,
		mainFireTime: 0,
		currentGun: 0,
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
			this.speed += (settings.speedMax - this.speed) * time * 3;
			const currentSpeed = time * this.speed;

			const rotationTarget = this.rotationTarget * settings.rotationSpeedMax;
			this.rotationSpeed += (rotationTarget - this.rotationSpeed) * time * 3;
			this.rotation! += time * this.rotationSpeed;
			const currentRotation = this.rotation!;

			const speedX = mathCos(currentRotation) * currentSpeed;
			const speedY = mathSin(currentRotation) * currentSpeed;

			this.x! += speedX;
			this.y! += speedY;

			if (this.mainFire && this.mainFireTime > settings.fireTimeout) {
				const gun = settings.guns[this.currentGun];

				const bullet = createBullet({
					damage: 3,
					speed: settings.bulletSpeed,
					distance: 1000,
					color: 0xffff6666,
					width: 5,
					length: settings.bulletLength,
				});

				Transform.transformPoint(this, gun, tempPoint);

				bullet.x = tempPoint.x;
				bullet.y = tempPoint.y;
				bullet.rotation = this.rotation;

				this.mainFireTime = 0;

				this.currentGun++;
				this.currentGun &= (settings.guns.length - 1);
			}

			this.mainFireTime += time;
		},
	};
}
