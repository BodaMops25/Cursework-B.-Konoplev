'use strict'

function degToRad(deg) { // перетворення градусів - 90 градусів в радіани, deg - градуси
   return (deg - 90) * Math.PI / 180
}

function lineToAngle(argX, argY, angle, distance) { // повертає перміщенні координати на деяку відстань на деякий кут
   argX = Math.cos(degToRad(angle)) * distance + argX
   argY = Math.sin(degToRad(angle)) * distance + argY
   
   return [argX, argY]
}

function runCanvas() {  // створення полотна з графікою
   
   // CREATING CANVAS AND CONFIGURING IT
   
   getNode('canvas') === null ? {} : getNode('canvas').remove()
   getNode('.programNodesContainer').prepend(createNode('canvas'))
   
   const cnvs = getNode('canvas'), // полотно
   cnvsWdth = window.innerWidth * 0.4, // задання зміній значення ширини сторінки * 0.4
   cnvsSizeScale = 1,
   cnvsScaledWdth = cnvsWdth * cnvsSizeScale,
   ctx = cnvs.getContext('2d')
   
   // присвоєння значень полотну
   
   cnvs.width = cnvsScaledWdth
   cnvs.height = cnvsScaledWdth
   
   cnvs.style.width = cnvsWdth + 'px'
   cnvs.style.height = cnvsWdth + 'px'
   cnvs.style.border = '1px solid #000'
   
   // DRAWING ON CANVAS
   
   ctx.fillStyle = '#2590ff'
   ctx.fillRect(0, 0, cnvsScaledWdth, cnvsScaledWdth) // малювання прямокутника на все полотно
   
   // CREATING DUBLICATE SECTORS AND PROTECT CANVAS FROM SECTORS OVER 2000
   
   let sectorsDub = sectors
   
   if(sectors >= 2000) sectorsDub = 2000
   
   const x = cnvsScaledWdth / 2, 
         y = cnvsScaledWdth / 2,
         degStep = 360 / sectorsDub
                  
   let currentDeg = 0
   
   // DRAWING SECTORS
   
   ctx.moveTo(x, y) // переміститися в певні координати
   
   for(let i = 0; i < sectorsDub; i++) {
      ctx.arc(x, y, cnvsScaledWdth / 2.25, degToRad(currentDeg), degToRad(currentDeg + degStep)) // малювати коло
      ctx.lineTo(x,y) // малювати лінію
      
      currentDeg += degStep
   }
   
   ctx.fillStyle = '#19bd3d' // колір зафарбовування
   ctx.fill() // зафарбувати фігуру
   ctx.stroke() // зафарбувати контур
   
   // DRAWING NUMBERS SECTORS
   
   let fontSize = cnvsScaledWdth / 15
   
   ctx.font = `${fontSize}px arial`
   ctx.fillStyle = '#000000'
   currentDeg = 0
   
   for(let i = 0; i < sectorsDub; i++) {
      const tXY = lineToAngle(x, y, currentDeg + degStep / 2, cnvsScaledWdth / 2.75)
      
      ctx.fillText(i + 1, tXY[0] - fontSize / 2, tXY[1] + fontSize / 2)
      
      currentDeg += degStep
   }
   
   // DRAWING HUTS
   
   ctx.beginPath()
   
   ctx.fillStyle = '#bda81b'
   currentDeg = 0
   
   let numSectorsI = 0
   
   for(let i = 0; i < sectorsDub; i++) {
      const tXY = lineToAngle(x, y, currentDeg + degStep / 2, cnvsScaledWdth / 4)
      
      if(i + 1 === +numberSectors[numSectorsI]) {
         ctx.arc(tXY[0], tXY[1], cnvsScaledWdth / 30, 0, Math.PI * 2)
         ctx.fill()
         ctx.stroke()
         ctx.beginPath() // створення нового шляху(нової фігури)
         
         numSectorsI++
      }
      
      currentDeg += degStep
   }
}

function highlightSector(sectorNum) { // підсвічення секторів
   
   const cnvs = getNode('canvas'),
         cnvsWdth = window.innerWidth * 0.4,
         cnvsSizeScale = 1,
         cnvsScaledWdth = cnvsWdth * cnvsSizeScale,
         ctx = cnvs.getContext('2d')
      
   // CREATING DUBLICATE SECTORS AND PROTECT CANVAS FROM SECTORS OVER 2000
   
   let sectorsDub = sectors
   
   if(sectors >= 2000) sectorsDub = 2000
   
   const x = cnvsScaledWdth / 2, 
         y = cnvsScaledWdth / 2,
         degStep = 360 / sectorsDub
                  
   let currentDeg = (sectorNum - 1) * degStep
   
   ctx.moveTo(x, y)
   ctx.arc(x, y, cnvsScaledWdth / 2.25, degToRad(currentDeg), degToRad(currentDeg + degStep))
   ctx.lineTo(x,y)
   
   // ctx.fillStyle = '#12962f'
   ctx.lineWidth = 5
   
   // ctx.fill()
   ctx.stroke()
}