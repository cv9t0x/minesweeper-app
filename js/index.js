import Board from "./Board.js";

document.addEventListener("DOMContentLoaded", () => {
	init();
});

function init() {
	const boardEl = document.querySelector(".board");
	const boardSize = 12;
	const numberOfMines = 20;
	const counterEl = document.querySelector(".counter");
	const resetBtn = document.querySelector(".reset-btn");

	const board = new Board(
		boardEl,
		boardSize,
		numberOfMines,
		counterEl,
		resetBtn,
	);

	resetBtn.addEventListener("click", () => {
		board.reset();
	});

	//counterEl.textContent = board.store.numberOfMarks;

	console.log(board);
}
