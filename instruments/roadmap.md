/*
PROBLEM

** Need to be able to add a row and have the rows below shift down 1

HTML mutated by Javascript during scroll or resize should not save

Working on an item in isolation would be nice

Duplicating an element using alt+arrow scrolls the page up/down

Grid column widths can only be equal
- allow different types of grid widths (equal, contents, templates)

Can't see or click on a container with no padding
- show something indicating that there is a parent and give it a keyboard shortcut

Can’t click an element that is behind another element
- pick which hovered element you want to click

Deleting sometimes removes wrong element from elements list but not dom (gone from tab/editable list)
- reproduce and isolate

hitting X does not remove unset prop
- rather than setting to initial, delete the element prop

delete is not undoable
- store deleted element in memory
- store deleted element dom location
- store every keystroke for replay
- store the whole dom state
- insert element at previous location

some enums are visible that are not possible (inline inside a grid or flex container)

an object can get so small that it is impossible to see or click
- add an arrow pointing at things below 4px width or height

MISSING
see/set class names
linear/radial gradient

PAIN
- fluid scaling between screen sizes
hard to tell what is selected

SAVED
remove pseudo elements
remove state classes
remove analytics

WISHES
infinite undo
hover state
visual feedback when a limit is reached
resistance when the beginning or end of a list is reached (before looping)
select multiple elements intelligently
cut/copy/paste element
cut/copy/paste style
instance vs class editing
3 letter props ptb
suggest correct prop example: pw > padding? width? px?
input field/text area/select (this might fall under too complex)
*/