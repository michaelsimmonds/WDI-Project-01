document.addEventListener('DOMContentLoaded', () => {
  // const h1 = document.querySelector('h1')
  // // h1.textContent = 'Hello Word!'
  // const player = document.querySelector('.player')

  let player = {
    top: 600,
    left: 550
  }

  document.onkeydown = function(e) {
    if (e.keyCode === 37) {
      console.log('LEFT')
      player.left -= 10
    } else if (e.keyCode === 39) {
      console.log('RIGHT')
      player.left += 10
    }
    movePlayer()
  }

  function movePlayer() {
    document.querySelector('.player').style.left = player.left + 'px'
  }


})
