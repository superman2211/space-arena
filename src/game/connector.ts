import { Game } from './game';
import { Bullets } from './layers/bullets';
import { Ships } from './layers/ships';

export interface Connector {
	getShips?: () => Ships;
	getGame?: () => Game;
	getBullets?: () => Bullets;
}
