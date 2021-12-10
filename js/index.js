import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
	init();
});

function init() {
	const boardEl = document.querySelector(".board");
	const boardSize = 12;
	const numberOfMines = 15;
	const counterEl = document.querySelector(".counter");

	const board = new Board(boardEl, boardSize, numberOfMines, counterEl);

	console.log(board);
}
