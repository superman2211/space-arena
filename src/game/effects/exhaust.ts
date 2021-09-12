import { createPoint } from '../../geom/point';
import { Shape } from '../../graphics/shape';
import { Transform } from '../../graphics/transform';
import { generateShape } from '../../utils/generate-shape';
import { mathChance } from '../../utils/math';
import { Connector } from '../connector';

const tempPoint = createPoint();

export function exhaust(component: Transform, rotation: number, offset: number, connector: Connector) {
	const shape: Shape = [];

	const radius = 20;

	generateShape(shape, 0, 0, 0, 5, 10, radius / 2, radius);

	tempPoint.y = 0;
	tempPoint.x = -offset;

	Transform.transformPoint(component, tempPoint, tempPoint);

	connector.getParticles!().create({
		x: tempPoint.x,
		y: tempPoint.y,
		pallete: [mathChance() ? 0x99999999 : 0x99666666],
		speed: 1,
		rotation,
		shape,
		time: 0.3,
		alpha: 5,
		connector,
		radius,
	});
}
