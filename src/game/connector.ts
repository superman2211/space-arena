import { Game } from './game';
import { Bullets } from './layers/bullets';
import { Particles } from './layers/particles';
import { Ships } from './layers/ships';

export interface Connector {
	getShips?: () => Ships;
	getGame?: () => Game;
	getBullets?: () => Bullets;
	getParticles?: () => Particles;
}
