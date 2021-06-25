'use strict'

// POPUPS SHOW/HIDE

function switchPopUp(type, node) { // відкривання, приховування тегів в документі, type - що зробити, node - тег з яким поводитиметься операція
  switch (type) { // конструкція свіч
    case 'show': // якщо type дорівнює show
      node.style.display = 'flex' // відкривання тегу
      break
    case 'hide':
      node.style.display = 'none' // приховування
      break
  }
}