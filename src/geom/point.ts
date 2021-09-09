export interface Point {
	x: number,
	y: number,
}

export function createPoint(x: number = 0, y: number = 0): Point {
	return { x, y };
}

export function distanceSquared(p0: Point, p1: Point): number {
	const dx = p0.x - p1.x;
	const dy = p0.y - p1.y;
	return dx * dx + dy * dy;
}
