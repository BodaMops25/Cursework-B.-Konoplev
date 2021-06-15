'use strict'

// CORE FUNCTIONS

function getNode(node) {
  return document.querySelector(node)
}

function getNodes(node) {
  return document.querySelectorAll(node)
}

function createNode(node, innerHTML = '', cls = '') {
	const tempNode = document.createElement(node)

	cls != 0 ? tempNode.classList.add(cls) : {}
	innerHTML != 0 ? tempNode.innerHTML = innerHTML : {}

	return tempNode
}