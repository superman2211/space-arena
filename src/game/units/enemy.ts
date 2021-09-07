import { math2PI, randomFloat } from '../../utils/math';
import { Ship, ship, ShipOptions } from '../objects/ship';

export function enemy(options: ShipOptions): Ship {
	const base = ship(options);

	const { width2, height2 } = options;

	return {
		...base,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);

			const { x, y } = this;
			if (x! < -width2 || width2 < x! || y! < -height2 || height2 < y!) {
				this.rotation = randomFloat(0, math2PI);
			}
		},
	};
}
