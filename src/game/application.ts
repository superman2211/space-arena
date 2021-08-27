import { Component } from '../graphics/component';
import {
	FILL, LINE, MOVE, PATH, STROKE,
} from '../graphics/shape';

export function application(): Component {
	return {
		children: [
			{
				x: 0,
				y: 0,
				rotation: 0,
				shape: [
					MOVE, 10, 10,
					LINE, 100, 10,
					LINE, 50, 100,
					FILL, 0xffff0000,
					STROKE, 0xff00ff00, 10,

					MOVE, 100, 100,
					LINE, 200, 210,
					LINE, 250, 150,
					LINE, 100, 100,
					FILL, 0xff00ff00,
					STROKE, 0xffff0000, 2,
				],
			},
			{
				shape: [
					MOVE, 100, 100,
					LINE, 200, 100,
					LINE, 200, 200,
					LINE, 100, 200,
					LINE, 100, 100,
					STROKE, 0xff0000ff, 2,
				],
			},
			{
				x: 200,
				shape: [
					MOVE, 100, 100,
					LINE, 200, 100,
					LINE, 200, 200,
					LINE, 100, 200,
					LINE, 100, 100,
					STROKE, 0xff00ff00, 3,
					FILL, 0xff990099,
				],
			},
			{
				x: 200,
				y: 200,
				shape: [
					PATH, 5, 100, 100, 200, 100, 200, 200, 100, 200, 100, 100,
					STROKE, 0xffff0000, 3,
				],
			},
			{
				x: 0,
				y: 200,
				shape: [
					PATH, 5, 100, 100, 200, 100, 200, 200, 100, 200, 100, 100,
					STROKE, 0xff00ff00, 10,
					FILL, 0xffffff00,
				],
			},
		],
		onUpdate(time: number) {
			const first = this.children![0];
			first.x! += time * 10;
			first.y! += time * 10;
			first.rotation! += time;
		},
	};
}
