import { ColorTransform } from '../geom/color';
import { Matrix } from '../geom/matrix';
import { renderMesh, renderShape, Shape } from './shape';
import { renderText, Text } from './text';
import { Transform } from './transform';
import { Update } from './update';

export interface Component extends Transform, Update {
	shape?: Shape;
	mesh?: Shape;
	text?: Text;
	childs?: Component[];
}

export namespace Component {
	export function render(component: Component, parentMatrix: Matrix, parentColorTranform: ColorTransform, context: CanvasRenderingContext2D) {
		const matrix = Matrix.empty();
		const colorTransform = ColorTransform.empty();

		Transform.calculateMatrix(component, matrix);
		Transform.calculateColor(component, colorTransform);

		Matrix.concat(parentMatrix, matrix, matrix);
		ColorTransform.concat(parentColorTranform, colorTransform, colorTransform);

		if (colorTransform.am <= 0) {
			return;
		}

		context.setTransform(matrix.a, matrix.b, matrix.c, matrix.d, matrix.x, matrix.y);

		const {
			shape, mesh, text, childs,
		} = component;

		if (shape) {
			renderShape(shape, colorTransform, context);
		}

		if (mesh) {
			renderMesh(mesh, colorTransform, context);
		}

		if (text) {
			renderText(text, colorTransform, context);
		}

		if (childs) {
			childs.forEach((child) => render(child, matrix, colorTransform, context));
		}
	}

	export function update(component: Component, time: number) {
		if (component.onUpdate) {
			component.onUpdate(time);
		}

		const { childs } = component;

		if (!childs) {
			return;
		}

		childs.forEach((child) => update(child, time));
	}
}
