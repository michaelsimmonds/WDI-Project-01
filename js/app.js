document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')
  player.left = 525
  player.top = 600

  const lasers = []
  const aliens = [
    {top: 50, left: 100},
    {top: 50, left: 200},
    {top: 50, left: 300},
    {top: 50, left: 400},
    {top: 50, left: 500},
    {top: 50, left: 600},
    {top: 50, left: 700},
    {top: 50, left: 800},
    {top: 150, left: 100},
    {top: 150, left: 200},
    {top: 150, left: 300},
    {top: 150, left: 400},
    {top: 150, left: 500},
    {top: 150, left: 600},
    {top: 150, left: 700},
    {top: 150, left: 800}
  ]

  document.onkeydown = function(e) {
    if (e.keyCode === 37) {
      console.log('LEFT')
      player.left -= 20
      movePlayer()
    } else if (e.keyCode === 39) {
      console.log('RIGHT')
      player.left += 20
      movePlayer()
    } else if (e.keyCode === 32) {
      console.log('fire')
      playerLaser()
    }
  }

  function createAlien() {
    for (let i = 0; i < aliens.length; i++) {
      const alienDiv = document.createElement('div')
      alienDiv.className = 'alien'
      document.querySelector('.gamespace').appendChild(alienDiv)
      alienDiv.style.left = aliens[i].left + 'px'
      alienDiv.style.top = aliens[i].top + 'px'
    }
  }
  createAlien()

  // Move the player left and right //
  function movePlayer() {
    document.querySelector('.player').style.left = player.left + 'px'
    boundary()
  }

  // Boundary function. Ensures the player does not leave the edges of the page
  function boundary() {
    if (player.left < 30) {
      player.left = 30
    } else if (player.left > 1020) {
      player.left = 1020
    }
  }

  // Creates and shoots laser from player
  function playerLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    laser.style.left = player.left + 20 + 'px'
    laser.style.top = player.top - 30 + 'px'
    lasers.push(laser) // dont think i need this
    console.log(laser)
    setInterval(function() {
      const s = 10
      const distToTop = laser.offsetTop
      laser.style.top = (distToTop - s) + 'px'
      if (laser.offsetTop < 0) {
        laser.style.display = 'none'
      }
    }, 10)
  }

  // Get aliens to randomly shoot
  function alienLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    const random = Math.ceil(Math.random() * 15)
    console.log(aliens[random])
    laser.style.left = aliens[random].left + 40 + 'px'
    laser.style.top = aliens[random].top + 80 + 'px'
    setInterval(function() {
      const s = 10
      const distToTop = laser.offsetTop
      laser.style.top = (distToTop + s) + 'px'
      if (laser.offsetTop > 670) {            // if the lasers go off the end of display they disappear
        laser.style.display = 'none'
      }
    }, 100)
  }
  setInterval(function() {
    alienLaser()
  }, Math.random() * 3000)      //this random number needs to chnage on each calling of the function











  // NONE OF THE BELOW IS WORKING CODE
  // function moveAlienOne() {
  //   setInterval(function() {
  //     console.log('goin')
  //     console.log(aliens[1].top)
  //     aliens[1].offsetTop += 80 + 'px'
  //     console.log(aliens[1])
  //     // if (laser.offsetTop < 0) {
  //     //   laser.style.display = 'none'
  //     // }
  //   }, 1000)
  // }
  // moveAlienOne()


  //  Collision
  // function isCollide(a, b) {
  //   return !(
  //     ((a.y + a.height) < (b.y)) ||
  //         (a.y > (b.y + b.height)) ||
  //         ((a.x + a.width) < b.x) ||
  //         (a.x > (b.x + b.width))
  //   )
  // }
  // isCollide(laser, alien)

  // Enemy movement
  // function moveAlien() {
  //   const alienRow = document.querySelectorAll('.alien')
  //   console.log(alienRow)
  //   setInterval(function() {
  //     const s = 10
  //     const distToSide = alienRow.offsetTop
  //     console.log('work')
  //     alienRow.style.topLeft = (distToSide + s) + 'px'
  //   }, 1000)
  // }
  // moveAlien()

})
