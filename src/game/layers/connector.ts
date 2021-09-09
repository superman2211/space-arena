import { Bullets } from './bullets';
import { Ships } from './ships';

export interface Connector {
	getShips?: () => Ships;
	getBullets?: () => Bullets;
}
