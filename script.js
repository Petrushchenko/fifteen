"use strict";

window.onload = function(){
	const btn = document.querySelector(".btn");

	btn.addEventListener("click",  shuffleTiles);

	window.addEventListener('keydown', moveCell);
	

}

function  shuffleTiles(e){
	const cells = document.querySelectorAll('.cell');
	let field = document.querySelector('.square');

	let j = 0;
	
	cells.forEach((tile, i) => {
		field.removeChild(tile);
		
		var newDiv = document.createElement('div');
		newDiv.className = 'cell';
		newDiv.textContent = `${i+1}`;

		if(newDiv.textContent === '16' ) newDiv.classList.add('empty');
		
		field.appendChild(newDiv);
	});
	
	random(field);
}

function random(parent){

	let arOfElements = parent.querySelectorAll('div');
	let i = 0;

	while(i < 16){
		let el1 = Math.floor(Math.random() * 16 );
		let el2 = Math.floor(Math.random() * 16 );
		if (el1 != el2) {
			parent.insertBefore(arOfElements[el1], arOfElements[el2]);
			i+=1;
		}
	}	
}

function moveCell(e){
	let field = document.querySelector('.square');

	const emptyCell = document.querySelector(".cell.empty");
	const cells = document.querySelectorAll('.cell');
	const ARROW_LEFT = 37;
	const ARROW_UP = 38;
	const ARROW_RIGHT = 39;
	const ARROW_DOWN = 40;

	let coordsOfEmptyCell = emptyCell.getBoundingClientRect();
	
	if (e.keyCode !== ARROW_LEFT && e.keyCode !== ARROW_UP && e.keyCode !== ARROW_RIGHT && e.keyCode !== ARROW_DOWN) return;

	if (e.keyCode === ARROW_LEFT) {
		let firstColumn = field.querySelectorAll('div:nth-child(4n+1)');
		let checkEndOfRow = Array.prototype.some.call(firstColumn, (cell) => emptyCell.nextSibling === null || cell.textContent === emptyCell.nextSibling.textContent);
		
		if (checkEndOfRow) return;
		field.insertBefore(emptyCell.nextSibling, emptyCell);

		gameCompleted(cells);
				
	}

	if (e.keyCode === ARROW_RIGHT) {
		let lastColumn = field.querySelectorAll('div:nth-child(4n)');
	
		let checkStartOfRow = Array.prototype.some.call(lastColumn, (cell) => cell.textContent === emptyCell.previousSibling.textContent);
		
		if (checkStartOfRow) return;
		field.insertBefore(emptyCell, emptyCell.previousSibling);
	
		gameCompleted(cells);
		
	}
	if (e.keyCode === ARROW_UP) {
		let checkLastRow = Array.prototype.indexOf.call(cells, emptyCell);
		if (checkLastRow > 11) return;
		 else {
		 	let cellToMove = Array.prototype.filter.call(cells, (cell, i) => i == checkLastRow + 4)[0];
		 	field.insertBefore(cellToMove, emptyCell);
		 	field.insertBefore(emptyCell, cells[checkLastRow + 5]);
		 }
		gameCompleted(cells);
	}

	if (e.keyCode === ARROW_DOWN) {
		let checkFirstRow = Array.prototype.indexOf.call(cells, emptyCell);
		if (checkFirstRow < 4) return;
		 else {
		 	let cellToMove = Array.prototype.filter.call(cells, (cell, i) => i == checkFirstRow - 4)[0];
		 	field.insertBefore(cellToMove, emptyCell);

		 	field.insertBefore(emptyCell, cells[checkFirstRow -3]);

		 }
		gameCompleted(cells);
	}

	function gameCompleted(nodeList){
		let ar = [...nodeList];
		
		let victory = ar.filter((cell, i) => i < 14).every((cell,j) => j + 1 == cell.textContent);

		if (victory) alert('victory');
	}
}
