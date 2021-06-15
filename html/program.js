'use strict'

function sortingStatistic(arr = statisticArr, type = '>', arrArg = 0) {
   arr.sort((a, b) => {
      if(type === '>') return b[arrArg] - a[arrArg]
      if(type === '<') return a[arrArg] - b[arrArg]
   })
}

let statisticArr = []

function runProgram() {   
   
   statisticArr = []
   
   getNode('.programNodesContainer') === null ? {} : getNode('.programNodesContainer').remove()
   
   document.body.appendChild(createNode('div', '', 'programNodesContainer'))
   
   let itr = 1
   
   for(let i = 0; i < numberSectors.length; i++) {
      for(let j = i + 1; j < numberSectors.length; j++) {

         statisticArr[itr - 1] = [itr++, numberSectors[i], numberSectors[j], numberSectors[j] - numberSectors[i], sectors - numberSectors[j] + +numberSectors[i]]       
      }
   }
   
   runCanvas()
   runStatistic()
}