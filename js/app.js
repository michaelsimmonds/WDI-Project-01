document.addEventListener('DOMContentLoaded', () => {

  const player = document.querySelector('.player')
  player.left = 525
  player.top = 600

  const lasers = []

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
      player.left -= 20
      movePlayer()
    } else if (e.keyCode === 39) {
      player.left += 20
      movePlayer()
    } else if (e.keyCode === 32) {
      playerLaser()
      // console.log(lasers) //this console.log shows the lasers are being tracked. need to work out how to get them off array
    }
  }

  // // TRYing TO REFACTOR THIS
  // function createAlien() {
  //   for (let i = 0; i < alienLocations.length; i++) {
  //     const alienDiv = document.createElement('div')
  //     alienDiv.className = 'alien'
  //     document.querySelector('.gamespace').appendChild(alienDiv)
  //     alienDiv.style.left = alienLocations[i].left + 'px'
  //     alienDiv.style.top = alienLocations[i].top + 'px'
  //     aliens.push({
  //       top: alienLocations[i].top,
  //       left: alienLocations[i].left
  //     })
  //     console.log(aliens)
  //
  //     // setInterval(function() {
  //   alienLocations[i].left += 20
  //   alienDiv.style.left = alienLocations[i].left + 'px'
  //   alienDiv.style.top = alienLocations[i].top + 'px'
  //   if (alienLocations[i].left > 1000) {                // if an alien gets all the way to the right
  //     alienLocations[i].left -= 20
  //     alienDiv.style.left = alienLocations[i].left + 'px'
  //     alienDiv.style.top = alienLocations[i].top + 'px'
  //   }
  //     // }, 1000)
  //   }
  // }
  // createAlien()

  // tried to refactor above- will come back to
  function createAlien() {
    for (let i = 0; i < alienLocations.length; i++) {
      const alienDiv = document.createElement('div')
      alienDiv.className = 'alien'
      document.querySelector('.gamespace').appendChild(alienDiv)
      alienDiv.style.left = alienLocations[i].left + 'px'
      alienDiv.style.top = alienLocations[i].top + 'px'
      aliens.push(alienDiv)
    }
  }
  createAlien()


  //have no idea why the below isn't working
  function moveAlienRight() {
    for (let i = 0; i < 1; i++){
      aliens[0].innerHtml = ''
      console.log(aliens[0].innerHtml)
      setInterval( () => {
        aliens[0].innerHtml = ''
        console.log(aliens[0].innerHtml)
        console.log(aliens[0])
        alienLocations[0].left += 20
        // console.log(alienLocations[0].left)     //this works, it is rising incrementally
        console.log(aliens[0].innerHtml = `<div class="alien" style="left: ${alienLocations[0].left}px; top: ${alienLocations[0].top}px;"></div>`)

      }, 1000)
    }
  }
  moveAlienRight()




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

  // Creates and shoots laser from player. THIS WORKS!!!!!!!!!!!!!
  function playerLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    laser.style.left = player.left + 20 + 'px'
    laser.style.top = player.top - 30 + 'px'
    setInterval(function() {
      const s = 10
      const distToTop = laser.offsetTop
      laser.style.top = (distToTop - s) + 'px'
      lasers.push({
        left: laser.style.left,
        top: laser.style.top
      })
      if (laser.offsetTop < 0) {
        // laser.style.display = 'none'
        gamespace.removeChild(laser)
      }
    }, 100)
  }


  // Get aliens to randomly shoot
  function alienLaser() {
    const laser = document.createElement('div')
    const gamespace = document.querySelector('.gamespace')
    gamespace.appendChild(laser)
    laser.className = 'laser'
    const random = Math.ceil(Math.random() * 15)
    laser.style.left = alienLocations[random].left + 40 + 'px'
    laser.style.top = alienLocations[random].top + 80 + 'px'
    setInterval(function() {
      const s = 10
      const distToTop = laser.offsetTop
      laser.style.top = (distToTop + s) + 'px'
      if (laser.offsetTop > 670) {            // if the lasers go off the end of display they disappear
        // laser.style.display = 'none'
        gamespace.removeChild(laser)
      }
    }, 100)
  }
  setInterval(function() {
    alienLaser()
  }, Math.random() * 3000)      //this random number needs to chnage on each calling of the function


  // Collision. DOES NOT WORK.
  function collision() {
    for (let alien = 0; alien < alienLocations.length; alien++) {
      for (let laser = 0; laser < lasers.length; laser++) {
        if (
          (lasers[laser].top <= alienLocations[alien].top + 50) &&
          (lasers[laser].top > alienLocations[alien].top) &&
          (lasers[laser].left >= alienLocations[alien].left) &&
          (lasers[laser].left <= alienLocations[alien].left + 50)
        ) {
          console.log('hit')
        }
      }
    }
  }


})
