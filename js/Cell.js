export const CELL_STATUSES = {
	HIDDEN: "hidden",
	MINED: "mined",
	OPENED: "opened",
	MARKED: "marked",
};

class Cell {
	constructor(x, y, isMine) {
		this._x = x;
		this._y = y;
		this._isMine = isMine;
		this._elem = this.create();
	}

	create() {
		const cell = document.createElement("div");
		cell.dataset.status = CELL_STATUSES.HIDDEN;
		cell.onclick = this.onClick.bind(this);
		cell.oncontextmenu = this.onContextMenu.bind(this);

		return cell;
	}

	onClick() {
		if (
			this._elem.dataset.status !== CELL_STATUSES.HIDDEN &&
			this._elem.dataset.status === CELL_STATUSES.MARKED
		) {
			return;
		}

		if (this._isMine) {
			this._elem.dataset.status = CELL_STATUSES.MINED;
			return;
		}

		this._elem.dataset.status = CELL_STATUSES.OPENED;
	}

	onContextMenu(e) {
		e.preventDefault();

		if (
			this._elem.dataset.status !== CELL_STATUSES.HIDDEN &&
			(this._elem.dataset.status === CELL_STATUSES.OPENED ||
				this._elem.dataset.status === CELL_STATUSES.MINED)
		) {
			return;
		}

		if (this._elem.dataset.status === CELL_STATUSES.MARKED) {
			this._elem.dataset.status = CELL_STATUSES.HIDDEN;
		} else {
			this._elem.dataset.status = CELL_STATUSES.MARKED;
		}
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
