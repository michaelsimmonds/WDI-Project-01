document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  let div
  let prevIndex
  let playerIndex
  const playerLaserArray = []
  let alienArray =  []
  const aliensInRow = 7
  let score = 0
  let direction = 'right'
  let moveCycle
  let changeDirection = false
  let playerLives = 3
  let level = 1
  const alienBombArray = []
  let gameLoopSpeed = 350
  const display = document.querySelector('.display')
  const levelArea = document.querySelector('.level')
  const scoreArea = document.querySelector('.score')

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
    if (playerLaser <= 0) div[playerLaser+width].classList.remove('laser')
    else {
      playerLaserArray.push(playerLaser)
      if (playerLaserArray.length > 1) playerLaserArray.splice(playerLaser.length-1, 1)  //removes the previous position of laser in playerLaserArray
      div[playerLaser].classList.add('laser')
      div[playerLaser+width].classList.remove('laser')
      checkBombLaserCollision()
      if(!checkAlienLaserCollision()) setTimeout(() => laserInterval(playerLaser), 41)
    }
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
      if (alienArray[i]%width === 0) changeDirection = true
      if (alienArray[i]%width === 1) {    //
        changeDirection = true
        direction = 'left'
      }
    }
  }

  function moveAlien(direction) {
    for (let i=0; i < alienArray.length; i++) {
      if (direction === 'left') alienArray[i] -= 1
      else if (direction === 'right') alienArray[i] += 1
      else alienArray[i] += width
    }
    showAlienMove()
  }

  function showAlienMove() {
    for (let i=0; i < div.length; i++) {
      if(div[i].className === 'alien') div[i].classList.remove('alien')          //if any div has class alien, remove it
    }
    for (let i=0; i < alienArray.length; i++) {
      div[alienArray[i]].classList.add('alien')   //the div the alien is moving to, add the class alien
    }
  }

  // *************************** ALIEN BOMB *********************************

  //Runs the alienBomb if the random number is less than the bomb rate
  function checkFire() {
    const random = Math.random()
    if (random < 0.5) alienBomb()
  }

  //Alien Bomb
  function alienBomb() {
    const rand = Math.floor((Math.random() * alienArray.length))
    let alienBomb = alienArray[rand] + width
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
        if (alienArray.length > 0) {
          div[alienBomb].classList.add('bomb')
          div[alienBomb-width].classList.remove('bomb')
          checkBombHit()
        }
      }
    }, 79)
  }

  // there is a glitch that the alien class appears behind the bomb square after if it is shot

  // *************************** COLLISION CHECKS *********************************

  // Checks whether a bomb has hit the player
  function checkBombHit() {
    for (let i = 0; i < alienBombArray.length; i++) {
      if (alienBombArray[i] === playerIndex) {
        playerLives--
        updateHeading()
        if (playerLives === 0) endgameLose()
      }
    }
  }

  //Checks whether a laser has hit an alien
  function checkAlienLaserCollision() {
    for (let i = 0; i < alienArray.length; i++) {
      for (let j = 0; j < playerLaserArray.length; j++) {
        if (alienArray[i] === playerLaserArray[j]) {
          score += Math.floor(10 * (level/2))
          div[alienArray[i]].classList.remove('alien')
          div[playerLaserArray[j]].classList.remove('laser')
          alienArray.splice(i, 1)
          updateHeading()
          return true
        }
      }
    }
    return false
  }

  // Checks if a laser and bomb have collided DOESNT WORK
  function checkBombLaserCollision(){
    for (let i = 0; i < playerLaserArray.length; i++) {
      for (let j = 0; j < alienBombArray.length; j++) {
        if (playerLaserArray[i] === alienBombArray[j] || playerLaserArray[i] === alienBombArray[j] + width) {
          console.log('bomb laser')
          div[alienBombArray[i]].classList.remove('bomb')
          div[playerLaserArray[j]].classList.remove('laser')
          console.log('bomb laser 2')
          // return true
        }
      }
    }
    // return false
  }

  //****************************** ENDGAMES **************************************

  // Shows the score if the player wins by defeating all the aliens
  function nextLevel() {
    if (alienArray.length === 0) {
      clearInterval(moveCycle)
      for (let i=0; i < div.length; i++) {
        if(div[i].className === 'bomb') div[i].classList.remove('bomb')
      }
      display.innerText = `There are ${alienArray.length} aliens remaining and you have ${playerLives} lives left!`
      gameLoop()
      level += 1
      levelArea.innerText = `Level: ${level}`
      if (level < 8) gameLoopSpeed -= 50
    }
  }

  function endgameLose() {
    for (let i = 0; i < alienArray.length; i++) {
      if (alienArray[i] > (width*width) - (width*2) || playerLives === 0) {
        //THERE'S A GLITCH WHERE IF AN ALIEN HAS SHOTthe shot IT DOESNT DISAPPEAR
        clearInterval(moveCycle)
        updateHeading()
        if (alienArray[i] > (width*width) - (width*2)) display.innerText = 'Saving yourself, eh? You survived but the aliens invaded...'
        if (playerLives === 0) display.innerText = 'You ran out of lives...'
        scoreArea.innerText = `You scored ${score} - ${endgameComment()}`
        alienArray = []
        document.querySelector('.player').classList.remove('bomb')
        for (let i=0; i < div.length; i++) {
          if(div[i].className === 'alien') div[i].classList.remove('alien')          //if any div has class alien, remove it
          if(div[i].className === 'bomb') div[i].classList.remove('bomb')
        }
      }
    }
  }

  function endgameComment() {
    if (level === 1 || level === 2) return 'Terrible. Humanity\'s doomed.'
    if (level === 3 || level === 4) return 'Not bad but the future looks bleak'
    if (level === 5 || level === 6) return 'Good work! You gave those aliens a run for their money'
    if (level === 7 || level === 8) return 'How on earth did you survive so long?!'
  }


  //*************************** GAMELOOP, INIT AND DISPLAY **********************************

  // Game loop. Puts main component of the game on a timer
  function gameLoop() {
    hideButton()
    display.innerText = `There are 35 aliens remaining and you have ${playerLives} lives left!`
    createRow(22)
    createRow(43)
    createRow(62)
    createRow(83)
    createRow(102)
    moveCycle = setInterval(function() {
      if(changeDirection){               //starts as false so these if options are skipped
        moveAlien('down')
        if(direction ==='left') direction ='right'
        else direction ='left'
        changeDirection = false
      } else {
        nextLevel()
        endgameLose()
        moveAlien(direction)        //this starts the directions. it is set to 'right' at the top intiially
        alienBoundary()                //this check alien boundaries and see whether to change direction
        checkFire()
      }
    }, gameLoopSpeed)
  }

  // Creates divs that make up the grid. Called in init function.
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  //Sets the display whist the game is in play
  function updateHeading() {
    display.innerText = `There are ${alienArray.length} aliens remaining and you have ${playerLives} lives left!`
  }

  //init. Creates grid and places player. Then initialises gameloop.
  function init() {
    for (let i = 0; i < width * width; i++) addDivs()
    div = document.querySelectorAll('div')
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
    // gameLoop()
  }

  const startButton = document.querySelector('.startButton')
  const startScreen = document.querySelector('.startScreen')
  function hideButton() {
    startScreen.style.display = 'none'
  }

  init()

  startButton.addEventListener('click', gameLoop)

})
