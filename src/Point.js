export default function(x0, y0) {
	let x = x0;
	let y = y0;

	let targetX = x;
	let targetY = y;

	let dx = 0;
	let dy = 0;

	let atTarget = true;

	let tolerance = .05;

	const checkAtTarget = (tolerance) => {
		return (Math.abs(targetX - x) < tolerance && Math.abs(targetY - y) < tolerance);
	}

	return {
		moveTo: (newX, newY) => {
			targetX = newX;
			targetY = newY;
			atTarget = checkAtTarget(tolerance);
		},
		update: () => {
			if (atTarget) {
				return;
			}
			console.log("Updating");

			const k = 1;
			const fx = (targetX - x) * k;
			const fy = (targetY - y) * k;
			const damping = .3;
			let atX = true;
			let atY = true;
			if (Math.abs(targetX - x) > tolerance) {
				atX = false;
				// const fx = k * (1 - (1 / targetX - x))
				dx += fx;
				dx *= damping;
				x += dx;

			}
			if (Math.abs(targetY - y) > tolerance) {
				atY = false;
				// const fy = k * (1 - (1 / targetY - y))
				dy += fy;
				dy *= damping;
				y += dy;

			}

			if (atX && atY) {
				atTarget = true;
			}
		},
		getPos: () => ({x, y}),
		getVelocity: () => ({x: dx, y: dy}),
		atTarget: atTarget,
	}
}
