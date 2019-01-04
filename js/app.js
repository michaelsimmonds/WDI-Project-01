document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')

  player.left = 550
  player.top = 600

  const lasers = []

  function createLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    laser.style.left = player.left + 20 + 'px'
    laser.style.top = player.top - 30 + 'px'
    lasers.push(laser)
    console.log(lasers)
  }

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


  //  This does not work yet
  // function moveLaser() {
  //   console.log(laser)
  //   laser.style.top += player.top + 20 + 'px'
  // }


  // Boundary function. Ensures the player does not leave the edges of the page
  function boundary() {
    if (player.left < 30) {
      player.left = 30
    } else if (player.left > 1020) {
      player.left = 1020
    }

  }

  // function gameLoop() {
  //   setTimeout(gameLoop, 1000)
  //   moveLaser()
  //   laserAppear()
  // }
  // gameLoop()





  // CODE NOW RENDUNDANT --- MADE A DIFFERENT BIT TO GENERATE THE LASERS ON CLICK
  // function laserAppear() {
  //   laser.style.left = player.left + 20 + 'px'
  //   laser.style.top = player.top - 30 + 'px'
  //   lasers.push(laser)
  //   console.log(lasers)
  // }

})
