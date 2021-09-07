import { math2PI, randomFloat } from '../../utils/math';
import { Ship, ship, ShipOptions } from '../objects/ship';

export function enemy(options: ShipOptions): Ship {
	const base = ship(options);

	const { size2 } = options;

	return {
		...base,
		onUpdate(time: number) {
			base.onUpdate!.call(this, time);

			const { x, y } = this;
			if (x! < -size2 || size2 < x! || y! < -size2 || size2 < y!) {
				this.rotation = randomFloat(0, math2PI);
			}
		},
	};
}
