document.addEventListener('DOMContentLoaded', () => {

  let player = document.querySelector('.player')
  player.left = 550
  player.top = 600

  let laser = document.querySelector('.laser')
  let lasers = []

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
      shotAppear()
    }
  }

  function movePlayer() {
    document.querySelector('.player').style.left = player.left + 'px'
    boundary()
  }

  function shotAppear() {
    laser.style.left = player.left + 20 + 'px'
    laser.style.top = player.top - 30 + 'px'
    lasers.push(laser)
  }


// Boundary function. Ensures the player does not leave the edges of the page
  function boundary() {
    if (player.left < 30) {
      player.left = 30
    } else if (player.left > 1020) {
      player.left = 1020
    }

  }

  // function shoot() {
  //   document.querySelector('.laser').innerHtml = ''
  //   for (let laser = 0; laser < lasers.length; laser ++) {
  //     document.querySelector('.laser').innerHtml = `<div class='laser' style:'left:${lasers[laser].left}px; top:${lasers[laser].top}px;'></div>`
  //     console.log('worked')
  //   }
  // }

})
