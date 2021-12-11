import Cell, { CELL_STATUSES } from "./Cell.js";

function getRandom(number) {
	return Math.floor(Math.random() * number);
}

const BOARD_STATES = {
	PLAYING: "Playing",
	WIN: "Win",
	LOSE: "Lose",
};

class Board {
	constructor(elem, size, numberOfMines, counterEl) {
		this.elem = elem;
		this.size = size;
		this.state = BOARD_STATES.PLAYING;
		this.store = {
			numberOfMines,
			numberOfMarks: numberOfMines,
			cells: [],
		};
		this.counterEl = counterEl;
		this.isFirstClicked = false;
		this.init();
	}

	init() {
		this.isFirstClicked = false;
		this.state = BOARD_STATES.PLAYING;
		this.store.cells = [];
		this.counterEl.textContent = `Mines left: ${this.store.numberOfMines}`;

		for (let x = 0; x < this.size; x++) {
			const row = [];
			for (let y = 0; y < this.size; y++) {
				const cell = new Cell(this, x, y);
				row.push(cell);
			}
			this.store.cells.push(row);
		}

		this.create();
	}

	create() {
		this.store.cells.forEach((row) => {
			row.forEach((cell) => {
				this.elem.append(cell.elem);
			});
		});
	}

	fill(firstClickedCell) {
		this.isFirstClicked = true;

		const minesPositions = this.getMinesPositions(firstClickedCell);

		this.store.cells.forEach((row) => {
			row.forEach((cell) => {
				cell.isMine = minesPositions.some(
					(p) => p.x === cell.x && p.y === cell.y,
				);
			});
		});
	}

	reset() {
		this.store.cells.forEach((row) => {
			row.forEach((cell) => {
				cell.elem.remove();
			});
		});

		this.init();
	}

	getMinesPositions(cell) {
		const positions = [];
		const nearbyCells = cell.getNearbyCells();

		while (positions.length < this.store.numberOfMines) {
			const position = {
				x: getRandom(this.size),
				y: getRandom(this.size),
			};

			if (
				!positions.some((p) => p.x === position.x && p.y === position.y) &&
				!nearbyCells.some((c) => c.x === position.x && c.y === position.y)
			) {
				positions.push(position);
			}
		}

		return positions;
	}

	updateCounter() {
		this.counterEl.textContent = `Mines left: ${this.store.numberOfMarks}`;
	}

	checkWin() {
		let markedMinesCounter = 0;
		let openedCellsCounter = 0;

		this.store.cells.forEach((row) =>
			row.forEach((c) => {
				if (c.isMine && c.status === CELL_STATUSES.MARKED) {
					markedMinesCounter++;
				}
				if (
					c.status === CELL_STATUSES.OPENED ||
					c.status === CELL_STATUSES.MARKED
				) {
					openedCellsCounter++;
				}
			}),
		);

		if (
			markedMinesCounter === this.store.numberOfMines &&
			openedCellsCounter === Math.pow(this.store.cells.length, 2)
		) {
			this.state = BOARD_STATES.WIN;
			return true;
		}

		return false;
	}

	checkLose() {
		const isMineOpened = this.store.cells.some((row) =>
			row.some((c) => c.status === CELL_STATUSES.MINED),
		);

		if (isMineOpened) {
			this.state = BOARD_STATES.LOSE;
			return true;
		}

		return false;
	}

	checkGameState() {
		const win = this.checkWin();
		const lose = this.checkLose();

		if (win || lose) {
			this.store.cells.forEach((row) =>
				row.forEach((cell) => {
					cell.removeAllEventListeners();
				}),
			);
		}

		if (win) {
			this.counterEl.textContent = BOARD_STATES.WIN;
		}

		if (lose) {
			this.showAllBombs();
			this.counterEl.textContent = BOARD_STATES.LOSE;
		}
	}

	showAllBombs() {
		this.store.cells.forEach((row) =>
			row.forEach((cell) => {
				if (cell.isMine) {
					cell.status = CELL_STATUSES.MINED;
				}
			}),
		);
	}
}

export default Board;
