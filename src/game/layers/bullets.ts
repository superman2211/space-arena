import { Point } from '../../geom/point';
import { bullet, Bullet, BulletOptions } from '../objects/bullet';
import { Ship } from '../objects/ship';
import { Connector } from '../connector';
import { Layer } from './layer';

export interface Bullets extends Layer {
	create(options: BulletOptions): Bullet;
	destroy(b: Bullet): void;
}

export interface BulletsOptions {
	connector: Connector;
	parallax: number,
}

export function bullets(options: BulletsOptions): Bullets {
	const { parallax, connector } = options;
	const layer: Bullets = {
		parallax,
		children: [],
		create(o: BulletOptions): Bullet {
			const b: Bullet = bullet(o);
			this.children!.push(b);
			return b;
		},
		destroy(b: Bullet): void {
			const index = this.children!.indexOf(b);
			if (index !== -1) {
				this.children!.splice(index, 1);
			}
		},
		onUpdate() {
			const shipsList: Ship[] = connector.getShips!().children! as Ship[];
			const bulletsList: Bullet[] = this.children! as Bullet[];

			bulletsList.forEach((b) => {
				shipsList.forEach((ship) => {
					if (b.id !== ship.id) {
						const distance = Point.distanceSquared(b as Point, ship as Point);
						const raduises = ship.damageRadius * ship.damageRadius;
						if (distance < raduises) {
							this.destroy(b);
							ship.changeHealth(-b.damage);
						}
					}
				});
			});
		},
	};

	options.connector.getBullets = () => layer;

	return layer;
}
