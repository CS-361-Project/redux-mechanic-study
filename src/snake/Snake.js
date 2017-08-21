import Point from '../Point';

export default function(x0, y0, length, radius=15) {
	const points = [];
	for (let i=0; i<length; i++) {
		points.push(new Point(x0, y0));
	}

	const renderRect = (ctx) => {
		ctx.beginPath();
		const beg = points[0].getPos();
		const end = points[length-1].getPos();
		ctx.moveTo(beg.x - radius, beg.y - radius);
		ctx.lineTo(beg.x + radius, beg.y - radius);
		ctx.lineTo(end.x + radius, end.y + radius);
		ctx.lineTo(end.x - radius, end.y + radius);
		ctx.fill();
	}

	const renderLine = (ctx) => {
		ctx.lineWidth = radius;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
		ctx.beginPath();
		ctx.moveTo(points[0].getPos().x, points[0].getPos().y);
		points.forEach(point => {
			const pos = point.getPos();
			ctx.lineTo(pos.x, pos.y);
		})
		ctx.stroke();

		ctx.lineWidth = 1;
	}

	const renderDots = (ctx) => {
			points.forEach(point => {
				ctx.fillStyle = 'grey';
				ctx.beginPath();
				const pos = point.getPos();
				const vel = point.getVelocity();
				const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
				ctx.arc(pos.x, pos.y, radius + speed, 0, 2 * Math.PI);
				ctx.fill();
			})
	}

	const renderPath = (ctx) => {
			ctx.beginPath();
			ctx.moveTo(points[0].getPos().x, points[0].getPos().y);
			points.forEach(point => {
				const pos = point.getPos();
				const vel = point.getVelocity();
				const perp = ({ x: -vel.y - Math.sign(vel.y) * radius, y: vel.x + Math.sign(vel.x) * radius });
				ctx.lineTo(pos.x + perp.x, pos.y + perp.y);
				// ctx.fillRect(point.getPos().x, point.getPos().y, 10, 10);
			})
			for (let i=length-1; i>=0; i--) {
				const point = points[i];
				const pos = point.getPos();
				const vel = point.getVelocity();
				const perp = ({ x: vel.y + Math.sign(vel.y) * radius, y: -vel.x - Math.sign(vel.x) * radius });
				ctx.lineTo(pos.x + perp.x, pos.y + perp.y);
				// ctx.fillRect(point.getPos().x, point.getPos().y, 10, 10);
			}
			ctx.fill();

	}

	return {
		getPos: () => (points[0].getPos()),
		update: () => {
			for (let i=0; i<length; i++) {
				if (i === 0) {
					points[i].update();
				}
				else {
					const nextPos = points[i-1].getPos();
					points[i].moveTo(nextPos.x, nextPos.y);
					points[i].update();
				}
			}
		},
		moveTo: (newX, newY) => {
			points[0].moveTo(newX, newY);
		},
		render: (ctx) => {
			renderLine(ctx);
			// renderRect(ctx);
			// renderDots(ctx);
			// renderPath(ctx);
		}
	}
}
