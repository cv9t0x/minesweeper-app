import Cell from "./Cell.js";

function getRandom(number) {
	return Math.floor(Math.random() * number);
}

const BOARD_STATES = {
	PLAYING: "playing",
	WIN: "win",
	LOSE: "lose",
};

class Board {
	constructor(elem, size, numberOfMines, counterEl) {
		this._elem = elem;
		this._size = size;
		this._numberOfMines = numberOfMines;
		this._numberOfMarks = numberOfMines;
		this._counterEl = counterEl;
		this._state = BOARD_STATES.PLAYING;
		this._store = this.init();
		this.create();
	}

	init() {
		const board = [];
		const minesPositions = this.getMinesPositions();

		for (let x = 0; x < this._size; x++) {
			const row = [];
			for (let y = 0; y < this._size; y++) {
				const cell = new Cell(
					this,
					x,
					y,
					minesPositions.some((p) => p.x === x && p.y === y),
				);
				row.push(cell);
			}
			board.push(row);
		}

		return board;
	}

	updateCounter() {
		this._counterEl.innerText = this._numberOfMarks;
	}

	create() {
		this._store.forEach((row) => {
			row.forEach((cell) => {
				this._elem.append(cell.elem);
			});
		});

		this.updateCounter();
	}

	getMinesPositions() {
		const positions = [];

		while (positions.length < this._numberOfMines) {
			const position = {
				x: getRandom(this._size),
				y: getRandom(this._size),
			};

			if (!positions.some((p) => p.x === position.x && p.y === position.y)) {
				positions.push(position);
			}
		}

		return positions;
	}

	set state(state) {
		this._state = state;
	}

	get store() {
		return this._store;
	}

	get numberOfMarks() {
		return this._numberOfMarks;
	}

	set numberOfMarks(value) {
		this._numberOfMarks = value;
	}

	get numberOfMines() {
		return this._numberOfMines;
	}

	set numberOfMines(value) {
		this._numberOfMines = value;
	}
}

export default Board;
