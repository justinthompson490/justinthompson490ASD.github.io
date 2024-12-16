/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const BOARD_WIDTH = $("#board").width();
  const BOARD_HEIGHT = $("#board").height();
  const WALKER_WIDTH = $("#walker").width();
  const WALKER_HEIGHT = $("#walker").height();
  const WALKER2_WIDTH = $("#walker2").width();
  const WALKER2_HEIGHT = $("#walker2").height();
  const KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,

    "A": 65,
    "W": 87,
    "D": 68,
    "S": 83,

  }
  // Game Item Objects
  var walker = {
    XPos : 0,
    YPos : 0,
    speedX : 0,
    speedY: 0
  }
  var walker2 = {
    XPos : BOARD_WIDTH - WALKER2_WIDTH,
    YPos : BOARD_HEIGHT - WALKER2_HEIGHT,
    speedX : 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);                           // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem()
    redrawGameItem()
    wallCollision()
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if(event.which === KEY.LEFT){
      walker.speedX = -5;
    }
    if(event.which === KEY.UP){
      walker.speedY = -5;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 5;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 5;
    }

    if(event.which === KEY.A){
      walker2.speedX = -5;
    }
    if(event.which === KEY.W){
      walker2.speedY = -5;
    }
    if(event.which === KEY.D){
      walker2.speedX = 5;
    }
    if(event.which === KEY.S){
      walker2.speedY = 5;
    }
  }

  function handleKeyUp(event) {
    if(event.which === KEY.LEFT){
      walker.speedX = 0;
    }
    if(event.which === KEY.UP){
      walker.speedY = 0;
    }
    if(event.which === KEY.RIGHT){
      walker.speedX = 0;
    }
    if(event.which === KEY.DOWN){
      walker.speedY = 0;
    }

    if(event.which === KEY.A){
      walker2.speedX = 0;
    }
    if(event.which === KEY.W){
      walker2.speedY = 0;
    }
    if(event.which === KEY.D){
      walker2.speedX = 0;
    }
    if(event.which === KEY.S){
      walker2.speedY = 0;
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function repositionGameItem(){
    walker.XPos += walker.speedX; // update the position of the box along the x-axis
    walker.YPos += walker.speedY;
    walker2.XPos += walker2.speedX; // update the position of the box along the x-axis
    walker2.YPos += walker2.speedY;
  }
  function redrawGameItem(){
    $("#walker").css("left", walker.XPos); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.YPos);
    $("#walker2").css("left", walker2.XPos); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker2").css("top", walker2.YPos);
  }

  function wallCollision(){
    if(walker.XPos === BOARD_WIDTH - WALKER_WIDTH){
      walker.XPos -= 5;
    }
    if(walker.XPos === 0){
      walker.XPos += 5;
    }
    if(walker.YPos === 0){
      walker.YPos += 5;
    }
    if(walker.YPos === BOARD_HEIGHT - WALKER_HEIGHT){
      walker.YPos -= 5;
    }

    if(walker2.XPos === BOARD_WIDTH - WALKER2_WIDTH){
      walker2.XPos -= 5;
    }
    if(walker2.XPos === 0){
      walker2.XPos += 5;
    }
    if(walker2.YPos === 0){
      walker2.YPos += 5;
    }
    if(walker2.YPos === BOARD_HEIGHT - WALKER2_HEIGHT){
      walker2.YPos -= 5;
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
