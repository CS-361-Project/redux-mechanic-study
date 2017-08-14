export const types = {
	LEFT: "LEFT",
	RIGHT: "RIGHT",
	UP: "UP",
	DOWN: "DOWN"
}

export const moveLeft = () => ({ type: types.LEFT })
export const moveRight = () => ({ type: types.RIGHT })
export const moveUp = () => ({ type: types.UP })
export const moveDown = () => ({ type: types.DOWN });
