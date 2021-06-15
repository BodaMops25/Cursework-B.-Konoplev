'use strict'

let firstSettings = null, numberSectors = null, sectors = null, huts = null

// FILE INPUTS

const inputFile = getNode('#inputFile')

function onInputFile() {
  const files = inputFile.files,
        reader = new FileReader()

  reader.readAsText(files[0])

  reader.addEventListener('load', () => {
    firstSettings = reader.result.split(' ')  //THIS EVENT FILLS SOME TIME!!! AND NEXT CODE NEED CONTINUE VIE SOME TIME (10MS FIT)
    
    firstSettings = reader.result.split('\n')[0]
    numberSectors = reader.result.split('\n')[1]
    
    firstSettings = firstSettings.split(' ')
    
    numberSectors === undefined ? numberSectors = '' : numberSectors = numberSectors.split(' ')
    
    getNode('#inputTextArea').value = reader.result
  })
}

// TEXTAREA INPUTS

function inputedData(thisNode) {
  firstSettings = thisNode.value.split('\n')[0]
  numberSectors = thisNode.value.split('\n')[1]
  
  firstSettings = firstSettings.split(' ')
  
  numberSectors === undefined ? numberSectors = '' : numberSectors = numberSectors.split(' ')
}

// TREATMENT INPUTS VALUES, CHECK FOR TRUE
  
function calcInputData() {
  
  let fatalError = false
  
  // REFRESHING
  
  getNode('.inputOutStrContainer') === null ? {} : getNode('.inputOutStrContainer').remove()
  getNode('.programNodesContainer') === null ? {} : getNode('.programNodesContainer').remove()
  
  // CREATING LOG CONTAINER
    
  const inputOutStrContainer = createNode('div', '', 'inputOutStrContainer')
  document.body.appendChild(inputOutStrContainer)
  
  sectors = +firstSettings[0]
  huts = +firstSettings[1]
  
  // CHECKS
  
  if(firstSettings.length < 2) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість аргументів менша двох!', 'errorMessage'))
    fatalError = true
  }
  
  else if(firstSettings.length > 2 && fatalError == false) {
    inputOutStrContainer.appendChild(createNode('p', 'Кількість аргументів більше двох! Оброблені будут перші 2 аргументи', 'errorMessage'))
  }
  
  if(isNaN(sectors) && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: значення секторів не є числовим', 'errorMessage'))
    fatalError = true
  }
  
  if(isNaN(huts) && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: значення хижин не є числовим', 'errorMessage'))
    fatalError = true
  }
  
  if(sectors > 500000 && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість секторів більша 500000!', 'errorMessage'))
    fatalError = true
  }
  
  else if(sectors < 2 && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість секторів менша 2!', 'errorMessage'))
    fatalError = true
  }
  
  if(huts > sectors && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість хижин більша за кількість секторів!', 'errorMessage'))
    fatalError = true
  }
  
  else if(huts < 2 && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість хижин менша 2!', 'errorMessage'))
    fatalError = true
  }
  
  if((numberSectors === undefined || numberSectors == '') && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Не вказані номера секторів, в яких розміщено хижини!', 'errorMessage'))
    fatalError = true
  }
  
  if(numberSectors.length != huts && fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', `ФАТАЛЬНА ПОМИЛКА: Кількість номерів секторів в яких знаходяться хижини, в яких розміщено хижини не зпівпадає з кількістю хижин(${huts} не дорівнює ${numberSectors.length})!`, 'errorMessage'))
    fatalError = true
  }
  
  for(let i = 0; i < numberSectors.length; i++) {
    
    if(isNaN(numberSectors[i]) && fatalError === false) {
      inputOutStrContainer.appendChild(createNode('p', `ФАТАЛЬНА ПОМИЛКА: ${i + 1}-й номер сектора не числового значення!`, 'errorMessage'))
      fatalError = true
    }
    
    else if(numberSectors[i] > sectors && fatalError === false) {
      inputOutStrContainer.appendChild(createNode('p', `ФАТАЛЬНА ПОМИЛКА: ${i + 1}-й номер сектора більший за кількість секторів(${sectors})!`, 'errorMessage'))
      fatalError = true
    }
    
    else if(numberSectors[i] < 1 && fatalError === false) {
      inputOutStrContainer.appendChild(createNode('p', `ФАТАЛЬНА ПОМИЛКА: ${i + 1}-й номер сектора менший за 1!`, 'errorMessage'))
      fatalError = true
    }
    
    else if(+numberSectors[i] <= numberSectors[i - 1] && fatalError === false) {
      inputOutStrContainer.appendChild(createNode('p', `ФАТАЛЬНА ПОМИЛКА: ${i + 1}-й номер сектора менший або дорівнює попередньому номеру сектора(${numberSectors[i - 1]})!`, 'errorMessage'))
      fatalError = true
    }
  }
  
  if(fatalError === false) {
    inputOutStrContainer.appendChild(createNode('p', `Кількість секторів: ${sectors}, кількість хиж: ${huts}`))
    inputOutStrContainer.appendChild(createNode('p', `Номера секторів в яких знаходяться хижі: ${numberSectors}`))
    inputOutStrContainer.appendChild(createNode('button', 'Запустити програму', 'runButton'))
    getNode('.runButton').onclick = runProgram
  }
}