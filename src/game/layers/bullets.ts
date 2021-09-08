import { bullet, Bullet, BulletOptions } from '../objects/bullet';
import { Layer } from './layer';

export interface Bullets extends Layer {
	create(options: BulletOptions): Bullet;
	destroy(b: Bullet): void;
}

export const bullets: Bullets = {

	parallax: 0,
	children: [],
	create(o: BulletOptions): Bullet {
		o.destroy = this.destroy.bind(this);
		const b = bullet(o);
		this.children!.push(b);
		return b;
	},
	destroy(b: Bullet): void {
		const index = this.children!.indexOf(b);
		if (index !== -1) {
			this.children!.splice(index, 1);
		}
	},
};

export function createBullet(o: BulletOptions): Bullet {
	return bullets.create(o);
}
