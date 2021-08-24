import { terser } from 'rollup-plugin-terser';
import base from './rollup.config';

export default {
	...base,
	plugins: [
		...base.plugins,
		terser(),
	],
};
