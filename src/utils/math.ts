export const mathRound = Math.round;
export const mathRandom = Math.random;
export const mathSin = Math.sin;
export const mathCos = Math.cos;
export const math2PI = Math.PI * 2;
export const mathPI2 = Math.PI / 2;

export function randomInt(min: number, max: number): number {
	return mathRound(min + mathRandom() * (max - min));
}

export function randomFloat(min: number, max: number): number {
	return min + mathRandom() * (max - min);
}
