import { Point } from './Point';

export interface Rectangle {
	x: number;
	y: number;
	w: number;
	h: number;
}

export namespace Rectangle {
	export function empty(): Rectangle {
		return {
			x: 0, y: 0, w: 0, h: 0,
		};
	}

	export function setEmpty(rectangle: Rectangle) {
		rectangle.x = 0;
		rectangle.y = 0;
		rectangle.w = 0;
		rectangle.h = 0;
	}

	export function intersection(source: Rectangle, target: Rectangle, result: Rectangle) {
		let {
			x, y, w: width, h: height,
		} = source;

		const left = target.x;
		const top = target.y;
		const right = target.x + target.w;
		const bottom = target.y + target.h;

		if (x < left) {
			width -= left - x;
			x = left;
		}
		if (x + width > right) {
			width = right - x;
		}

		if (y < top) {
			height -= top - y;
			y = top;
		}
		if (y + height > bottom) {
			height = bottom - y;
		}

		if (width < 0) {
			width = 0;
		}

		if (height < 0) {
			height = 0;
		}

		result.x = x;
		result.y = y;
		result.w = width;
		result.h = height;
	}

	export function isEmpty(rectangle: Rectangle): boolean {
		return rectangle.w === 0 || rectangle.h === 0;
	}

	export function contains(rectangle: Rectangle, point: Point): boolean {
		return rectangle.x < point.x
			&& rectangle.x + rectangle.w > point.x
			&& rectangle.y < point.y
			&& rectangle.y + rectangle.h > point.y;
	}

	export function round(rectangle: Rectangle) {
		rectangle.x = Math.round(rectangle.x);
		rectangle.y = Math.round(rectangle.y);
		rectangle.w = Math.round(rectangle.w);
		rectangle.h = Math.round(rectangle.h);
	}
}
