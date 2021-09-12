declare function jsfxr(params: number[]): string;

export function playLaser(volume: number) {
	const array = [0, 0, 0.2996286612451152, 0.049831483062296344, 0.15737676185023775, 0.5703562729712254, 0.037420144186540515, -0.3879256862405088, 0, 0, 0, 0, 0, 0.18821061188407817, 0.09033692527451312, 0, 0, 0, 1, 0, 0, 0.024003649437587614, 0, 0.5];
	// console.log(array);
	const audio = new Audio();
	audio.volume = volume;
	audio.src = jsfxr(array);
	// console.log(audio.src);
	audio.play().catch(() => { });

	// playExplosion(1);
}

export function playExplosion(volume: number) {
	const array = [3, 0, 0.3208591283506936, 0.5818983553245236, 0.4412527797139363, 0.08430907838621725, 0, -0.3216593280968755, 0, 0, 0, 0, 0, 0, 0, 0, 0.1444287878082801, -0.11652028380910384, 1, 0, 0, 0, 0, 0.5];
	// console.log(array);
	const audio = new Audio();
	audio.volume = volume;
	audio.src = jsfxr(array);
	// console.log(audio.src);
	audio.play().catch(() => { });
}
