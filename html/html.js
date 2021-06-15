'use strict'

// POPUPS SHOW/HIDE

function switchPopUp(type, node) {
  switch (type) {
    case 'show':
      node.style.display = 'flex'
      break
    case 'hide':
      node.style.display = 'none'
      break
  }
}