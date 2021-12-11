import Board from "./Board.js";

export const CELL_STATUSES = {
	HIDDEN: "hidden",
	MINED: "mined",
	OPENED: "opened",
	MARKED: "marked",
};

class Cell {
	constructor(board, x, y) {
		this.board = board;
		this.x = x;
		this.y = y;
		this.isMine = false;
		this.elem = this.create();
	}

	create() {
		const cell = document.createElement("div");
		cell.dataset.status = CELL_STATUSES.HIDDEN;
		cell.addEventListener("click", () => {
			this.reveal();
		});
		cell.addEventListener("contextmenu", (e) => {
			e.preventDefault();
			this.mark();
		});

		return cell;
	}

	reveal() {
		if (
			this.status !== CELL_STATUSES.HIDDEN &&
			this.status === CELL_STATUSES.MARKED
		) {
			return;
		}

		if (!this.board.isFirstClicked) {
			this.board.fill(this);
			this.reveal();
			return;
		}

		if (this.isMine) {
			this.status = CELL_STATUSES.MINED;
			return;
		}

		this.status = CELL_STATUSES.OPENED;

		const nearbyCells = this.getNearbyCells();
		const mines = nearbyCells.filter((cell) => cell.isMine);

		if (mines.length === 0) {
			nearbyCells.forEach((cell) => cell.reveal());
		} else {
			this.elem.textContent = mines.length;
		}
	}

	mark() {
		if (
			this.status !== CELL_STATUSES.HIDDEN &&
			(this.status === CELL_STATUSES.OPENED ||
				this.status === CELL_STATUSES.MINED)
		) {
			return;
		}

		if (this.board.store.numberOfMines == 0) {
			return;
		}

		if (this.status === CELL_STATUSES.MARKED) {
			this.status = CELL_STATUSES.HIDDEN;
			//this.board.numberOfMarks++;
			//if (this.isMine) {
			//	this.board.numberOfMines++;
			//}
		} else {
			this.status = CELL_STATUSES.MARKED;
			//this.board.numberOfMarks--;
			//if (this.isMine) {
			//	this.board.numberOfMines--;
			//}
		}

		//this.board.updateCounter();
	}

	getNearbyCells() {
		const cells = [];

		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				const cell = this.board.store.cells[this.x + x]?.[this.y + y];

				if (!cell) continue;
				if (cell.status === CELL_STATUSES.OPENED) continue;

				cells.push(cell);
			}
		}

		return cells;
	}

	get status() {
		return this.elem.dataset.status;
	}

	set status(status) {
		this.elem.dataset.status = status;
	}
}

export default Cell;
