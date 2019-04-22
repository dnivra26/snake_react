import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.drawSnakePart = this.drawSnakePart.bind(this);
    this.drawSnake = this.drawSnake.bind(this);
    this.advanceSnake = this.advanceSnake.bind(this);
    this.clearCanvas = this.clearCanvas.bind(this);
    this.changeDirection = this.changeDirection.bind(this);
    
  }
  componentDidMount(){
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = "white";

      this.gameCanvas = this.refs.canvas
      var ctx = this.gameCanvas.getContext("2d");
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
      ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);

      let snake = [
        {x: 150, y: 150},
        {x: 140, y: 150},
        {x: 130, y: 150},
        {x: 120, y: 150},
        {x: 110, y: 150}
      ];
      this.setState({snake, dx: 10,dy: 0})
      this.advanceSnake();
  }
  clearCanvas() {
    var ctx = this.gameCanvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
    ctx.strokeRect(0, 0, this.gameCanvas.width, this.gameCanvas.height);
  }
  drawSnake(snake) {
    snake.forEach(this.drawSnakePart);
  }
  advanceSnake() {
    setTimeout(() => {
      const {dx, dy} = this.state;
      this.clearCanvas();
      const snake = this.state.snake;
      const head = {x: snake[0].x + dx, y: snake[0].y + dy};
      snake.unshift(head);
      snake.pop();
      this.drawSnake(snake);
      this.setState({snake});
      this.advanceSnake();  
    }, 100);
  }
  drawSnakePart(snakePart) {
    var ctx = this.gameCanvas.getContext("2d");
    ctx.fillStyle = 'lightgreen';
    ctx.strokestyle = 'darkgreen';
    ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
  }
  changeDirection(event) {
    let dx = 0, dy = 0;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;
    if (keyPressed === LEFT_KEY && !goingRight) {
      dx = -10;
      dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
      dx = 0;
      dy = -10;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
      dx = 10;
      dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
      dx = 0;
      dy = 10;
    }
    this.setState({dx, dy})
  }
  render() {
    return (
      <div className="App" onKeyDown={(event) => {this.changeDirection(event)}} tabIndex="0">
        <header className="App-header">
        <canvas ref="canvas" id="gameCanvas" width="600" height="400"></canvas>
        </header>
      </div>
    );
  }
}

export default App;
