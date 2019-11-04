document.addEventListener('DOMContentLoaded', () => {
  createBlankCells();
});
function getBlock(row, col) {
  if (col < 4) {
    if (row < 4) {
      return 1;
    } else if (row < 7) {
      return 4;
    } else {
      return 7;
    }
  } else if (col < 7) {
    if (row < 4) {
      return 2;
    } else if (row < 7) {
      return 5;
    } else {
      return 8;
    }
  } else {
    if (row < 4) {
      return 3;
    } else if (row < 7) {
      return 6;
    } else {
      return 9;
    }
  }
}
function getContent(cell) {
  return cell.querySelector('.cell-content').value;
}
function getAdjacents(cell) {
  let values = [];
  let row = cell.className.match(/row-[0-9]/)[0];
  let col = cell.className.match(/col-[0-9]/)[0];
  let block = cell.className.match(/block-[0-9]/)[0];
  let rowSelector = `.${row}:not(.${col})`;
  let colSelector = `.${col}:not(.${row})`;
  let blockSelector = `.${block}:not(.${row}):not(.${col})`;
  let adjacentCells = document.querySelectorAll(`${rowSelector}, ${colSelector}, ${blockSelector}`);
  for (let acell of adjacentCells) {
    values.push(getContent(acell));
  }
  return values;
}
function update() {
  let cells = document.querySelectorAll('.cell');
  for (let cell of cells) {
    let value = getContent(cell);
    let adjacents = getAdjacents(cell);
    if (value) {
      for (let num = 1; num < 10; num++) {
        cell.classList.remove(`note-${num}`);
      }
      if (adjacents.indexOf(value) < 0) {
        cell.classList.add('cell-success');
        cell.classList.remove('cell-error');
      } else {
        cell.classList.add('cell-error');
        cell.classList.remove('cell-success');
      }
    } else {
      for (let num = 1; num < 10; num++) {
        let numClass = `note-${num}`;
        if (adjacents.indexOf(`${num}`) < 0) {
          cell.classList.add(numClass);
        } else {
          cell.classList.remove(numClass);
        }
      }
    }
    // one choice rule
    // hidden single (row, column, block)
    // naked pair (row, column, block)
    // pointing pair (triple)
    // claiming pair (triple)
    // naked triple
    // x-wing
    // hidden pair
    // naked quad
  }
}
function createBlankCells() {
  let container = document.querySelector('.sudoku');
  for (let row = 1; row < 10; row++) {
    for (let col = 1; col < 10; col++) {
      container.appendChild(createCell(row, col));
    }
  }
}
function createCell(row, col) {
  let cell = document.createElement('div');
  let block = getBlock(row, col);
  cell.className = `cell row-${row} col-${col} block-${block}`;

  let options = document.createElement('div');
  options.className = 'cell-options';
  for (let i = 1; i < 10; i++) {
    let option = document.createElement('div');
    option.className = `option option-${i}`;
    option.innerHTML = i;
    options.appendChild(option);
  }
  cell.appendChild(options);

  let content = document.createElement('input');
  content.className = 'cell-content';
  content.setAttribute('type', 'number');
  content.setAttribute('min', '1');
  content.setAttribute('max', '9');
  content.addEventListener('change', update);
  cell.appendChild(content);

  return cell;
}