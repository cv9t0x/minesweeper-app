import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
	init();
});

function init() {
	const boardEl = document.querySelector(".board");
	const boardSize = 12;
	const numberOfMines = 100;
	const board = new Board(boardEl, boardSize, numberOfMines);

	console.log(board);
}
