# Sudoku Solver

Achieve enlightenment.

# TODO

Separate actions done on sudoku grid into separate functions that can
be called upon with buttons, and possibly add workflow as in following
steps.

1. set possible options in empty cells
2. set naked and hidden singles as content -> if yes do 1 else 3
3. remove naked and hidden pairs from other group cells -> if yes do 2  else 4
4. remove naked and hidden triples from other group cells -> if yes do 2 else 1
