document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')

  let prevIndex
  let nextIndex
  let direction
  let div
  let playerIndex

  // CREATES A DIV
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  // HNADLES KEYS
  document.onkeydown = function(e) {
    prevIndex = playerIndex
    if (e.keyCode === 37 && playerIndex > 361) {
      playerIndex--
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 39 && playerIndex < 380) {
      playerIndex++
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 32) {
    }
  }

  function movePlayer(playerIndex, prevIndex){
    div[playerIndex].classList.add('player')
    div[prevIndex].classList.remove('player')
  }





  //init
  function init() {
    for (let i = 0; i < 400; i++) {
      addDivs()
    }
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (30)
    div[playerIndex].classList.add('player')
  }

  init()
  console.log(playerIndex)


})
