import { createPoint, Point } from '../../geom/point';
import { Shape } from '../../graphics/shape';
import { Transform } from '../../graphics/transform';
import { generateShape } from '../../utils/generate-shape';
import { mathChance } from '../../utils/math';
import { Connector } from '../connector';

const tempPoint = createPoint();

export function exhaust(point: Point, rotation: number, offset: number, connector: Connector) {
	const shape: Shape = [];

	generateShape(shape, 0, 0, 0, 5, 10, 10, 20);

	tempPoint.y = 0;
	tempPoint.x = -offset;

	Transform.transformPoint(point, tempPoint, tempPoint);

	const particle = connector.getParticles!().create({
		x: tempPoint.x,
		y: tempPoint.y,
		pallete: [mathChance() ? 0x99999999 : 0x99666666],
		speed: 1,
		acceleration: 0,
		rotation,
		rotationSpeed: 0.01,
		shape,
		time: 0.3,
		alpha: 5,
		connector,
	});

	particle.radius = 20;
}
