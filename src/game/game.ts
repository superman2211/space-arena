import { Point } from '../geom/point';
import { Component } from '../graphics/component';
import { Layer } from './layer';
import { asteroids } from './objects/asteroids';
import { ships } from './objects/ships';

const SIZE = 4096;

interface Game extends Component {
	camera: Point;
	width: number;
	height: number;
}

export function game(): Game {
	const camera = Point.empty();
	return {
		camera,
		children: [
			asteroids({
				count: 70, parallax: 0.3, scale: 0.4, width: SIZE, height: SIZE, brightness: -0.6,
			}),
			asteroids({
				count: 30, parallax: 0.5, scale: 0.6, width: SIZE, height: SIZE, brightness: -0.4,
			}),
			ships({
				count: 20, width: SIZE, height: SIZE, camera,
			}),
			asteroids({
				count: 30, parallax: 1.1, scale: 1, width: SIZE, height: SIZE, brightness: -0.2,
			}),
			asteroids({
				count: 15, parallax: 1.2, scale: 1.2, width: SIZE, height: SIZE, brightness: 0,
			}),
		],
		width: SIZE,
		height: SIZE,
		onUpdate() {
			const layers = this.children! as Layer[];
			layers.forEach((layer) => {
				layer.x = -this.camera.x - this.camera.x * layer.parallax;
				layer.y = -this.camera.y - this.camera.y * layer.parallax;
			});
		},
	};
}
