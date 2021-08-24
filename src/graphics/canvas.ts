const canvas: HTMLCanvasElement = document.getElementById('c') as HTMLCanvasElement;
export const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

export function updateCanvas() {
	const ratio: number = window.devicePixelRatio;
	const width: number = window.innerWidth;
	const height: number = window.innerHeight;

	canvas.width = (width * ratio) | 0;
	canvas.height = (height * ratio) | 0;

	// canvas.style.width = `${width}px`;
	// canvas.style.height = `${height}px`;
}
