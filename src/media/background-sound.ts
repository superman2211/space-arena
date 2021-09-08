const background = (
	notes: Array<Array<number>>,
	center: number,
	duration: number,
	decaystart: number,
	decayduration: number,
	interval: number,
	volume: number,
	// eslint-disable-next-line no-undef
	waveform: OscillatorType,
) => {
	const A = new AudioContext();
	const G = A.createGain();
	for (const i of notes) {
		const O = A.createOscillator();
		O.connect(G);
		G.connect(A.destination);
		O.start(i[0] * interval);
		O.frequency.setValueAtTime(center * 1.06 ** (13 - i[1]), i[0] * interval);
		O.type = waveform;
		G.gain.setValueAtTime(volume, i[0] * interval);
		G.gain.setTargetAtTime(1e-5, i[0] * interval + decaystart, decayduration);
		O.stop(i[0] * interval + duration);
	}
};

const notes: Array<Array<number>> = [[0, 23], [1, 23], [3, 22], [4, 22], [6, 23], [7, 23], [9, 22], [10, 22], [14, 23], [12, 23], [13, 23], [16, 22], [17, 22], [19, 23], [20, 23], [22, 22], [23, 22], [25, 23], [26, 23], [27, 23], [29, 24], [30, 24], [32, 23], [33, 23], [35, 22], [36, 22], [38, 23], [39, 23], [42, 24], [40, 23], [43, 24], [45, 23], [46, 23], [48, 22], [49, 22], [51, 23], [52, 23], [53, 23]];
let played = false;

export function playBackground() {
	if (played) {
		return;
	}
	played = true;
	background(notes, 400, 0.19, 0.18, 0.005, 0.2, 0.1, 'sine');
}
