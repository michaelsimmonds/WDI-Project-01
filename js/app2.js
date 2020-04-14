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
  const groan = document.querySelector('#groan')
  const cheers = document.querySelector('#cheers')
  const boos = document.querySelector('#boos')
  const aliensInRow = 7
  let playerRocketArray = []
  let alienLaserArray = []
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
    }
  }


  // Handles movement of player. Is called in function to handle keys
  function movePlayer(playerIndex, prevIndex){
    div[playerIndex].classList.add('player')
    div[prevIndex].classList.remove('player')
  }


  // Handles the shoot function. Prevents player from holding down shoot.
  var keydown = false
  document.addEventListener('keydown', function(e) {
    if (e.keyCode === 32) {
      if (!keydown) {
        keydown = true
        shootplayerRocket(playerIndex)
        playerFireAudio.currentTime = 0
        playerFireAudio.play()
      }
      document.addEventListener('keyup', function() {
        keydown = false
      })
    }
  })


  // *************************** PLAYER rocket *********************************

  // Handles movement of player rocket. Is called in function to handle keys
  function shootplayerRocket(startPoint) {               //startpoint is retrieved from player pos when spacebar pressed
    setTimeout(() => rocketInterval(startPoint), 50)
  }

  // Player shoots a rocket
  function rocketInterval(playerRocket) {
    playerRocket -= width
    if (playerRocket <= 0) div[playerRocket+width].classList.remove('rocket')
    else {
      playerRocketArray.push(playerRocket)
      if (playerRocketArray.length > 1) playerRocketArray.splice(playerRocket.length-1, 1)  //removes the previous position of rocket in playerRocketArray
      div[playerRocket].classList.add('rocket')
      div[playerRocket+width].classList.remove('rocket')
      if(!checkAlienrocketCollision()) setTimeout(() => rocketInterval(playerRocket), 50)
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

  // ****************************** ALIEN Laser *********************************

  //Runs the alienLaser if the random number is less than the Laser rate
  function checkFire() {
    const random = Math.random()
    if (random < 0.5) alienLaser()
  }

  //Alien Laser
  function alienLaser() {
    laserAudio.currentTime = 0
    laserAudio.play()
    const rand = Math.floor((Math.random() * alienArray.length))
    let alienLaser = alienArray[rand]
    const laserInt = setInterval(function() {
      checkLaserHit()
      alienLaser += width
      if (alienLaser > width*width) {                    // if the Laser goes of the page, remove
        div[alienLaser-width].classList.remove('laser')
        clearInterval(laserInt)
      } else {
        alienLaserArray.push(alienLaser)
        if (alienLaserArray.length > 1) {
          alienLaserArray.splice(alienLaser.length, 1)  //removes the previous position of Laser LaserArray
        }
        if(div[alienLaser]){
          div[alienLaser].classList.add('laser')
          div[alienLaser-width].classList.remove('laser')
        }
      }
    }, 79)
  }

  // *************************** COLLISION CHECKS ******************************

  // Checks whether a laser has hit the player
  function checkLaserHit() {
    for (let i = 0; i < alienLaserArray.length; i++) {
      if (alienLaserArray[i] === playerIndex) {
        groan.currentTime = 0.3
        groan.play()
        explosion(playerIndex)
        blink()
        clearBlink()
        playerLives--
        updateHeading()
        if (playerLives === 0) endgameLose()
      }
    }
  }

  // Sets a blink class on player line. Called when player is shot.
  function blink() {
    for (let i = 0; i < width*width; i++) {
      if (i > (width*width) - 2*width && i < (width*width) - width) div[i].classList.add('blink')
    }
  }

  // Clears the blink after two seconds
  function clearBlink() {
    let timeRemaining = 1
    const blinkInt = setInterval(() => {
      timeRemaining--
      if (timeRemaining === 0) {
        clearInterval(blinkInt)
        for (let i = 0; i < width*width; i++) {
          if (i > (width*width) - 2*width && i < (width*width) - width) div[i].classList.remove('blink')
        }
      }
    }, 1000)
  }


  //Checks whether a rocket has hit an alien
  function checkAlienrocketCollision() {
    for (let i = 0; i < alienArray.length; i++) {
      for (let j = 0; j < playerRocketArray.length; j++) {
        if (alienArray[i] === playerRocketArray[j]) {
          alienDestroyedAudio.currentTime = 0
          alienDestroyedAudio.play()
          const collisionIndex = alienArray[i]
          div[collisionIndex].classList.add('explosion')
          explosion(collisionIndex)
          score += Math.floor(10 * (level/2))
          div[collisionIndex].classList.remove('alien')
          div[collisionIndex].classList.remove('rocket')
          alienArray.splice(i, 1)
          updateHeading()
          return true
        }
      }
    }
    return false
  }

  //************************** Explosion effect ********************************

  // Sets sprite sheet explosion effect
  let currentStep = 0
  function explosion(collisionIndex){
    let explosionId
    if(currentStep === 15){
      currentStep = 0
      div[collisionIndex].classList.remove('explosion')
      clearTimeout(explosionId)
      div[collisionIndex].removeAttribute('data-step')
    } else{
      currentStep++
      div[collisionIndex].dataset.explosion = currentStep
      explosionId = setTimeout(() => explosion(collisionIndex), 2)
    }
  }

  //********************* LEVEL PROGRESSION AND ENDGAMES ***********************

  // Shows the score if the player wins by defeating all the aliens
  function nextLevel() {
    if (alienArray.length === 0) {
      boardReset()
      alienLaserArray = []
      playerRocketArray = []
      clearInterval(moveCycle)
      display.innerText = `There are ${alienArray.length} aliens remaining in this wave and you have ${playerLives} lives left!`
      level += 1
      if (level < 8) gameLoopSpeed -= 40
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
        if (level <= 4 ) boos.play()
        if (level > 4) cheers.play()
        clearInterval(moveCycle)
        if (alienArray[i] > (width*width) - (width*2)) outcome = 'Saving yourself, eh? You survived but the aliens invaded...'
        if (playerLives === 0) outcome = 'Out of lives...'
        document.querySelector('.startScreen h1').innerText = `${outcome}`
        document.querySelector('.startScreen h2').innerText = `You scored ${score} - ${endgameComment()}`
        startButton.style.display = 'flex'
        startButton.innerText = 'Play again'
        alienArray = []
        level = 1
        score = 0
        gameLoopSpeed = 400
        playerLives = 3
        direction = 'right'
        changeDirection = false
        boardReset()
        startScreen.style.display = 'flex'

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
        moveAlien('down')           // down doesn't need to be defined in move function- it's not right or left, so defaults
        if(direction ==='left') direction ='right'
        else direction ='left'
        changeDirection = false
      } else {
        checkFire()                 //initiates alien Laser
        moveAlien(direction)        //this starts the directions. direction is set to 'right' at the top intiially
        alienBoundary()             //this check alien boundaries and see whether to change direction
        nextLevel()
        endgameLose()
        for (let i = 0; i < div.length; i++) {
          if(div[i].classList.contains('explosion')) div[i].classList.remove('explosion')
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
      if(div[i].className === 'rocket') div[i].classList.remove('rocket',)
      if(div[i].className === 'alien') div[i].classList.remove('alien')
      if(div[i].className === 'laser') div[i].classList.remove('laser')
      if(div[i].classList.contains('player')) div[i].classList.remove('alien', 'rocket', 'player')
    }
  }

  init()
})
