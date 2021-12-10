import Cell from "./Cell.js";

function getRandom(number) {
	return Math.floor(Math.random() * number);
}

class Board {
	constructor(elem, size, numberOfMines) {
		this._elem = elem;
		this._size = size;
		this._numberOfMines = numberOfMines;
		this._board = this.init();
		this.create();
	}

	init() {
		const board = [];
		const minePositions = this.getMinePositions();

		for (let x = 0; x < this._size; x++) {
			const row = [];
			for (let y = 0; y < this._size; y++) {
				const cell = new Cell(
					x,
					y,
					minePositions.some((p) => p.x === x && p.y === y),
				);
				row.push(cell);
			}
			board.push(row);
		}

		return board;
	}

	create() {
		this._board.forEach((row) => {
			row.forEach((cell) => {
				this._elem.append(cell.elem);
			});
		});
	}

	getMinePositions() {
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
}

export default Board;
