import React from 'react';
import Board from '../Board/Board.js'
import './Game.css'

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xNext: true,
    };
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xNext: !this.state.xNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
    }
    
    const moves = history.map((step, move) => {
      const desc = move ?
        'Move ' + move :
        'Game start';
      return (
        <li key={move}>
          <button className='nav-button'onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    })

    return (
      <div className='body'>
        <div className='game'>
          <div className='status'>{status}</div>
          <div>
            <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            />
          </div>
        </div>
        <div className='controls'>
            <ol className='nav-buttons'>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}