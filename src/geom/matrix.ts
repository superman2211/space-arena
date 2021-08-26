export interface Matrix {
	a: number;
	b: number;
	c: number;
	d: number;
	x: number;
	y: number;
}

export namespace Matrix {
	export function empty(): Matrix {
		return {
			a: 1,
			b: 0,
			c: 0,
			d: 1,
			x: 0,
			y: 0,
		};
	}

	export function translation(
		matrix: Matrix,
		x: number = 0,
		y: number = 0,
	) {
		matrix.x = x;
		matrix.y = y;
	}

	export function box(
		matrix: Matrix,
		x: number = 0,
		y: number = 0,
		scaleX: number = 1,
		scaleY: number = 1,
		rotation: number = 0,
	) {
		const c = Math.cos(rotation);
		const s = Math.sin(rotation);

		matrix.a = scaleX * c;
		matrix.b = scaleX * s;

		matrix.c = scaleY * s;
		matrix.d = scaleY * c;

		matrix.x = x;
		matrix.y = y;
	}
}
