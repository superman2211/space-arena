import { Component } from '../graphics/component';
import {
	FILL, LINE, MOVE, parseShape, STROKE,
} from '../graphics/shape';

export function application(): Component {
	return {
		children: [
			{
				x: 0,
				y: 0,
				r: 0,
				shape: [
					MOVE, 10, 10,
					LINE, 100, 10,
					LINE, 50, 100,
					FILL, 0xffff0000,
					STROKE, 0xff00ff00, 10,
				],
			},
			{
				shape: parseShape('0 100 100 1 200 100 1 200 200 1 100 200 1 100 100 3 0xff0000ff 2'),
			},
		],
		onUpdate(time: number) {
			const first = this.children![0];
			first.x! += time * 10;
			first.y! += time * 10;
			first.r! += time;
		},
	};
}
