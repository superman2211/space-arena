import {
	createPoint, Point, pointLengthSquared,
} from '../../geom/point';
import { Component } from '../../graphics/component';
import { Transform } from '../../graphics/transform';
import { playExplosion, playLaser } from '../../media/sound-effect';
import { getShape } from '../../resources/shapes';
import {
	mathCos, mathPI, mathPI2, mathSin,
} from '../../utils/math';
import { Connector } from '../connector';
import { exhaust } from '../effects/exhaust';
import { explosion } from '../effects/explosion';
import { BULLET, ROCKET } from './bullet';

export const SHIP01 = 'ship01';
export const SHIP02 = 'ship02';
export const SHIP03 = 'ship03';
export const SHIP04 = 'ship04';
export const SHIP05 = 'ship05';

const MAX_HEALTH = 100;
const HEALTH_EFFECT = 0.3;

const tempPoint = createPoint();

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
	bulletDamage: number,
	rocketSpeed: number,
	rocketAcceleration: number,
	rocketReload: number,
	rocketDamage: number,
	guns: Point[],
}

const SETTINGS: { [key: string]: ShipSettings } = {
	[SHIP01]: {
		speedMax: 300,
		rotationSpeedMax: 3,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		bulletDamage: 3,
		rocketSpeed: 200,
		rocketAcceleration: 1000,
		rocketDamage: 20,
		rocketReload: 10,
		guns: [
			{ x: 100, y: -40 },
			{ x: 100, y: 40 },
		],
	},
	[SHIP02]: {
		speedMax: 350,
		rotationSpeedMax: 3.5,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		bulletDamage: 2.5,
		rocketSpeed: 300,
		rocketAcceleration: 1000,
		rocketDamage: 15,
		rocketReload: 10,
		guns: [
			{ x: 0, y: -45 },
			{ x: 0, y: 45 },
		],
	},
	[SHIP03]: {
		speedMax: 300,
		rotationSpeedMax: 3.5,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		bulletDamage: 3,
		rocketSpeed: 250,
		rocketAcceleration: 1000,
		rocketDamage: 20,
		rocketReload: 10,
		guns: [
			{ x: 90, y: -35 },
			{ x: 90, y: 35 },
		],
	},
	[SHIP04]: {
		speedMax: 400,
		rotationSpeedMax: 3.5,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		bulletDamage: 2,
		rocketSpeed: 350,
		rocketAcceleration: 1000,
		rocketDamage: 10,
		rocketReload: 5,
		guns: [
			{ x: 50, y: -70 },
			{ x: 50, y: 70 },
		],
	},
	[SHIP05]: {
		speedMax: 300,
		rotationSpeedMax: 3.5,
		fireTimeout: 0.1,
		bulletSpeed: 1000,
		bulletLength: 30,
		bulletDamage: 3,
		rocketSpeed: 200,
		rocketAcceleration: 1000,
		rocketDamage: 20,
		rocketReload: 10,
		guns: [
			{ x: 50, y: -60 },
			{ x: 50, y: 60 },
		],
	},
};

export interface Ship extends Component {
	damageRadius: number,
	speed: number,
	health: number,
	healthEffect: number,
	rotationSpeed: number,
	rotationTarget: number,
	mainFire: boolean,
	mainFireTime: number,
	rocketTime: number,
	currentGun: number,
	id: number,
	changeHealth(deltaHealth: number): void;
	shootRocket(): void;
}

export interface ShipOptions {
	pallete: number[],
	name: string,
	size: number,
	connector: Connector;
	id: number;
}

export function ship(options: ShipOptions): Ship {
	const {
		pallete, name, connector, size, id,
	} = options;

	const sizeSquared = (size - 80) * (size - 80);

	const shape = getShape(name);
	const settings = SETTINGS[name];

	let exhaustTime = 0;

	return {
		id,
		scale: 0.5,
		radius: 127,
		damageRadius: 100,
		health: MAX_HEALTH,
		healthEffect: 0,
		x: 0,
		y: 0,
		rotation: 0,
		speed: 0,
		rotationSpeed: 0,
		rotationTarget: 0,
		mainFire: false,
		mainFireTime: 0,
		currentGun: 0,
		rocketTime: 0,
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
			// moving
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

			// fire
			if (this.mainFire && this.mainFireTime > settings.fireTimeout) {
				const gun = settings.guns[this.currentGun];

				const bullet = connector.getBullets!().create({
					size,
					id: this.id,
					damage: settings.bulletDamage,
					speed: settings.bulletSpeed,
					acceleration: 0,
					distance: 1000,
					color: 0xffff6666,
					width: 5,
					length: settings.bulletLength,
					type: BULLET,
					connector,
				});

				Transform.transformPoint(this, gun, tempPoint);

				bullet.x = tempPoint.x;
				bullet.y = tempPoint.y;
				bullet.rotation = this.rotation;

				this.mainFireTime = 0;

				this.currentGun++;
				this.currentGun &= (settings.guns.length - 1);

				playLaser(connector.getGame!().calculateVolume(bullet as Point));
			}
			this.mainFireTime += time;

			// health effect
			if (this.healthEffect > 0) {
				this.healthEffect -= time;
				if (this.healthEffect < 0) {
					this.healthEffect = 0;
				}
				this.tint = { color: 0xff00ff00, value: this.healthEffect / HEALTH_EFFECT };
			} else if (this.healthEffect < 0) {
				this.healthEffect += time;
				if (this.healthEffect > 0) {
					this.healthEffect = 0;
				}
				this.tint = { color: 0xffffffff, value: -this.healthEffect / HEALTH_EFFECT };
			}

			// rocket
			if (this.rocketTime > 0) {
				this.rocketTime -= time;
			}

			// check border
			const centerDistance = pointLengthSquared(this as Point);
			if (centerDistance > sizeSquared) {
				this.changeHealth(-1000);
			}

			// exhaust
			exhaustTime -= time;
			if (exhaustTime <= 0) {
				exhaustTime = 0.05;
				exhaust(this as Point, this.rotation! + mathPI, 80, connector);
			}
		},
		shootRocket() {
			if (this.rocketTime > 0) {
				return;
			}

			this.rocketTime = settings.rocketReload;

			const rocket = connector.getBullets!().create({
				id: this.id,
				size,
				damage: settings.rocketDamage,
				speed: settings.rocketSpeed,
				acceleration: settings.rocketAcceleration,
				distance: 2000,
				color: 0xffff66ff,
				width: 10,
				length: 40,
				type: ROCKET,
				connector,
			});

			rocket.x = this.x;
			rocket.y = this.y;
			rocket.rotation = this.rotation;

			playLaser(connector.getGame!().calculateVolume(rocket as Point));
		},
		changeHealth(deltaHealth: number) {
			this.health += deltaHealth;

			if (deltaHealth > 0) {
				if (this.health > MAX_HEALTH) {
					this.health = MAX_HEALTH;
				}
				this.healthEffect = HEALTH_EFFECT;
			} else if (deltaHealth < 0) {
				this.healthEffect = -HEALTH_EFFECT;
				if (this.health <= 0) {
					connector.getShips!().destroy(this);
					const volume = connector.getGame!().calculateVolume(this as Point);
					playExplosion(volume);
					explosion(this, pallete, connector);
				}
			}
		},
	};
}
