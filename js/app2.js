document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  let div
  let prevIndex
  let playerIndex
  const playerLaserArray = []
  const alienArray =  []
  const aliensInRow = 6

  // CREATES A DIV. CALLED IN INIT FUNCTION
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  // HANDLES KEYS
  document.onkeydown = function(e) {
    prevIndex = playerIndex
    if (e.keyCode === 37 && playerIndex > div.length - width*2) {
      playerIndex--
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 39 && playerIndex < (div.length-width)-1) {
      playerIndex++
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 32) {
      shootPlayerLaser()
    }
  }

  // Handles movement of player. Is called in function to handle keys
  function movePlayer(playerIndex, prevIndex){
    div[playerIndex].classList.add('player')
    div[prevIndex].classList.remove('player')
  }

  // Handles movement of player laser. Is called in function to handle keys
  function shootPlayerLaser() {
    let playerLaser = playerIndex
    setInterval(function() {
      playerLaser -= 20
      if (playerLaser < 0) {
        div[playerLaser+width].classList.remove('laser')
        div[playerLaser].classList.remove('laser')          //this works but I dont know why- error showing
      } else {
        playerLaserArray.push(playerLaser)
        console.log(playerLaserArray)
        div[playerLaser].classList.add('laser')
        div[playerLaser+width].classList.remove('laser')
      }           // GLITCHES IF YOU SHOOT INTO TOP RIGHT CORNER FOR A SECOND
    }, 100)
  }

  //Creates alien rows-refactor them at some point
  function createRowOne() {
    let startIndex = 22
    for ( let i = 0; i < aliensInRow; i++) {
      div[startIndex].classList.add('alien')
      alienArray.push(startIndex)
      startIndex += 2
    }
  }
  function createRowTwo() {
    let startIndex = 43
    for ( let i = 0; i < aliensInRow; i++) {
      div[startIndex].classList.add('alien')
      alienArray.push(startIndex)
      startIndex += 2
    }
  }
  function createRowThree() {
    let startIndex = 62
    for ( let i = 0; i < aliensInRow; i++) {
      div[startIndex].classList.add('alien')
      alienArray.push(startIndex)
      startIndex += 2
    }
  }
  function createRowFour() {
    let startIndex = 83
    for ( let i = 0; i < aliensInRow; i++) {
      div[startIndex].classList.add('alien')
      alienArray.push(startIndex)
      startIndex += 2
    }
  }

  //collision









  //init
  function init() {
    for (let i = 0; i < width * width; i++) {
      addDivs()
    }
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
    // createAliens()
    createRowOne()
    createRowTwo()
    createRowThree()
    createRowFour()
  }

  init()
  console.log(playerIndex)


})
