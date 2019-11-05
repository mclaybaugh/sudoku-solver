document.addEventListener('DOMContentLoaded', () => {
  createBlankCells();
  let fillPuzzleBtn = document.getElementById('fillPuzzleBtn');
  if (fillPuzzleBtn) {
    fillPuzzleBtn.addEventListener('click', fillPuzzle);
  }
  let addOptionsBtn = document.getElementById('addOptionsBtn');
  if (addOptionsBtn) {
    addOptionsBtn.addEventListener('click', () => {update(true);});
  }
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
function update(addOptions = false) {
  let cells = document.querySelectorAll('.cell');
  for (let cell of cells) {
    let value = getContent(cell);
    let adjacents = getAdjacents(cell);
    if (value) {
      for (let num = 1; num < 10; num++) {
        cell.classList.remove(`note-${num}`);
      }
      if (adjacents.indexOf(value) < 0) {
        cell.classList.remove('cell-error');
      } else {
        cell.classList.add('cell-error');
      }
    } else {
      let numVals = 0;
      for (let num = 1; num < 10; num++) {
        let numClass = `note-${num}`;
        if (adjacents.indexOf(`${num}`) < 0) {
          if (addOptions) cell.classList.add(numClass);
          numVals++;
        } else {
          cell.classList.remove(numClass);
        }
      }
      cell.classList.remove('nakedSingle');
      cell.classList.remove('nakedPair');
      // naked single
      if (numVals == 1) {
        cell.classList.add('nakedSingle');
      }
    }
  }
  let groups = [];
  for (let i = 1; i < 10; i++) {
    groups.push(getOptionsArray(document.querySelectorAll(`.row-${i}`)));
    groups.push(getOptionsArray(document.querySelectorAll(`.col-${i}`)));
    groups.push(getOptionsArray(document.querySelectorAll(`.block-${i}`)));
  }
  for (let group of groups) {
    for (let i = 0; i < group.length; i++) {
      let x = document.querySelector(`.${group[i]['row']}.${group[i]['col']}`);
      if (x.classList.contains('nakedPair')) continue;
      if (group[i]['nums'].length == 2) {
        for (let j = 0; j < group.length; j++) {
          if (i == j) continue;
          if (group[j]['nums'].length == 2) {
            if (group[i]['nums'][0] == group[j]['nums'][0]
            && group[i]['nums'][1] == group[j]['nums'][1]) {
              let y = document.querySelector(`.${group[j]['row']}.${group[j]['col']}`);
              if (x && y) {
                x.classList.add('nakedPair');
                y.classList.add('nakedPair');
              }
            }
          }
        }
      }
    }
  }
  // hidden single (row, column, block)
  // pointing pair (triple)
}
function createBlankCells() {
  let container = document.querySelector('.sudoku');
  if (!container) return;
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
  content.setAttribute('type', 'text');
  content.addEventListener('change', update);
  cell.appendChild(content);

  return cell;
}
function fillPuzzle() {
  let textArea = document.getElementById('puzzle');
  if (!textArea) return;
  let raw = textArea.value;
  let lines = raw.split('\n');
  let fields, row, col, x, cell;
  for (let line of lines) {
    fields = line.split(',');
    row = fields[0];
    col = fields[1];
    x = fields[2];
    cell = document.querySelector(`.row-${row}.col-${col} .cell-content`);
    if (!cell) continue;
    cell.value = x;
  }
  update();
}
function getOptionsArray(els) {
  let options = [];
  let regex = /note-([0-9])/g;
  for (let i = 0; i < 9; i++) {
    let nums = [], match;
    while ((match = regex.exec(els[i].className)) !== null) {
      nums.push(parseInt(match[1]));
    }
    options[i] = [];
    options[i]['row'] = els[i].className.match(/row-[0-9]/)[0];
    options[i]['col'] = els[i].className.match(/col-[0-9]/)[0];
    options[i]['nums'] = nums;
  }
  return options;
}