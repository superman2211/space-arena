import html from '@rollup/plugin-html';

export default {
	input: 'dist/esm/index.js',
	output: {
		file: 'dist/build/bundle.js',
		format: 'iife',
	},
	plugins: [
		html(),
	],
};
