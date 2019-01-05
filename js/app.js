document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')
  player.left = 525
  player.top = 600

  const alienLocations = [
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
  const aliens = []

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
    for (let i = 0; i < alienLocations.length; i++) {
      const alienDiv = document.createElement('div')
      alienDiv.className = 'alien'
      document.querySelector('.gamespace').appendChild(alienDiv)
      alienDiv.style.left = alienLocations[i].left + 'px'
      alienDiv.style.top = alienLocations[i].top + 'px'
      aliens.push(alienDiv)
      setInterval(function() {           //had to put move function in here. TRY TO TAKE OUT LATER
        alienLocations[i].left += 20
        alienDiv.style.left = alienLocations[i].left + 'px'
        alienDiv.style.top = alienLocations[i].top + 'px'
        console.log(alienLocations[i].top)
        console.log(alienLocations[i])
      }, 1000)

    }
  }
  createAlien()
  console.log(aliens)
  console.log(alienLocations)

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
    console.log(alienLocations[random])
    laser.style.left = alienLocations[random].left + 40 + 'px'
    laser.style.top = alienLocations[random].top + 80 + 'px'
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
  }, Math.random() * 1000)      //this random number needs to chnage on each calling of the function







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
