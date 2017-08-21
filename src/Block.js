import Point from './Point';

export default function(x0=0, y0=0, w=50, h=50) {
	let atTarget = true;

	const offsets = [
		{ x: 0, y: 0},
		{ x: 0, y: h},
		{ x: w, y: h},
		{ x: w, y: 0},
	];

	const points = [];
	for (let i=0; i<4; i++) {
		points.push(new Point(x0 + offsets[i].x, y0 + offsets[i].y));
	}

	const update = () => {
		points.forEach(point => { point.update() });
		atTarget = points.every(point => point.atTarget);
	}

	const moveTo = (newX, newY) => {
		points.forEach((point, i) => {
			const offset = offsets[i];
			point.moveTo(newX + offset.x, newY + offset.y);
		})
	}

	const render = (ctx) => {
		ctx.beginPath();
		ctx.moveTo(points[0].getPos().x, points[0].getPos().y);
		for (let i=1; i<points.length; i++) {
			const point = points[i].getPos();
			ctx.lineTo(point.x, point.y);
		}
		ctx.fill();
		console.log(points[0]);
	}

	return {
		getPos: () => points[0].getPos(),
		moveTo: moveTo,
		atTarget: atTarget,
		render: render,
		update: update,
	}
}
