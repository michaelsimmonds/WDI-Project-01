document.addEventListener('DOMContentLoaded', () => {

  //******************************* VARIABLES **********************************

  const grid = document.querySelector('.grid')
  const width = 20 // cant change this at the mo- doesn't display properly
  const display = document.querySelector('.display')
  const levelArea = document.querySelector('.level')
  const startButton = document.querySelector('.startButton')
  const startScreen = document.querySelector('.startScreen')
  const laserAudio = document.querySelector('#laserAudio')
  const playerFireAudio = document.querySelector('#playerFireAudio')
  const alienDestroyedAudio = document.querySelector('#alienDestroyedAudio')
  const boos = document.querySelector('#boos')
  const aliensInRow = 7
  let playerLaserArray = []
  let alienBombArray = []
  let alienArray =  []
  let score = 0
  let direction = 'right'
  let changeDirection = false
  let playerLives = 10
  let level = 1
  let gameLoopSpeed = 300
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
      playerFireAudio.currentTime = 0
      playerFireAudio.play()
    }
  }
  // put shoot as a separate function so you can shoot and move at the same time

  // Handles movement of player. Is called in function to handle keys
  function movePlayer(playerIndex, prevIndex){
    div[playerIndex].classList.add('player')
    div[prevIndex].classList.remove('player')
  }


  // *************************** PLAYER LASER *********************************

  // Handles movement of player laser. Is called in function to handle keys
  function shootPlayerLaser(startPoint) {               //startpoint is retrieved from player pos when spacebar pressed
    setTimeout(() => laserInterval(startPoint), 50)
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
      if(!checkAlienLaserCollision()) setTimeout(() => laserInterval(playerLaser), 50)
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
    laserAudio.currentTime = 0
    laserAudio.play()
    const rand = Math.floor((Math.random() * alienArray.length))
    let alienBomb = alienArray[rand]
    const bombInt = setInterval(function() {
      console.log(alienBombArray)
      checkBombHit()
      alienBomb += width
      if (alienBomb > width*width) {                    // if the bomb goes of the page, remove
        div[alienBomb-width].classList.remove('bomb')
        clearInterval(bombInt)
      } else {
        alienBombArray.push(alienBomb)
        if (alienBombArray.length > 1) {                // Do I want this??? need each bomb to have their position
          alienBombArray.splice(alienBomb.length, 1)  //removes the previous position of bomb bombArray
        }
        if(div[alienBomb]){
          div[alienBomb].classList.add('bomb')
          div[alienBomb-width].classList.remove('bomb')
        }
      }
    }, 79)
  }

  // *************************** COLLISION CHECKS ******************************

  // Checks whether a bomb has hit the player
  function checkBombHit() {
    for (let i = 0; i < alienBombArray.length; i++) {
      if (alienBombArray[i] === playerIndex) {
        div[playerIndex].classList.add('explosive')
        explosion(playerIndex)
        playerLives--
        updateHeading()
        div[playerIndex].classList.remove('bomb')
        // alienBombArray.splice(i, 1)
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
          alienDestroyedAudio.currentTime = 0
          alienDestroyedAudio.play()
          const collisionIndex = alienArray[i]
          console.log(collisionIndex)
          div[collisionIndex].classList.add('explosive')
          explosion(collisionIndex)
          score += Math.floor(10 * (level/2))
          div[collisionIndex].classList.remove('alien')
          div[collisionIndex].classList.remove('laser')
          alienArray.splice(i, 1)
          updateHeading()
          return true
        }
      }
    }
    return false
  }

  //************************** Explosion effect ********************************

  let currentStep = 0
  let explosionId

  function explosion(collisionIndex){
    if(currentStep === 15){
      currentStep = 0
      div[collisionIndex].classList.remove('explosive')
      clearTimeout(explosionId)
      div[collisionIndex].removeAttribute('data-step')
    } else{
      currentStep++
      div[collisionIndex].dataset.explosion = currentStep
      explosionId = setTimeout(() => explosion(collisionIndex), 10)
    }
  }

  //********************* LEVEL PROGRESSION AND ENDGAMES ***********************

  // Shows the score if the player wins by defeating all the aliens
  function nextLevel() {
    if (alienArray.length === 0) {
      boardReset()
      alienBombArray = []
      playerLaserArray = []
      clearInterval(moveCycle)
      display.innerText = `There are ${alienArray.length} aliens remaining in this wave and you have ${playerLives} lives left!`
      level += 1
      if (level < 8) gameLoopSpeed -= 25
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
      if (alienArray[i] > (width*width) - (width*2) || playerLives <= 0) {
        //THERE'S A GLITCH WHERE IF AN ALIEN HAS SHOTthe shot IT DOESNT DISAPPEAR
        clearInterval(moveCycle)
        if (alienArray[i] > (width*width) - (width*2)) outcome = 'Saving yourself, eh? You survived but the aliens invaded...'
        if (playerLives === 0) outcome = 'Out of lives...'
        document.querySelector('.startScreen h1').innerText = `${outcome}`
        document.querySelector('.startScreen h2').innerText = `You scored ${score} - ${endgameComment()}`
        startButton.style.display = 'flex'
        startButton.innerText = 'Play again'
        startButton.focus() // this doesnt do anything
        alienArray = []
        level = 1
        score = 0
        gameLoopSpeed = 400
        boardReset()
        startScreen.style.display = 'flex'
        playerLives = 3
      }
    }
  }

  function endgameComment() {
    if (level === 1 || level === 2) return 'You\'re a disgrace to the Human Race'
    if (level === 3 || level === 4) return 'Not bad but the future looks bleak'
    if (level === 5 || level === 6) return 'Good work! You gave those aliens a run for their money'
    if (level === 7 || level === 8) return 'How on earth did you survive so long?!'
    if (level > 8) return 'Bad luck this game\'s unwinable, or you would\'ve won it!'
  }

  //*************************** GAMELOOP, INIT AND DISPLAY *********************

  // Game loop. Hides start screen, generates in-game-display and aliens, and puts main component of the game on a timer
  function gameLoop() {
    hideStartScreen()
    boardReset()
    placePlayer()
    display.innerText = `There are 35 aliens remaining in this wave and you have ${playerLives} lives left!`
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
        checkFire()                 //initiates alien bomb
        moveAlien(direction)        //this starts the directions. it is set to 'right' at the top intiially
        alienBoundary()             //this check alien boundaries and see whether to change direction
        nextLevel()
        endgameLose()
        for (let i = 0; i < div.length; i++) {
          if(div[i].classList.contains('explosive')) div[i].classList.remove('explosive')
        }
      }
    }, gameLoopSpeed)
  }

  //Sets the display whist the game is in play
  function updateHeading() {
    display.innerText = `There are ${alienArray.length} aliens remaining in this wave and you have ${playerLives} lives left!`
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
