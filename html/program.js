'use strict'

function sortingStatistic(arr = statisticArr, type = '>', arrArg = 0) { // сортування матриці, arr - змінна матриці, type - тип сортування, arrArg - номер колонки за якою сортується матриця
   arr.sort((a, b) => { // функція критеріїв сортування
      if(type === '>') return b[arrArg] - a[arrArg]
      if(type === '<') return a[arrArg] - b[arrArg]
   })
}

let statisticArr = [] // змінна матриці в якій будуть всі оброблені дані

function runProgram() {   // обробка даних й вивод їх в матрицю
   
   statisticArr = [] // робить матрицю пустою
   
   getNode('.programNodesContainer') === null ? document.body.appendChild(createNode('div', '', 'programNodesContainer')) : getNode('.programNodesContainer').remove()
   
   let itr = 1 // номер відстані між секторами
   
   for(let i = 0; i < numberSectors.length; i++) {
      for(let j = i + 1; j < numberSectors.length; j++) {

         statisticArr[itr - 1] = [itr++, numberSectors[i], numberSectors[j], numberSectors[j] - numberSectors[i], sectors - numberSectors[j] + +numberSectors[i]]   // присвоєння масиву значень матриці значень    
      }
   }
   
   runCanvas() // визов функції
   runStatistic()
}