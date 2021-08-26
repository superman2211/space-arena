import { ColorTransform } from '../geom/color';

export namespace Pattern {
	export function color(c: number, ct: ColorTransform): string {
		let a = c >> 24 & 0xff;
		let r = c >> 16 & 0xff;
		let g = c >> 8 & 0xff;
		let b = c & 0xff;

		a = (a * ct.am + ct.ao) & 0xff;
		r = (r * ct.rm + ct.ro) & 0xff;
		g = (g * ct.gm + ct.go) & 0xff;
		b = (b * ct.bm + ct.bo) & 0xff;

		return `rgba(${r}, ${g}, ${b}, ${a / 0xff})`;
	}
}
