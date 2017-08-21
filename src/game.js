import Block from './Block';
import Snake from './snake/Snake';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let animating = false;
// let block = new Block();
let snake = new Snake(0, 0, 5);

export const setupGame = (store) => {
	store.subscribe(renderState.bind(this, store));
	renderState(store);
	animateMovement();
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
	// block.moveTo(state.game.x*50, state.game.y*50);
	snake.moveTo(state.game.x*50, state.game.y*50);
}

function animateMovement() {
	// animating = !block.atTarget;
	
	// block.update();
	// console.log(block.getPos());
	
	snake.update();

	if (!snake.atTarget) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		// block.render(ctx);
		snake.render(ctx);
		window.requestAnimationFrame(animateMovement);
	}
	// renderGrid();
}
