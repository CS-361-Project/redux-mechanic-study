export default function(x0, y0) {
	let x = x0;
	let y = y0;

	let targetX = x;
	let targetY = y;

	let dx = 0;
	let dy = 0;

	let atTarget = true;

	return {
		moveTo: (newX, newY) => {
			targetX = newX;
			targetY = newY;
			atTarget = false;
		},
		update: () => {
			const k = 1;
			const fx = (targetX - x) * k;
			const fy = (targetY - y) * k;
			const tolerance = .05;
			const damping = .3;
			if (Math.abs(targetX - x) > tolerance) {
				// const fx = k * (1 - (1 / targetX - x))
				dx += fx;
				dx *= damping;
				x += dx;

			}
			if (Math.abs(targetY - y) > tolerance) {
				// const fy = k * (1 - (1 / targetY - y))
				dy += fy;
				dy *= damping;
				y += dy;

			}

			if (Math.abs(x - targetX) < tolerance && Math.abs(y - targetY) < tolerance) {
				atTarget = true;
			}
		},
		getPos: () => ({x, y}),
		getVelocity: () => ({x: dx, y: dy}),
		atTarget: atTarget,
	}
}
