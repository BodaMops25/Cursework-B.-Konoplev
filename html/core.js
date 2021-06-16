'use strict'

// CORE FUNCTIONS

function getNode(node) {
  return document.querySelector(node)
}

function getNodes(node) {
  return document.querySelectorAll(node)
}

function createNode(node, innerHTML = '', cls = '', ...attributes) {
	const tempNode = document.createElement(node)

	cls != 0 ? tempNode.classList.add(cls) : {}
	innerHTML != 0 ? tempNode.innerHTML = innerHTML : {}
   
   for(let atribute in attributes) {
      const attrb = attributes[atribute]
      
      tempNode.setAttribute(attrb[0], attrb[1])
   }

	return tempNode
}