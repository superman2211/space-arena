import { Component } from '../../graphics/component';
import { getShape } from '../../resources/shapes';
import {
	mathCos, mathPI2, mathSin,
} from '../../utils/math';

export interface Ship extends Component {
	speed: number,
	rotationSpeed: number,
}

export interface ShipOptions {
	pallete: number[],
	name: string,
	width2: number,
	height2: number,
}

export function ship(options: ShipOptions): Ship {
	const { pallete, name } = options;
	const shape = getShape(name);

	return {
		scale: 0.5,
		x: 0,
		y: 0,
		rotation: 0,
		speed: 150,
		rotationSpeed: 0,
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
			const value = time * this.speed;

			this.rotation! += time * this.rotationSpeed;
			const rotation = this.rotation!;

			this.x! += mathCos(rotation) * value;
			this.y! += mathSin(rotation) * value;
		},
	};
}
