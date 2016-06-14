var tableSize = 3;
var empty = (tableSize-1) + "_" + (tableSize-1)

var CELL_CLASSNAME = "cell";
var TABLE_ID = "ArrangeMeTable";

function getHtmlTable() {
	empty = (tableSize-1) + "_" + (tableSize-1)

	var htmlTable = document.createElement("table");
	htmlTable.id = TABLE_ID;
	
	for (var rowIndex=0; rowIndex<tableSize; rowIndex++) {
		var row = document.createElement("tr");
		row.className = 'row';
		
		for (var columnIndex=0; columnIndex<tableSize; columnIndex++) {
			var id = rowIndex + "_" + columnIndex;
			var cell = document.createElement("td");
			cell.className = CELL_CLASSNAME;
			cell.id = id + CELL_CLASSNAME;

			var div = document.createElement("div");
			div.id = id;
			if (id == empty) {
				var text = document.createTextNode("");
			} else {
				var text = document.createTextNode((rowIndex * tableSize) + columnIndex + 1);
			}
			div.appendChild(text);
			cell.appendChild(div);
			row.appendChild(cell);
		}
		htmlTable.appendChild(row);
	}

	return htmlTable;
}

function onloadBody() {
	
	document.body.appendChild(getHtmlTable());
	document.body.onkeydown = onKeyDown;

	var refreshButton = document.createElement("button");
	refreshButton.onclick = refresh;
	refreshButton.innerHTML = "refresh";
	document.body.appendChild(refreshButton);
}

function isLegalKey(key) {
	empty_row = empty.split("_")[0];
	empty_column = empty.split("_")[1];
	
	switch(key) {
		case 'ArrowDown':
			if (empty_row < tableSize-1) {
				return true;
			}
			break;

		case 'ArrowUp':
			if (empty_row > 0) {
				return true;
			}
			break;

		case 'ArrowLeft':
			if (empty_column > 0) {
				return true;
			}
			break;

		case 'ArrowRight':
			if (empty_column < tableSize-1) {
				return true;
			}
			break;
		
		return false;
	}
}

function moveEmpty(key) {
	var empty_row = empty.split("_")[0];
	var empty_column = empty.split("_")[1];

	switch(key) {
		case 'ArrowDown':
			empty_row ++;
			break;

		case 'ArrowUp':
			empty_row--;
			break;

		case 'ArrowLeft':
			empty_column--;
			break;

		case 'ArrowRight':
			empty_column++;
			break;
	}

	empty = empty_row + "_" + empty_column;
}

function isDone() {
	var cells = document.getElementsByClassName(CELL_CLASSNAME);
	for (var i=0; i<cells.length-1; i++) {
		var cell = cells[i];
		if (cell.id != cell.childNodes[0].id + CELL_CLASSNAME) {
			return false;
		}
	}
	return true;
}

function alertIfDone() {
	if (isDone()) {
		alert('Done!');
	}
}

function onKeyDown(event) {
	if (isLegalKey(event.key)) {
		var oldEmpty = empty;
		moveEmpty(event.key);

		var oldEmptyElement = document.getElementById(oldEmpty + CELL_CLASSNAME);
		var emptyElement = document.getElementById(empty + CELL_CLASSNAME);
		var temp = oldEmptyElement.innerHTML;
		
		oldEmptyElement.innerHTML = document.getElementById(empty + CELL_CLASSNAME).innerHTML;
		emptyElement.innerHTML = temp;

		alertIfDone();
	}
}

function refresh() {
	var children = document.body.childNodes;
	for (var child in children) {
		if (children[child].id == TABLE_ID) {
			document.body.replaceChild(getHtmlTable(), children[child]);
			break;
		}
	}
}