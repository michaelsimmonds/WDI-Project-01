document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 20
  let div
  let prevIndex
  let playerIndex
  let numOfAliens = 20

  // CREATES A DIV
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  // HanDLES KEYS
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
        console.log(div[playerLaser+width])
        div[playerLaser+width].classList.remove('laser')
        div[playerLaser].classList.remove('laser')
      } else {
        div[playerLaser].classList.add('laser')
        div[playerLaser+width].classList.remove('laser')
      }           // GLITCHES IF YOU SHOOT INTO TOP RIGHT CORNER FOR A SECOND
    }, 100)
  }


  //have multiple rows of aliens that move as a block
  //if an alien gets hit by a laser, it removes the alien class

  // let alienRows = 3
  // let aliensInRow = 6
  // let totalAliens = alienRows * aliensInRow

  // function createAliens() {
  //   let startIndex = 24
  //   for ( let i = 0; i < totalAliens; i++) {
  //     div[startIndex + i*2].classList.add('alien')
  //
  //   }
  // }


  //collision


  //init
  function init() {
    for (let i = 0; i < width * width; i++) {
      addDivs()
    }
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
    createAliens()
  }

  init()
  console.log(playerIndex)


})
