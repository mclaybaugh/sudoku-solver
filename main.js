document.addEventListener('DOMContentLoaded', () => {
  createBlankCells();
});
function update() {
  console.log('hello');
}
function createBlankCells() {
  var container = document.querySelector('.sudoku');
  for (var row = 1; row < 10; row++) {
    for (var col = 1; col < 10; col++) {
      var cell = document.createElement('input');
      cell.setAttribute('type', 'number');
      //cell.setAttribute('max', '9');
      cell.setAttribute('min', '1');
      cell.className = `cell ${row} ${col}`;
      cell.addEventListener('change', update);
      container.appendChild(cell);
    }
  }
}