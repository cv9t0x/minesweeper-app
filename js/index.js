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

	const board = new Board(boardEl, boardSize, numberOfMines, counterEl);

	resetBtn.addEventListener("click", () => {
		board.reset();
	});

	document.addEventListener("keypress", (e) => {
		if (e.code === "KeyR") {
			board.reset();
		}
	});

	//counterEl.textContent = board.store.numberOfMarks;

	console.log(board);
}
