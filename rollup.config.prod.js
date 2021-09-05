import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import base from './rollup.config';

const properties = [
	'getColorTransform',
	'getMatrix',
	'concat',
	'empty',
	'onUpdate',
	'scale',
	'scaleX',
	'scaleY',
	'rotation',
	'pallete',
	'children',
	'shape',
	'alpha',
	'color',
	// 'value',
	'tint',
	'brightness',
	'render',
	'update',
	'getWidth',
	'getHeight',
];

const regex = new RegExp(`${properties.join('|')}`);

export default {
	...base,
	plugins: [
		...base.plugins,
		terser({ mangle: { properties: { builtins: true, regex } } }),
		filesize(),
	],
};
