import Cell, { CELL_STATUSES } from "./Cell.js";

function getRandom(number) {
	return Math.floor(Math.random() * number);
}

const BOARDstateS = {
	PLAYING: "playing",
	WIN: "win",
	LOSE: "lose",
};

class Board {
	constructor(elem, size, numberOfMines) {
		this.elem = elem;
		this.size = size;
		this.state = BOARDstateS.PLAYING;
		this.store = {
			numberOfMines,
			numberOfMarks: numberOfMines,
			cells: [],
		};
		this.isFirstClicked = false;
		this.init();
	}

	init() {
		this.state = BOARDstateS.PLAYING;
		this.store.cells = [];

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

	//clean() {
	//	this.store.cells.forEach((row) => {
	//		row.forEach((cell) => {
	//			cell.elem.remove();
	//		});
	//	});
	//}

	//reset() {
	//	this.clean();
	//	this.init();
	//}

	//updateCounter() {
	//	this._counterEl.innerText = this._numberOfMarks;
	//}

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

	//checkWin() {
	//	if (
	//		!this.store.some((row) =>
	//			row.some((cell) => cell.status === CELL_STATUSES.HIDDEN),
	//		) &&
	//		this._numberOfMarks === this._numberOfMines
	//	) {
	//		this.state = BOARDstateS.WIN;
	//	}
	//}

	//checkLose() {
	//	if (
	//		this.store.some((row) =>
	//			row.some((cell) => cell.status === CELL_STATUSES.MINED),
	//		)
	//	) {
	//		this.state = BOARDstateS.LOSE;
	//	}
	//}

	//checkGameState() {
	//	this.state = this.checkWin() || this.checkLose() || this.state;
	//	console.log(this.state);
	//	switch (this.state) {
	//		case BOARDstateS.WIN:
	//			break;
	//		case BOARDstateS.LOSE: {
	//			this.reset();
	//			break;
	//		}
	//	}
	//}

	//reset() {
	//	this.state = BOARDstateS.PLAYING;
	//	this.store = this.init();
	//	this.clean();
	//}

	//clean() {
	//	this.store.forEach((row) => {
	//		row.forEach((cell) => {
	//			cell.elem.remove();
	//		});
	//	});

	//	this.updateCounter();
	//}
}

export default Board;
