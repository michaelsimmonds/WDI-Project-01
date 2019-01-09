document.addEventListener('DOMContentLoaded', () => {

  //******************************* VARIABLES **********************************

  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  const display = document.querySelector('.display')
  const levelArea = document.querySelector('.level')
  const startButton = document.querySelector('.startButton')
  const startScreen = document.querySelector('.startScreen')
  const aliensInRow = 7
  const playerLaserArray = []
  const alienBombArray = []
  let alienArray =  []
  let score = 0
  let direction = 'right'
  let changeDirection = false
  let playerLives = 3
  let level = 1
  let gameLoopSpeed = 400
  let div
  let prevIndex
  let playerIndex
  let moveCycle
  let outcome


  // ************************ PLAYER MOVEMENT AND ACTION ***********************

  // Handles the keys
  document.onkeydown = function(e) {
    prevIndex = playerIndex
    if (e.keyCode === 37 && playerIndex > div.length - width*2) {               //Left arrow
      playerIndex--
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 39 && playerIndex < (div.length-width)-1) {        //Right arrow
      playerIndex++
      movePlayer(playerIndex, prevIndex)
    } else if (e.keyCode === 32) {                                              //Space bar
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

  // ****************************** ALIEN BOMB *********************************

  //Runs the alienBomb if the random number is less than the bomb rate
  function checkFire() {
    const random = Math.random()
    if (random < 0.5) alienBomb()
  }

  //Alien Bomb
  function alienBomb() {
    const rand = Math.floor((Math.random() * alienArray.length))
    let alienBomb = alienArray[rand]
    const bombInt = setInterval(function() {
      checkBombHit()
      // if (checkBombHit() === true) clearInterval(bombInt)
      alienBomb += width
      if (alienBomb > width*width) {                    // if the bomb goes of the page, remove
        div[alienBomb-width].classList.remove('bomb')
        // console.log(alienBombArray.find(alienBomb))
        // alienBombArray.splice(, 1)
        clearInterval(bombInt)
      } else {
        alienBombArray.push(alienBomb)

        if (alienBombArray.length > 1) {                // Do I want this??? need each bomb to have their position
          alienBombArray.splice(alienBomb.length, 1)  //removes the previous position of bomb bombArray
        }
        // if (alienArray.length > 0) {
        div[alienBomb].classList.add('bomb')
        // console.log(div[alienBomb])
        div[alienBomb-width].classList.remove('bomb')
        // checkBombHit()
        // }

        console.log(alienBombArray)
      }
    }, 200)
  }

  // *************************** COLLISION CHECKS ******************************

  // Checks whether a bomb has hit the player
  function checkBombHit() {
    for (let i = 0; i < alienBombArray.length; i++) {
      if (alienBombArray[i] === playerIndex) {
        playerLives--
        updateHeading()
        console.log(alienBombArray[i])
        console.log(div[playerIndex].classList)
        // alienBombArray.splice(playerIndex, )
        div[playerIndex].classList.remove('bomb')
        console.log(div[playerIndex])
        console.log(div[alienBombArray[i]].classList.remove('bomb'))
        if (playerLives === 0) endgameLose()
        return true
      } else false
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
          // console.log('bomb laser')
          div[alienBombArray[i]].classList.remove('bomb')
          div[playerLaserArray[j]].classList.remove('laser')
          // console.log('bomb laser 2')
        }
      }
    }
  }

  //********************* LEVEL PROGRESSION AND ENDGAMES ***********************

  // Shows the score if the player wins by defeating all the aliens
  function nextLevel() {
    if (alienArray.length === 0) {
      boardReset()
      clearInterval(moveCycle)
      display.innerText = `There are ${alienArray.length} aliens remaining and you have ${playerLives} lives left!`
      level += 1
      if (level < 8) gameLoopSpeed -= 50
      startScreen.style.display = 'flex'
      document.querySelector('.startScreen h1').innerText = `Level ${level}`
      document.querySelector('.startScreen h2').innerText = ''
      startButton.style.display = 'none'
      let timeRemaining = 1
      const countdown = setInterval(() => {
        timeRemaining--
        if (timeRemaining < 0) {
          clearInterval(countdown)
          gameLoop()
        }
      }, 1000)
    }
  }

  // Gives lose conditions and end display on loss
  function endgameLose() {
    for (let i = 0; i < alienArray.length; i++) {
      if (alienArray[i] > (width*width) - (width*2) || playerLives === 0) {
        //THERE'S A GLITCH WHERE IF AN ALIEN HAS SHOTthe shot IT DOESNT DISAPPEAR
        clearInterval(moveCycle)
        if (alienArray[i] > (width*width) - (width*2)) outcome = 'Saving yourself, eh? You survived but the aliens invaded...'
        if (playerLives === 0) outcome = 'You ran out of lives...'
        document.querySelector('.startScreen h1').innerText = `${outcome}`
        document.querySelector('.startScreen h2').innerText = `You scored ${score} - ${endgameComment()}`
        startButton.style.display = 'flex'
        startButton.innerText = 'Play again'
        startButton.focus() // this doesnt do anything
        alienArray = []
        level = 1
        gameLoopSpeed = 400
        boardReset()
        startScreen.style.display = 'flex'
        playerLives = 3
      }
    }
  }

  function endgameComment() {
    if (level === 1 || level === 2) return 'Terrible. Humanity\'s doomed.'
    if (level === 3 || level === 4) return 'Not bad but the future looks bleak'
    if (level === 5 || level === 6) return 'Good work! You gave those aliens a run for their money'
    if (level === 7 || level === 8) return 'How on earth did you survive so long?!'
  }

  //*************************** GAMELOOP, INIT AND DISPLAY *********************

  // Game loop. Hides start screen, generates in-game-display and aliens, and puts main component of the game on a timer
  function gameLoop() {
    hideStartScreen()
    boardReset()
    placePlayer()
    display.innerText = `There are 35 aliens remaining and you have ${playerLives} lives left!`
    levelArea.innerText = `Level: ${level}`
    createRow(22)
    createRow(43)
    createRow(62)
    createRow(83)
    createRow(102)
    moveCycle = setInterval(function() {
      if(changeDirection){          //starts as false so these if options are skipped
        moveAlien('down')
        if(direction ==='left') direction ='right'
        else direction ='left'
        changeDirection = false
      } else {
        moveAlien(direction)        //this starts the directions. it is set to 'right' at the top intiially
        alienBoundary()             //this check alien boundaries and see whether to change direction
        checkFire()                 //initiates alien bomb
        nextLevel()
        endgameLose()
      }
    }, gameLoopSpeed)
  }

  //Sets the display whist the game is in play
  function updateHeading() {
    display.innerText = `There are ${alienArray.length} aliens remaining and you have ${playerLives} lives left!`
  }

  //Hide startScreen
  function hideStartScreen() {
    startScreen.style.display = 'none'
  }

  function placePlayer() {
    playerIndex = (div.length-1) - (width*1.5)
    div[playerIndex].classList.add('player')
  }

  //Creates grid and initialises gameloop.
  function init() {
    for (let i = 0; i < width * width; i++) addDivs()
    div = document.querySelectorAll('div')
    startButton.addEventListener('click', gameLoop)
  }

  // Creates divs that make up the grid. Called in init function.
  function addDivs() {
    const newDiv = document.createElement('div')
    grid.appendChild(newDiv)
  }

  function boardReset() {
    for (let i = 0; i < div.length; i++) {
      if(div[i].className === 'laser') div[i].classList.remove('laser',)
      if(div[i].className === 'alien') div[i].classList.remove('alien')
      if(div[i].className === 'bomb') div[i].classList.remove('bomb')
      if(div[i].classList.contains('player')) div[i].classList.remove('alien', 'laser', 'player')
    }
  }

  init()
})
