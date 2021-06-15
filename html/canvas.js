'use strict'

function runCanvas() {  
  
  // CREATING CANVAS AND CONFIGURING IT
    
  getNode('.programNodesContainer').appendChild(createNode('canvas'))
  
  const cnvs = getNode('canvas'),
        cnvsWdth = window.innerWidth * 0.4,
        cnvsSizeScale = 1,
        cnvsScaledWdth = cnvsWdth * cnvsSizeScale,
        ctx = cnvs.getContext('2d')
  
  cnvs.width = cnvsScaledWdth
  cnvs.height = cnvsScaledWdth
  
  cnvs.style.width = cnvsWdth + 'px'
  cnvs.style.height = cnvsWdth + 'px'
  cnvs.style.border = '1px solid #000'
  
  // DRAWING ON CANVAS
  
  ctx.fillRect(0, 0, cnvsScaledWdth /2, cnvsScaledWdth)
}