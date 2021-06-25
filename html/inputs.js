'use strict'

//firstSettings - перший рядок вхідних даних, numberSectors - другий рядок вхідних даних, sectors - кількість секторів, huts - кілкість хиж

let firstSettings = null, numberSectors = null, sectors = null, huts = null

// FILE INPUTS

const inputFile = getNode('#inputFile') // присвоєння змінній тега

function onInputFile() { // функція зчитування даних з фалу
  const files = inputFile.files, // files масив файлів які були предані в інпут типу файл
        reader = new FileReader() // запуск події зчитування даних з файла, це займе якийсь час

  reader.readAsText(files[0]) // зчитування даних з файлу як текст

  reader.addEventListener('load', () => { // запуск кода, коли зчитування даних з файлу завершиться
    firstSettings = reader.result.split(' ')  //THIS EVENT FILLS SOME TIME!!! AND NEXT CODE NEED CONTINUE VIE SOME TIME (10MS FIT)
    
    firstSettings = reader.result.split('\n')[0] // розділення рядка reader.result на окремі елементи там де стоїть символ \n
    numberSectors = reader.result.split('\n')[1]
    
    firstSettings = firstSettings.split(' ') // розділення елементів масиву по символу ' '
    
    numberSectors === undefined ? numberSectors = '' : numberSectors = numberSectors.split(' ') // якщо змінна numberSectors не дорівнює undefined, то вона буде оброблена
    
    getNode('#inputTextArea').value = reader.result // значення текстового поля для введеня даних стає рівне введеним даним з файлу
  })
}

// TEXTAREA INPUTS

function inputedData(thisNode) { // запис даних з текстового поля
  firstSettings = thisNode.value.split('\n')[0]
  numberSectors = thisNode.value.split('\n')[1]
  
  firstSettings = firstSettings.split(' ')
  
  numberSectors === undefined ? numberSectors = '' : numberSectors = numberSectors.split(' ')
}

// TREATMENT INPUTS VALUES, CHECK FOR TRUE
  
function calcInputData() { // перевірка що введені дані коектні
  
  let fatalError = false // зміна для фатальних помилок
  
  // REFRESHING

  getNode('.inputOutStrContainer') === null ? {} : getNode('.inputOutStrContainer').remove() // якщо тег з класом inputOutStrContainer існує то він видаляється з хтмл документу
  getNode('.programNodesContainer') === null ? {} : getNode('.programNodesContainer').remove()
  
  // CREATING LOG CONTAINER
    
  const inputOutStrContainer = createNode('div', '', 'inputOutStrContainer') // тег в який буде виводитись інформація про введені дані
  document.body.appendChild(inputOutStrContainer) //створення тегу в документі
  
  sectors = +firstSettings[0] // присвоєння числового значення змінній, "+"
  huts = +firstSettings[1]
  
  // CHECKS
  
  if(firstSettings.length < 2) { // якщо кількість аргументів першого рядка(кількість елементів в масиві firstSettings) менше 2 то зпрацює умова
    inputOutStrContainer.appendChild(createNode('p', 'ФАТАЛЬНА ПОМИЛКА: Кількість аргументів менша двох!', 'errorMessage')) //створення й додавання тегу з повідомленням помилки а контейнер для інформіції про вхідні дані
    fatalError = true // присвоєння значення
  }
  
  else if(firstSettings.length > 2 && fatalError == false) {
    inputOutStrContainer.appendChild(createNode('p', 'Кількість аргументів більше двох! Оброблені будут перші 2 аргументи', 'errorMessage'))
  }
  
  if(isNaN(sectors) && fatalError === false) { // перевірка чи sectors не число
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
    getNode('.runButton').onclick = runProgram // присвоєння функції при натисканні ЛКМ на тег кнопки
  }
}