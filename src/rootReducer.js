import { combineReducers } from 'redux';
import { types } from './actions';

const defaultGameState = {
	x: 0,
	y: 0
}

const game = (state=defaultGameState, action) => {
	switch (action.type) {
		case types.LEFT:
			return Object.assign({}, state, {x: state.x-1});
		case types.DOWN:
			return Object.assign({}, state, {y: state.y+1});
		case types.UP:
			return Object.assign({}, state, {y: state.y-1});
		case types.RIGHT:
			return Object.assign({}, state, {x: state.x+1});
		default:
			return state;
	}
}

export default combineReducers ({ game });
