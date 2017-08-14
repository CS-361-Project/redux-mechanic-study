import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions';
import PropTypes from 'prop-types';

class App extends Component {
	static propTypes = {
		moveLeft: PropTypes.func.isRequired,
		moveUp: PropTypes.func.isRequired,
		moveRight: PropTypes.func.isRequired,
		moveDown: PropTypes.func.isRequired
	}

	keyHandler = (e) => {
		const dir = e.keyCode - 37;
		switch (dir) {
			case 0:
				// LEFT
				this.props.moveLeft();
				break;
			case 1:
				// UP
				this.props.moveUp();
				break;
			case 2:
				// RIGHT
				this.props.moveRight();
				break;
			case 3:
				// DOWN
				this.props.moveDown();
				break;
			default:
				break;
		}
	}

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }

	componentDidMount() {
		window.addEventListener("keydown", this.keyHandler);
	}
}

const { moveLeft, moveRight, moveUp, moveDown } = actions;
export default connect(null, { moveLeft, moveRight, moveUp, moveDown })(App);
