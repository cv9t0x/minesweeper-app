const CELL_STATUSES = {
	HIDDEN: "hidden",
	MINED: "mined",
	OPENED: "opened",
	MARKED: "marked",
};

class Cell {
	constructor(board, x, y, isMine) {
		this._board = board;
		this._x = x;
		this._y = y;
		this._isMine = isMine;
		this._elem = this.create();
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

		if (this._isMine) {
			this.status = CELL_STATUSES.MINED;
			return;
		}

		this.status = CELL_STATUSES.OPENED;

		const nearbyCells = this.getNearbyCells();
		const mines = nearbyCells.filter((cell) => cell._isMine);

		if (mines.length === 0) {
			nearbyCells.forEach((cell) => cell.reveal());
		} else {
			this._elem.textContent = mines.length;
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

		if (this._board.numberOfMines == 0) {
			return;
		}

		if (this.status === CELL_STATUSES.MARKED) {
			this.status = CELL_STATUSES.HIDDEN;
			this._board.numberOfMarks++;
			if (this._isMine) {
				this._board.numberOfMines++;
			}
		} else {
			this.status = CELL_STATUSES.MARKED;
			this._board.numberOfMarks--;
			if (this._isMine) {
				this._board.numberOfMines--;
			}
		}

		this._board.updateCounter();
	}

	getNearbyCells() {
		const cells = [];

		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				if (this._x === x && this._y === y) continue;

				const cell = this._board.store[this._x + x]?.[this._y + y];

				if (!cell) continue;
				if (cell.status === "opened") continue;

				cells.push(cell);
			}
		}

		return cells;
	}

	get elem() {
		return this._elem;
	}

	get status() {
		return this.elem.dataset.status;
	}

	set status(status) {
		this.elem.dataset.status = status;
	}
}

export default Cell;
