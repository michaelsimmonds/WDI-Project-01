document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // // h1.textContent = 'Hello Word!'
  // const player = document.querySelector('.player')

  let player = {
    top: 600,
    left: 525
  }

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
      // console.log('shoot')
      // lasers.push({
      //   top: player.top,
      //   left: player.left
      // })
      // console.log(lasers)
      // shoot()
    }
  }

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

  // function shoot() {
  //   let laser = document.createElement('div')
  //   laser.className = 'laser'
  //   for (let i = 0; i < lasers.length; i ++) {
  //     // laser.innerHtml = `<div class='laser' style:'left:${lasers[i].left}px'></div>`
  //     laser.top = 600
  //     laser.right = 550
  //     console.log('worked')
  //   }
  // }

})
