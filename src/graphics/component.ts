import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';
import { renderImage, Image } from './image';
import { renderShape, Shape } from './shape';
import { renderText, Text } from './text';
import { Transform } from './transform';
import { Update } from './update';

export interface Component extends Transform, Update {
	shape?: Shape;
	pallete?: number[];
	text?: Text;
	children?: Component[];
	image?: Image;
}

export namespace Component {
	export function render(component: Component, parentMatrix: Matrix, parentColorTranform: ColorTransform, context: CanvasRenderingContext2D) {
		const matrix = Matrix.empty();
		const colorTransform = ColorTransform.empty();

		Transform.getMatrix(component, matrix);
		Transform.getColorTransform(component, colorTransform);

		Matrix.concat(parentMatrix, matrix, matrix);
		ColorTransform.concat(parentColorTranform, colorTransform, colorTransform);

		if (colorTransform.am <= 0) {
			return;
		}

		context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.x, matrix.y);

		const {
			shape, image, pallete, text, children,
		} = component;

		if (shape && pallete) {
			renderShape(shape, pallete, colorTransform, context);
		}

		if (text) {
			renderText(text, colorTransform, context);
		}

		if (image) {
			renderImage(image, colorTransform, context);
		}

		if (children) {
			children.forEach((child) => render(child, matrix, colorTransform, context));
		}
	}

	export function update(component: Component, time: number) {
		if (component.onUpdate) {
			component.onUpdate(time);
		}

		const { children } = component;

		if (!children) {
			return;
		}

		children.forEach((child) => update(child, time));
	}
}
