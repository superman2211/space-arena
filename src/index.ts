/* eslint-disable no-console */
import { Point } from './geom/Point';

console.log('test');

function main() {
	const point: Point = { x: 3, y: 4 };
	console.log(Point.length(point));
}

main();
