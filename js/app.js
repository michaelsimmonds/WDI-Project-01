document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')
  player.left = 525
  player.top = 600

  const lasers = []
  const aliens = []
  let alienNum = 9

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
      createLaser()
    }
  }

  //Creates Aliens
  for (let i = 0; i < alienNum; i++) {
    const alienDiv = document.createElement('div')
    alienDiv.className = 'alien'
    document.querySelector('.gamespace').appendChild(alienDiv)
  }

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
  function createLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    laser.style.left = player.left + 20 + 'px'
    laser.style.top = player.top - 30 + 'px'
    lasers.push(laser)
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

  // NONE OF THE BELOW IS WORKING CODE
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

  //
  // //  Collision
  // function isCollide(a, b) {
  //   return !(
  //     ((a.y + a.height) < (b.y)) ||
  //         (a.y > (b.y + b.height)) ||
  //         ((a.x + a.width) < b.x) ||
  //         (a.x > (b.x + b.width))
  //   )
  // }
  // isCollide(laser, alien)
  //
  // function gameLoop() {
  //   setTimeout(gameLoop, 1000)
  //   moveLaser()
  //   // createLaser()
  //   console.log('works')
  // }
  // gameLoop()

})
