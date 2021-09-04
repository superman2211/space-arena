/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const parseSVGPath = require('svg-path');

const GROUP_TAGS = ['svg', 'defs', 'g'];

const FILL = 0;
const STROKE = 1;
const PATH = 4;

function readSVG(options) {
	console.log('Read SVG');

	const { source } = options;
	const shapesPath = path.resolve(source);
	const files = fs.readdirSync(shapesPath);
	const svgFiles = files.filter((file) => path.extname(file) === '.svg');
	const svgDatas = svgFiles.map((file) => fs.readFileSync(path.resolve(shapesPath, file)).toString());
	const shapes = svgDatas.map((data, index) => ({ data, file: svgFiles[index] }));

	console.log('Read SVG completed');

	return shapes;
}

async function parseSVG(shapes) {
	console.log('Parse SVG');

	const promises = shapes.map((shape) => {
		const parser = new xml2js.Parser();
		return parser.parseStringPromise(shape.data);
	});

	const svgShapes = await Promise.all(promises);
	shapes.forEach((shape, index) => {
		delete shape.data;
		shape.svg = svgShapes[index];
	});

	console.log('Parse SVG completed');
}

function findTags(parent, tag, list) {
	const keys = Object.keys(parent);
	keys.forEach((key) => {
		const child = parent[key];
		if (key === tag) {
			list.push(...child);
		} else if (GROUP_TAGS.includes(key)) {
			if (Array.isArray(child)) {
				child.forEach((item) => {
					findTags(item, tag, list);
				});
			} else {
				findTags(child, tag, list);
			}
		}
	});
}

function getPelleteIndex(pallete, color) {
	let fillIndex = pallete.indexOf(color);
	if (fillIndex === -1) {
		fillIndex = pallete.length;
		pallete.push(color);
	}
	return fillIndex;
}

function parseCommands(shapes) {
	console.log('Parse commands');

	shapes.forEach((shape) => {
		const svgPaths = [];
		findTags(shape.svg, 'path', svgPaths);
		const commands = [];
		const pallete = [];
		svgPaths.forEach(({ $ }) => {
			const { fill, stroke, d } = $;
			const lines = [];
			let line;
			if (d) {
				const pathData = parseSVGPath(d).content;
				pathData.forEach((pathCommand) => {
					if (pathCommand.type === 'M') {
						line = [];
						lines.push(line);
					}

					if (pathCommand.type === 'M' || pathCommand.type === 'L') {
						line.push(
							parseFloat(pathCommand.x) | 0,
							parseFloat(pathCommand.y) | 0,
						);
					}
				});
			}

			lines.forEach((lineArray) => {
				commands.push(PATH, lineArray.length / 2, ...lineArray);

				if (fill && fill !== 'none') {
					const index = getPelleteIndex(pallete, fill);
					commands.push(FILL, index);
				}

				if (stroke && stroke !== 'none') {
					const index = getPelleteIndex(pallete, stroke);
					const strokeWidth = parseInt($['stroke-width'], 10);
					commands.push(STROKE, index, strokeWidth);
				}
			});
		});
		shape.commands = commands;
	});

	console.log('Parse commands completed');
}

function writeBinary(shapes, options) {
	console.log('Write binary');

	const { target } = options;
	const targetDirectory = path.resolve(target);
	if (!fs.existsSync(targetDirectory)) {
		fs.mkdirSync(targetDirectory, { recursive: true });
	}

	shapes.forEach((shape) => {
		const binaryFile = path.resolve(targetDirectory, shape.file.replace('.svg', ''));
		fs.writeFileSync(binaryFile, Buffer.from(shape.commands));
	});

	console.log('Write binary completed');
}

function readOptions() {
	return {
		source: process.argv[2],
		target: process.argv[3],
	};
}

async function main() {
	const options = readOptions();
	const shapes = readSVG(options);
	await parseSVG(shapes);
	parseCommands(shapes);
	writeBinary(shapes, options);
	// console.log(shapes);
}

main();
