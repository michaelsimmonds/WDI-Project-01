document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')
  player.left = 550
  player.top = 600

  const lasers = []
  const aliens = []
  console.log(lasers)

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
      const movement = laser.offsetTop
      laser.style.top = (movement - s) + 'px'
    }, 10)
  }

  // function moveLaser() {
  //   for (let i = 0; i <= lasers.length; i++) {
  //     lasers[i].top += 5
  //   }
  // }
  // moveLaser()
  //
  // function gameLoop() {
  //   setTimeout(gameLoop, 1000)
  //   moveLaser()
  //   // createLaser()
  //   console.log('works')
  // }
  // gameLoop()


  // TRIED TO CREATE ALIEN USING JAVASCRIPT BUT COULDN'T WORK OUT HOW TO DO MORE THAN ONE
  // function createAlien() {
  //   const div = document.createElement('div')
  //   const gamespace = document.querySelector('.gamespace')
  //   const alien = gamespace.appendChild(div)
  //   alien.className = 'alien'
  //   aliens.push(alien)
  //   alien.style.left += 60 + 'px'
  //   alien.style.top += 60 + 'px'
  //   console.log(aliens)
  // }
})
