import { distanceSquared, Point } from '../../geom/point';
import { bullet, Bullet, BulletOptions } from '../objects/bullet';
import { Ship } from '../objects/ship';
import { Connector } from './connector';
import { Layer } from './layer';

export interface Bullets extends Layer {
	create(options: BulletOptions): Bullet;
	destroy(b: Bullet): void;
}

export interface BulletsOptions {
	connector: Connector;
}

export function bullets(options: BulletsOptions): Bullets {
	const layer: Bullets = {
		parallax: 0,
		children: [],
		create(o: BulletOptions): Bullet {
			o.destroy = this.destroy.bind(this);
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
			const shipsList: Ship[] = options.connector.getShips!().children! as Ship[];
			const bulletsList: Bullet[] = this.children! as Bullet[];

			bulletsList.forEach((b) => {
				shipsList.forEach((ship) => {
					if (b.id !== ship.id) {
						const distance = distanceSquared(b as Point, ship as Point);
						const raduises = ship.radius * ship.radius;
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
