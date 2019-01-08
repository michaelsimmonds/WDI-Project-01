document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  let div
  let prevIndex
  let playerIndex
  const playerLaserArray = []
  const alienArray =  []
  const aliensInRow = 7
  let score = 0
  let direction = 'right'
  let gameId
  let changeDirection = false
  let playerLives = 3
  const alienBombArray = []

  // *************************** PLAYER MOVEMENT AND ACTION *********************************

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
      shootPlayerLaser(playerIndex)
    }
  }

  // Handles movement of player. Is called in function to handle keys
  function movePlayer(playerIndex, prevIndex){
    div[playerIndex].classList.add('player')
    div[prevIndex].classList.remove('player')
  }


  // *************************** PLAYER LASER *********************************

  // Handles movement of player laser. Is called in function to handle keys
  function shootPlayerLaser(startPoint) {               //startpoint is retrieved from player pos when spacebar pressed
    setTimeout(() => laserInterval(startPoint), 100)
  }

  // Player shoots a laser
  function laserInterval(playerLaser) {
    playerLaser -= width
    if (playerLaser < 0) {
      div[playerLaser+width].classList.remove('laser')
    } else {
      playerLaserArray.push(playerLaser)
      if (playerLaserArray.length > 1) {
        playerLaserArray.splice(playerLaser.length-1, 1)  //removes the previous position of laser in playerLaserArray
      }
      div[playerLaser].classList.add('laser')
      div[playerLaser+width].classList.remove('laser')
      console.log(playerLaserArray)
      // checkBombLaserCollision()
      if(!checkAlienLaserCollision()) setTimeout(() => laserInterval(playerLaser), 30)
    }           // GLITCHES IF YOU SHOOT INTO TOP RIGHT CORNER
  }


  // *************************** ALIEN MOVEMENT *********************************

  //Creates alien rows. Called in init function.
  function createRow(startIndex) {
    for ( let i = 0; i < aliensInRow; i++) {
      div[startIndex].classList.add('alien')
      alienArray.push(startIndex)
      startIndex += 2
    }
  }

  function alienBoundary() {
    for (let i=0; i < alienArray.length; i++) {
      if (alienArray[i]%width === 0) {
        changeDirection = true
      } if (alienArray[i]%width === 1) {    //
        changeDirection = true
        direction = 'left'
      }
    }
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

  // *************************** ALIEN BOMB *********************************

  //Alien Bomb
  function alienBomb() {
    const rand = Math.ceil((Math.random() * alienArray.length))
    let alienBomb = alienArray[rand]
    const bombInt = setInterval(function() {
      alienBomb += width
      if (alienBomb > width*width) {                  // if the bomb goes of the page, remove
        div[alienBomb-width].classList.remove('bomb')
        clearInterval(bombInt)
      } else {
        alienBombArray.push(alienBomb)
        if (alienBombArray.length > 1) {           // I dont want this. need each bomb to have their position
          alienBombArray.splice(alienBomb.length-1, 1)  //removes the previous position of bomb bombArray
        }
        div[alienBomb].classList.add('bomb')            //think this creates error if bomb meets a bomb. do while loop?
        div[alienBomb-width].classList.remove('bomb')
        checkBombHit()
        console.log(alienBombArray)
      }
    }, 300)
  }


  // *************************** COLLISION CHECKS *********************************

  // Checks whether a bomb has hit the player
  function checkBombHit() {
    for (let i = 0; i < alienBombArray.length; i++) {
      if (alienBombArray[i] === playerIndex) {
        playerLives--
        updateHeading()
        console.log('hit')
        console.log(playerLives)
        if (playerLives === 0) {
          endgameLose()
        }
      }
    }
  }

  //Checks whether a laser has hit an alien
  function checkAlienLaserCollision() {
    for (let i = 0; i < alienArray.length; i++) {
      for (let j = 0; j < playerLaserArray.length; j++) {
        if (alienArray[i] === playerLaserArray[j]) {
          score += 1000
          //idea for score- time the whole thing and divide by score to get ultimate score. longer you take, lower the score
          updateHeading()
          div[alienArray[i]].classList.remove('alien')
          div[playerLaserArray[j]].classList.remove('laser')
          alienArray.splice(i, 1)
          return true
        }
      }
    }
    return false
  }

  // //Checks if a laser and bomb have collided DOESNT WORK
  // function checkBombLaserCollision(){
  //   for (let i = 0; i < playerLaserArray.length; i++) {
  //     for (let j = 0; j < alienBombArray.length; j++) {
  //       if (playerLaserArray[i] === alienBombArray[j]) {
  //         console.log('hit')
  //       }
  //     }
  //   }
  // }

  // probability of shooting- get math rand and times by ten. set difficulty at top of page,1 easiest, 10 hardest. if the randomly genrated number if less than diffucutly, get and alien to shoot.


  //****************************** ENDGAMES **************************************

  // Shows the score if the player wins by defeating all the aliens
  function endgameWin() {
    if (alienArray.length === 0) {
      clearInterval(gameId)
      console.log('win')
      document.querySelector('.result').innerText = `You win! All the aliens destroyed! You scored ${score}`
      return true
    }
  }

  function endgameLose() {
    for (let i = 0; i < alienArray.length; i++) {
      if (alienArray[i] > (width*width) - (width*2)) {
        clearInterval(gameId)
        for (let i=0; i < div.length; i++) {
          if(div[i].className === 'alien') {
            div[i].classList.remove('alien')          //if any div has class alien, remove it
          }
        }
        console.log('lose')
        document.querySelector('.result').innerText = 'You lose! The aliens have invaded!'
        return true
      }
    }
  }

  //*************************** GAMELOOP, INIT AND DISPLAY **********************************

  // Game loop. Puts main component of the game on a timer
  function gameLoop() {
    gameId = setInterval(function() {
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
        alienBoundary()                //this check alien boundaries and see whether to change direction
        endgameWin()
        endgameLose()
        alienBomb()
        if (endgameLose() === true) {
          console.log('endgame true')
          //CLEAR THE interval TO STOP THIS CODE FROM RUNNING
        }
      }
    }, 1000)
  }

  // Creates divs that make up the grid. Called in init function.
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  //Sets the display whist the game is in play
  function updateHeading() {
    document.querySelector('.aliensLeft').innerText = `There are ${alienArray.length -1} aliens remaining and you have ${playerLives} lives left!`
  }

  //init
  function init() {
    for (let i = 0; i < width * width; i++) addDivs()
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
    createRow(22)
    createRow(43)
    createRow(62)
    createRow(83)
    createRow(102)
    gameLoop()
  }

  init()

})
