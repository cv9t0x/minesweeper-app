export const CELL_STATUSES = {
	HIDDEN: "hidden",
	MINED: "mined",
	OPENED: "opened",
	MARKED: "marked",
};

class Cell {
	static count = 0;

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
		cell.setAttribute("tabindex", `${Cell.count++}`);

		cell.addEventListener("click", this.onClickHandler.bind(this));
		cell.addEventListener("mouseover", this.onMouseOverHandler.bind(this));
		cell.addEventListener("keydown", this.onKeyDownHandler.bind(this));
		cell.addEventListener("contextmenu", this.onContextMenuHandler.bind(this));

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
		this.elem.focus();

		if (
			this.status !== CELL_STATUSES.HIDDEN &&
			(this.status === CELL_STATUSES.OPENED ||
				this.status === CELL_STATUSES.MINED)
		) {
			return;
		}

		if (
			this.board.store.numberOfMarks == 0 &&
			this.status !== CELL_STATUSES.MARKED
		) {
			return;
		}

		if (this.status === CELL_STATUSES.MARKED) {
			this.status = CELL_STATUSES.HIDDEN;
			this.board.store.numberOfMarks++;
		} else {
			this.status = CELL_STATUSES.MARKED;
			this.board.store.numberOfMarks--;
		}

		this.board.updateCounter();
		this.board.checkGameState();
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

	onClickHandler() {
		this.elem.focus();
		this.reveal();
		this.board.checkGameState();
	}

	onMouseOverHandler() {
		this.elem.focus();
	}

	onKeyDownHandler(e) {
		switch (e.code) {
			case "KeyW":
			case "ArrowUp":
				if (this.x === 0) {
					this.board.store.cells[this.board.store.cells.length - 1][
						this.y
					].elem.focus();
				} else {
					this.board.store.cells[this.x - 1][this.y].elem.focus();
				}
				break;
			case "KeyS":
			case "ArrowDown":
				if (this.x === this.board.store.cells.length - 1) {
					this.board.store.cells[0][this.y].elem.focus();
				} else {
					this.board.store.cells[this.x + 1][this.y].elem.focus();
				}
				break;
			case "KeyD":
			case "ArrowRight":
				if (this.y === this.board.store.cells.length - 1) {
					this.board.store.cells[this.x][0].elem.focus();
				} else {
					this.board.store.cells[this.x][this.y + 1].elem.focus();
				}
				break;
			case "KeyA":
			case "ArrowLeft":
				if (this.y === 0) {
					this.board.store.cells[this.x][
						this.board.store.cells.length - 1
					].elem.focus();
				} else {
					this.board.store.cells[this.x][this.y - 1].elem.focus();
				}
				break;
		}

		if (
			(e.ctrlKey || e.metaKey) &&
			(e.code === "Space" || e.code === "Enter")
		) {
			this.mark();
		} else if (e.code === "Space" || e.code === "Enter") {
			this.elem.focus();
			this.reveal();
			this.board.checkGameState();
		}
	}

	onContextMenuHandler(e) {
		e.preventDefault();
		this.mark();
	}

	removeAllEventListeners() {
		this.elem.addEventListener(
			"click",
			(e) => {
				e.stopImmediatePropagation();
			},
			{ capture: true },
		);
		this.elem.addEventListener(
			"keydown",
			(e) => {
				e.stopImmediatePropagation();
			},
			{ capture: true },
		);
		this.elem.addEventListener(
			"contextmenu",
			(e) => {
				e.preventDefault();
				e.stopImmediatePropagation();
			},
			{ capture: true },
		);
	}
}

export default Cell;
