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
	animateMovement(prevX, prevY, state.game.x*10, state.game.y*10, 50);
	prevX = state.game.x*10;
	prevY = state.game.y*10;
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
	ctx.fillRect((1 - t) * prevX + t * nextX, (1 - t) * prevY + t * nextY, 50, 50);
}
