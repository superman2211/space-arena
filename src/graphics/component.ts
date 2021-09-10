import { ColorTransform } from '../geom/color';
import { Matrix, matrixScale } from '../geom/matrix';
import { renderImage, Image } from './image';
import { renderShape, Shape } from './shape';
import { renderText, Text } from './text';
import { Transform } from './transform';
import { Keyboard, Update } from './extensions';

export interface Component extends Transform, Update, Keyboard {
	shape?: Shape;
	pallete?: number[];
	text?: Text;
	children?: Component[];
	image?: Image;
	visible?: boolean;
	radius?: number;
}

let drawCalls = 0;

export function resetDrawCalls() {
	drawCalls = 0;
}

export function getDrawCalls() {
	return drawCalls;
}

export namespace Component {
	export function render(component: Component, parentMatrix: Matrix, parentColorTranform: ColorTransform, context: CanvasRenderingContext2D) {
		const visible = component.visible ?? true;
		if (!visible) {
			return;
		}

		const matrix = Matrix.empty();
		Transform.getMatrix(component, matrix);
		Matrix.concat(parentMatrix, matrix, matrix);

		if (component.radius) {
			const radius = matrixScale(matrix) * component.radius;
			if (
				matrix.x + radius < 0
				|| matrix.y + radius < 0
				|| matrix.x - radius > context.canvas.width - 0
				|| matrix.y - radius > context.canvas.height - 0
			) {
				return;
			}
		}

		const colorTransform = ColorTransform.empty();
		Transform.getColorTransform(component, colorTransform);
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
			drawCalls++;
		}

		if (text) {
			renderText(text, colorTransform, context);
			drawCalls++;
		}

		if (image) {
			renderImage(image, colorTransform, context);
			drawCalls++;
		}

		if (children) {
			children.forEach((child) => render(child, matrix, colorTransform, context));
		}
	}

	export function update(component: Component, time: number) {
		if (component.enabled === false) {
			return;
		}

		if (component.onUpdate) {
			component.onUpdate(time);
		}

		const { children } = component;

		if (!children) {
			return;
		}

		children.forEach((child) => update(child, time));
	}

	export function keyDown(component: Component, e: KeyboardEvent) {
		if (component.onKeyDown) {
			component.onKeyDown(e);
		}

		const { children } = component;

		if (!children) {
			return;
		}

		children.forEach((child) => keyDown(child, e));
	}

	export function keyUp(component: Component, e: KeyboardEvent) {
		if (component.onKeyUp) {
			component.onKeyUp(e);
		}

		const { children } = component;

		if (!children) {
			return;
		}

		children.forEach((child) => keyUp(child, e));
	}
}
