import { Connector } from '../connector';
import { Layer } from './layer';
import { particle, ParticleOptions } from '../objects/particle';
import { Component } from '../../graphics/component';

export interface Particles extends Layer {
	create(o: ParticleOptions): Component;
	destroy(b: Component): void;
}

export interface ParticlesOptions {
	connector: Connector;
	parallax: number,
}

export function particles(options: ParticlesOptions): Particles {
	const { parallax } = options;
	const layer: Particles = {
		parallax,
		children: [],
		create(o: ParticleOptions): Component {
			const b = particle(o);
			this.children!.push(b);
			return b;
		},
		destroy(b: Component): void {
			const index = this.children!.indexOf(b);
			if (index !== -1) {
				this.children!.splice(index, 1);
			}
		},
	};

	options.connector.getParticles = () => layer;

	return layer;
}
