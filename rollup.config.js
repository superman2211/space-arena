import html from '@rollup/plugin-html';

function template() {
	return `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Rollup Bundle</title>

  </head>
  <body style="margin: 0">
    <canvas id="c" style="width: 100%; height: 100%;"></canvas>
    <script src="bundle.js"></script>
  </body>
</html>
`;
}

export default {
	input: 'dist/esm/index.js',
	output: {
		file: 'dist/build/bundle.js',
		format: 'iife',
	},
	plugins: [
		html({ template }),
	],
};
