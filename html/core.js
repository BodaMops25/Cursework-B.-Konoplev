'use strict' // запуск скрипта в строгому режимі

// CORE FUNCTIONS

function getNode(node) { // функція яка повертає тег за назвою, node - назва тегу
  return document.querySelector(node) // повертає хтмл тег за назвою
}

function getNodes(node) { // функція яка повертає масив тегів за назвою
  return document.querySelectorAll(node)
}

function createNode(node, innerHTML = '', cls = '', ...attributes) { // створення хтмл тега, node - вид тегу, innerHTML - внутрішній контент тегу, cls - назва класу тегу, ...attributes - масив інших атрибутів тега 
	const tempNode = document.createElement(node) // створення тимчасової константи в якій зберігається хтмл тег

	cls != 0 ? tempNode.classList.add(cls) : {} // якщо cls не пуста то тимчасовому тегу додається клас з таким ім'ям
	innerHTML != 0 ? tempNode.innerHTML = innerHTML : {} // аналогічно як з cls тільки внутрішнім контентом тега
   
   for(let atribute in attributes) { // цикл присвоєння інших атрибутів тегу з масива ...attributes
      const attrb = attributes[atribute]
      
      tempNode.setAttribute(attrb[0], attrb[1]) 
   }

	return tempNode // повернення тега
}