import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import base from './rollup.config';

export default {
	...base,
	plugins: [
		...base.plugins,
		terser(),
		filesize(),
	],
};
