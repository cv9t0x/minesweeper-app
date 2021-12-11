import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
	init();
});

function init() {
	const boardEl = document.querySelector(".board");
	const boardSize = 12;
	const numberOfMines = 20;
	//const counterEl = document.querySelector(".counter");

	const board = new Board(boardEl, boardSize, numberOfMines);

	console.log(board);
}
