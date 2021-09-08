import { Point } from '../geom/point';
import { Component } from '../graphics/component';
import { Layer } from './layers/layer';
import { asteroids } from './layers/asteroids';
import { ships } from './layers/ships';
import { space } from './layers/space';
import { planets } from './layers/planets';
import { bullets } from './layers/bullets';

const SIZE = 4096;

interface Game extends Component {
	camera: Point;
	size: number;
}

export function game(): Game {
	const camera = Point.empty();

	return {
		camera,
		children: [
			space({
				stars: 10000, parallax: 0.1, size: SIZE,
			}),
			planets({
				parallax: 0.2, size: SIZE,
			}),
			asteroids({
				count: 100, parallax: 0.3, scale: 0.4, size: SIZE, brightness: -0.6,
			}),
			asteroids({
				count: 50, parallax: 0.5, scale: 0.6, size: SIZE, brightness: -0.4,
			}),
			bullets,
			ships({
				count: 20, size: SIZE, camera,
			}),
			asteroids({
				count: 25, parallax: 1.1, scale: 1, size: SIZE, brightness: -0.2,
			}),
			asteroids({
				count: 15, parallax: 1.2, scale: 1.2, size: SIZE, brightness: 0,
			}),
		],
		size: SIZE,
		onUpdate() {
			const { x, y } = this.camera;
			const layers = this.children! as Layer[];
			layers.forEach((layer) => {
				layer.x = -x - x * layer.parallax;
				layer.y = -y - y * layer.parallax;
			});
		},
	};
}
