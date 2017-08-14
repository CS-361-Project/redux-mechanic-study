const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let prevX = 0;
let prevY = 0;

export const setupGame = (store) => {
	store.subscribe(renderState.bind(this, store));
	renderState(store);
}

const renderState = store => {
	const state = store.getState();
	animateMovement(prevX, prevY, state.game.x*50, state.game.y*50, 300);
	prevX = state.game.x*50;
	prevY = state.game.y*50;
}

function animateMovement(prevX, prevY, nextX, nextY, animLength, startTime, currTime) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	if (typeof startTime === 'undefined') {
		startTime = performance.now();
		currTime = startTime;
	}
	let t = (currTime - startTime) / animLength;
	let done = false;
	if (t > 1) {
		t = 1;
		done = true;
	}
	renderInterpolatedMovement(prevX, prevY, nextX, nextY, t);
	if (!done) {
		window.requestAnimationFrame(animateMovement.bind(null, prevX, prevY, nextX, nextY, animLength, startTime));
	}
}

function renderInterpolatedMovement(prevX, prevY, nextX, nextY, t) {
	const cosTerm = -.5 * Math.cos(t * 2 * Math.PI) + .5;
	let xStretch = Math.abs(nextX - prevX) * .5 * cosTerm;
	let yStretch = Math.abs(nextY - prevY) * .5 * cosTerm;
	if (prevX === nextX) {
		xStretch = -.2 * yStretch;
	}
	else if (prevY === nextY) {
		yStretch = -.2 * xStretch;
	}
	const x = (1 - t) * prevX + t * nextX;
	const y = (1 - t) * prevY + t * nextY;
	ctx.fillRect(x - xStretch / 2, y - yStretch / 2, 50 + xStretch, 50 + yStretch);
}
