import { Component } from '../graphics/component';

export function application(): Component {
	return {
		childs: [
			{
				x: 0,
				y: 0,
				r: 0,
				shape: [
					'm', 10, 10, 'l', 100, 10, 'l', 50, 100, 'f', 0xffff0000, 's', 0xff00ff00, 10,
					'm', 100, 100, 'l', 200, 100, 'l', 200, 200, 'l', 100, 200, 'l', 100, 100, 's', 0xff0000ff, 2,
				],
			},
		],
		onUpdate(time: number) {
			const first = this.childs![0];
			first.x! += time * 10;
			first.y! += time * 10;
			first.r! += time;
		},
	};
}
