'use strict'

// STATISTIC PROGRAM

function runStatistic() { // створення таблиці й додавання її в хтмл документ
   getNode('.statisticTable') !== null ? getNode('.statisticTable').remove() : {}
   
   const table = createNode('table', `
   <caption>Керування<div class="button" onclick="switchPopUp('show', getNode('#statisticControls'))">?</div></caption>
   <tr onclick="sortFunc(event)">
      <th data-statistic-Num="0">№</th>
      <th data-statistic-Num="1">Початковий сектор</th>
      <th data-statistic-Num="2">Кінцевий сектор</th>
      <th data-statistic-Num="3">Час за годинниковою стрілкою (хв.)<div class="button" onclick="switchPopUp('show', getNode('#clockwiseFuncInfo'))">?</div></th>
      <th data-statistic-Num="4">Час проти годинникової стрілки (хв.)<div class="button" onclick="switchPopUp('show', getNode('#anticlockwiseFuncInfo'))">?</div></th>
   </tr>
   `, 'statisticTable')
   
   getNode('.programNodesContainer').appendChild(table)
   
   for(let i = 0; i < statisticArr.length; i++) {
      table.appendChild(createNode('tr', `<td>${statisticArr[i][0]}</td><td>${statisticArr[i][1]}</td><td>${statisticArr[i][2]}</td><td>${statisticArr[i][3]}</td><td>${statisticArr[i][4]}</td>`, '', ['onmouseover', 'highlightFunc(this)'], ['onmouseout', 'outHighlightFunc(this)']))
   }
}

// SORTING

function sortFunc(e) { // функція сортування даних таблиці, e - об'єкт натискання ЛКМ
   
   let error = false
   
   for(let i = 0; i < getNodes('th .button').length; i++) {
      if(e.target === getNodes('th .button')[i]) error = true
   }

   if(error == false) {
            
      let statNum = e.target.dataset.statisticNum
      
      if(e.shiftKey) {
         sortingStatistic(statisticArr, '<', statNum)
      }
      else {
         sortingStatistic(statisticArr, '>', statNum)
      }
   }
   
   runStatistic()
}

// CANVAS SECTORS AND TABLE ROW HIGHLIGHTS

function highlightFunc(node) { // виділення рядка таблиці й секторів
   node.style.backgroundColor = '#f2f2f2'
   
   highlightSector(+node.childNodes[1].innerText)
   highlightSector(+node.childNodes[2].innerText)
   
   console.log(2)
}

function outHighlightFunc(node) { // зняття виділення рядка таблиці й секторів
   node.style.backgroundColor = '#ffffff'
   
   runCanvas()
}

