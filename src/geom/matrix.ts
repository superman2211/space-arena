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

	export function concat(matrix0: Matrix, matrix1: Matrix, result: Matrix) {
		const a = matrix1.a * matrix0.a + matrix1.b * matrix0.c;
		const b = matrix1.a * matrix0.b + matrix1.b * matrix0.d;
		const c = matrix1.c * matrix0.a + matrix1.d * matrix0.c;
		const d = matrix1.c * matrix0.b + matrix1.d * matrix0.d;
		const x = matrix1.x * matrix0.a + matrix1.y * matrix0.c + matrix0.x;
		const y = matrix1.x * matrix0.b + matrix1.y * matrix0.d + matrix0.y;

		result.a = a;
		result.b = b;
		result.c = c;
		result.d = d;
		result.x = x;
		result.y = y;
	}
}
