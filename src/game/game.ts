import { createPoint, distanceSquared, Point } from '../geom/point';
import { Component } from '../graphics/component';
import { Layer } from './layers/layer';
import { asteroids } from './layers/asteroids';
import { ships } from './layers/ships';
import { space } from './layers/space';
import { planets } from './layers/planets';
import { bullets } from './layers/bullets';
import { Connector } from './connector';
import { border } from './layers/border';
import { mathMax, mathMin, mathSqrt } from '../utils/math';

const SIZE = 2500;

export interface Game extends Component {
	camera: Point;
	size: number;
	calculateVolume(point: Point): number;
}

export function game(connector: Connector): Game {
	const camera = createPoint();

	const component: Game = {
		camera,
		children: [
			space({
				stars: 10000,
				parallax: 0.3,
				size: SIZE,
				bigStartsChance: 0.1,
			}),
			planets({
				parallax: 0.4,
				size: SIZE,
			}),
			asteroids({
				count: 100,
				parallax: 0.8,
				scale: 0.4,
				size: SIZE,
				brightness: -0.6,
				pallete: [0xff555555, 0xff666666],
			}),
			asteroids({
				count: 50,
				parallax: 0.9,
				scale: 0.6,
				size: SIZE,
				brightness: -0.4,
				pallete: [0xff555555, 0xff666666],
			}),
			asteroids({
				count: 30,
				parallax: 1,
				scale: 1,
				size: SIZE / 1.5,
				brightness: 0,
				pallete: [0xff550000, 0xff770000],
				connector,
			}),
			bullets({
				connector,
				parallax: 1,
			}),
			ships({
				count: 20,
				size: SIZE,
				camera,
				connector,
				parallax: 1,
			}),
			border({
				size: SIZE,
				parallax: 1,
			}),
			asteroids({
				count: 25,
				parallax: 1.2,
				scale: 1,
				size: SIZE,
				brightness: -0.2,
				pallete: [0x33555555, 0x33666666],
			}),
			asteroids({
				count: 15,
				parallax: 1.5,
				scale: 1.5,
				size: SIZE,
				brightness: 0,
				pallete: [0x33555555, 0x33666666],
			}),
		],
		size: SIZE,
		onUpdate() {
			const { x, y } = this.camera;
			const layers = this.children! as Layer[];
			layers.forEach((layer) => {
				layer.x = -x * layer.parallax;
				layer.y = -y * layer.parallax;
			});
		},
		calculateVolume(point: Point): number {
			const maxDistance = SIZE / 2;
			const distance = mathSqrt(distanceSquared(camera, point));
			return 1 - mathMin(1, mathMax(0, distance / maxDistance));
		},
	};

	connector.getGame = () => component;

	connector.getShips!().start();

	return component;
}
