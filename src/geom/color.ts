export interface ColorTransform {
	am: number;
	rm: number;
	gm: number;
	bm: number;

	ao: number;
	ro: number;
	go: number;
	bo: number;
}

export namespace ColorTransform {
	export function empty(): ColorTransform {
		return {
			am: 1,
			rm: 1,
			gm: 1,
			bm: 1,

			ao: 0,
			ro: 0,
			go: 0,
			bo: 0,
		};
	}

	export function alpha(ct: ColorTransform, value: number) {
		ct.am = value;
	}
}
