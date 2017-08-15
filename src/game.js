const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let currX = 0;
let currY = 0;

let nextX = 0;
let nextY = 0;

let animating = false;

let dx = 0;
let dy = 0;

export const setupGame = (store) => {
	store.subscribe(renderState.bind(this, store));
	renderState(store);
}

function renderGrid() {
	// render the grid
	for (let i=0; i<canvas.width; i+=50) {
		ctx.beginPath();
		ctx.moveTo(i, 0);
		ctx.lineTo(i, canvas.height);
		ctx.stroke();
	}
	for (let j=0; j<canvas.height; j+=50) {
		ctx.beginPath();
		ctx.moveTo(0, j);
		ctx.lineTo(window.width, j);
		ctx.stroke();
	}
}

const renderState = store => {
	const state = store.getState();
	nextX = state.game.x*50;
	nextY = state.game.y*50;
	if (!animating) {
		animateMovement();
	}
}

function animateMovement() {
	const margin = .05;
	if (Math.abs(nextX - currX) < margin && Math.abs(nextY - currY) < margin) {
		animating = false;
		return;
	}
	console.log("Still animating");
	animating = true;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	renderInterpolatedMovement(nextX, nextY);
	window.requestAnimationFrame(animateMovement);
	renderGrid();
}

function renderInterpolatedMovement(nextX, nextY) {
	const k = .4;
	const fx = (nextX - currX) * k;
	const fy = (nextY - currY) * k;
	dx += fx;
	dy += fy;
	dx *= .5;
	dy *= .5;
	currX += dx;
	currY += dy;
	const x = currX;
	const y = currY;

	let xStretch = 0;
	let yStretch = 0;
	ctx.fillRect(x - xStretch / 2, y - yStretch / 2, 50 + xStretch, 50 + yStretch);
}
