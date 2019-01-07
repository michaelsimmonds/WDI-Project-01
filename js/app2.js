document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  let div
  let prevIndex
  let playerIndex
  const playerLaserArray = []
  const alienArray =  []
  const aliensInRow = 6
  let score = 0
  let direction = 'right'
  let changeDirection = false

  // Creates divs that make up the grid. Called in init function.
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  // Handles the keys
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
    const interval = setInterval(laserInterval, 100)
    function laserInterval() {
      playerLaser -= width
      if (playerLaser < 0) {
        div[playerLaser+width].classList.remove('laser')
        clearInterval(interval)
      } else {
        playerLaserArray.push(playerLaser)
        if (playerLaserArray.length > 1) {
          playerLaserArray.splice(playerLaser.length-1, 1)  //removes the previous position of laser in playerLaserArray
        }
        div[playerLaser].classList.add('laser')
        div[playerLaser+width].classList.remove('laser')
        console.log(playerLaserArray)
        checkCollision()

      }           // GLITCHES IF YOU SHOOT INTO TOP RIGHT CORNER
    }
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

  // starts the aliens moving and should be refered back to to change direction
  function gameLoop() {
    setInterval(function() {
      if(changeDirection){               //starts as false so these if options are skipped
        moveAlien('down')
        if(direction ==='left'){
          direction ='right'
        }else{
          direction ='left'
        }
        changeDirection = false
      }else{
        moveAlien(direction)        //this starts the directions. it is set to 'right' at the top intiially
        // checkAlien()                //this check alien boundaries and see whether to change direction
      }
    }, 1000)
  }

  function moveAlien(direction) {
    for (let i=0; i < alienArray.length; i++) {
      if (direction === 'left') {
        alienArray[i] -= 1
      } else if (direction === 'right') {
        alienArray[i] += 1
      } else {                        //don't put set direction to down here
        alienArray[i] += width
      }
    }
    showAlienMove()
  }

  function showAlienMove() {
    for (let i=0; i < div.length; i++) {
      if(div[i].className === 'alien') {
        div[i].classList.remove('alien')          //if any div has class alien, remove it
      }
    }
    for (let i=0; i < alienArray.length; i++) {
      div[alienArray[i]].classList.add('alien')   //the div the alien is moving to, add the class alien
    }
  }

  //collision. THIS WORKS BUT THINK IT COUNTS THE HITS THREE TIMES TOO MANY TIMES
  function checkCollision() {
    for (let i = 0; i < alienArray.length; i++) {
      for (let j = 0; j < playerLaserArray.length; j++) {
        if (alienArray[i] === playerLaserArray[j]) {
          console.log('hit')
          score += 10
          console.log(playerLaserArray[j])
          console.log(alienArray[i])
          div[alienArray[i]].classList.remove('alien')
          div[playerLaserArray[j]].classList.remove('laser')
          alienArray.splice(i, 1)
          playerLaserArray.splice(i, 1)
        }
      }
    }
  }

  //init
  function init() {
    for (let i = 0; i < width * width; i++) {
      addDivs()
    }
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
    createRowOne()
    createRowTwo()
    createRowThree()
    createRowFour()
    gameLoop()
  }

  init()
  console.log(alienArray)
  console.log(playerLaserArray)

})
