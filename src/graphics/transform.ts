import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';

export interface TintColor {
	c?: number;
	v?: number;
}

export interface Transform {
	x?: number;
	y?: number;
	r?: number;
	s?: number;
	sx?: number;
	sy?: number;
	a?: number;
	tint?: TintColor;
	brightness?: number;
}

export namespace Transform {
	export function calculateMatrix(transform: Transform, result: Matrix) {
		const { r } = transform;

		const sx = transform.sx ?? transform.s ?? 1;
		const sy = transform.sy ?? transform.s ?? 1;

		result.x = transform.x ?? 0;
		result.y = transform.y ?? 0;

		if (r) {
			const cos = Math.cos(r);
			const sin = Math.sin(r);

			result.a = cos * sx;
			result.b = sin * sx;
			result.c = -sin * sy;
			result.d = cos * sy;
			return;
		}

		result.a = sx;
		result.b = 0;
		result.c = 0;
		result.d = sy;
	}

	export function calculateColor(transform: Transform, result: ColorTransform) {
		const alpha = transform.a ?? 1;

		const { tint } = transform;
		if (tint) {
			const { c = 0, v = 1 } = tint;

			const valueInverted = 1 - v;

			const r = (c >> 16) & 0xff;
			const g = (c >> 8) & 0xff;
			const b = c & 0xff;

			result.am = alpha;
			result.rm = valueInverted;
			result.gm = valueInverted;
			result.bm = valueInverted;

			result.ao = 0;
			result.ro = r * v;
			result.go = g * v;
			result.bo = b * v;
			return;
		}

		let { brightness } = transform;
		if (brightness !== undefined) {
			if (brightness > 1) {
				brightness = 1;
			} else if (brightness < -1) {
				brightness = -1;
			}

			const percent: number = 1 - Math.abs(brightness);
			let offset: number = 0;
			if (brightness > 0) {
				offset = brightness * 255;
			}

			result.am = alpha;
			result.rm = percent;
			result.gm = percent;
			result.bm = percent;

			result.ao = 0;
			result.ro = offset;
			result.go = offset;
			result.bo = offset;
			return;
		}

		result.am = alpha;
		result.rm = 1;
		result.gm = 1;
		result.bm = 1;

		result.ao = 0;
		result.ro = 0;
		result.go = 0;
		result.bo = 0;
	}
}
