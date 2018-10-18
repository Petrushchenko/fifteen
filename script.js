"use strict";

(function(){
  let field = document.querySelector('.square');
  const suffleBtn = document.querySelector(".btn");
  const emptyCell = document.querySelector(".cell.empty");

  var initGame = function () {
    suffleBtn.addEventListener("click", () => shuffleTiles(field));
    window.addEventListener('keydown', moveCell);
  }

  var shuffleTiles = function (parent){
    let elementsArr = parent.querySelectorAll('div');
    for(var i = 0; i < 16; i++) {
      let el1 = Math.floor(Math.random() * 16 );
      let el2 = Math.floor(Math.random() * 16 );
      if (el1 != el2) {
        parent.insertBefore(elementsArr[el1], elementsArr[el2]);
      }
    }
  }

  var gameCompleted = function (nodeList){
    let ar = [...nodeList];
    let victory = ar.filter((cell, i) => i < 14).every((cell,j) => j + 1 == cell.textContent);
    if (victory) {alert('victory');}
  }

  var moveLeft = function(){
    let firstColumn = field.querySelectorAll('div:nth-child(4n+1)');
    let isEndOfRow = Array.prototype.some.call(firstColumn, (cell) => emptyCell.nextElementSibling === null || cell.textContent === emptyCell.nextElementSibling.textContent);
  
    if (isEndOfRow) {return;}
    field.insertBefore(emptyCell.nextElementSibling, emptyCell);
  }

  var moveRight =function() {
    let lastColumn = field.querySelectorAll('div:nth-child(4n)');

    let isStartOfRow = Array.prototype.some.call(lastColumn, (cell) => cell.textContent === emptyCell.previousElementSibling.textContent);
  
    if (isStartOfRow) {return;}
    field.insertBefore(emptyCell, emptyCell.previousElementSibling);

  }

  var moveUp = function(){
    var cells = field.querySelectorAll('.cell');

    let isLastRow = Array.prototype.indexOf.call(cells, emptyCell);
    
    if (isLastRow > 11) {return;}
     else {
      let cellToMove = Array.prototype.filter.call(cells, (cell, i) => i == isLastRow + 4)[0];
      field.insertBefore(cellToMove, emptyCell);
      field.insertBefore(emptyCell, cells[isLastRow + 5]);
     }
  }

  var moveDown =function() {
    var cells = document.querySelectorAll('.cell');
    let isFirstRow = Array.prototype.indexOf.call(cells, emptyCell);
    
    if (isFirstRow < 4) {return;}
     else {
      let cellToMove = Array.prototype.filter.call(cells, (cell, i) => i == isFirstRow - 4)[0];
      field.insertBefore(cellToMove, emptyCell);
      field.insertBefore(emptyCell, cells[isFirstRow -3]);
     }

  }
  var moveCell = function (e){
    const ARROW_LEFT = 37;
    const ARROW_UP = 38;
    const ARROW_RIGHT = 39;
    const ARROW_DOWN = 40;
    var cells = document.querySelectorAll('.cell');
       
    if (
      e.keyCode !== ARROW_LEFT 
      && e.keyCode !== ARROW_UP 
      && e.keyCode !== ARROW_RIGHT 
      && e.keyCode !== ARROW_DOWN
      ) {
      return;
    }

    switch (e.keyCode) {
      case ARROW_LEFT:
        moveLeft();
      break;

      case ARROW_RIGHT:
        moveRight();
      break;

      case ARROW_UP:
        moveUp();
      break;

      case ARROW_DOWN:
        moveDown();
      break;  
    }
  gameCompleted(cells);
  }

  initGame(); 
})();




  
