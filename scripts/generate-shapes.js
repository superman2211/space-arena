/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const xml2js = require('xml2js');
const parseSVGPath = require('svg-path');

const GROUP_TAGS = ['svg', 'defs', 'g'];

const FILL = 0;
const STROKE = 1;
const MOVE = 2;
const LINE = 3;
const PATH = 4;

function readSVG() {
	console.log('Read SVG');
	const shapesPath = path.resolve(__dirname, '../resources');
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

function convertToBinary(shapes) {
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
}

function writeBinary() { }

async function main() {
	const shapes = readSVG();
	await parseSVG(shapes);
	convertToBinary(shapes);
	writeBinary(shapes);
	console.log(shapes);
}

main();
