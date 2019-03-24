# WDI-Project-01
JavaScript Game

# Space Invaders

### Timeframe
7 days

### Technologies Used
* JavaScript (ES6)
* HTML5 + HTML5 Audio
* CSS
* GitHub

### Play the game [here](http://michaelsimmonds.me/WDI-Project-01/)

### or

1. Clone or download the repo
2. Open the `index.html` in your browser of choice

### Game Overview
Space Invaders is a classic arcade game from the 80s. The player aims to shoot an invading alien armada before it reaches the planet's surface.

The player can only move left or right. The aliens also move from left to right, and also down each time the reach the side of the screen. The aliens also periodically shoot towards the player.

Once the player has destroyed a wave of aliens, another waved is generated at an increased difficulty level. The aim is to achieve the highest score possible before either being destroyed by the aliens or allowing them to reach the planet's surface.


### Controls
- Player movements: ← → keys
- Player shoot: Spacebar
- Start game: "Play" button

### Game Instructions
1. The game begins with a start screen which includes simple instructions and a 'Play' button . The game starts proper once the 'Play' button is clicked, or by pressing enter, since the button is auto-focused.

![screenshot 2019-01-13 at 21 41 45](https://user-images.githubusercontent.com/43914382/51090995-1b205c80-177c-11e9-89fd-20e438f7fa87.png)

2. Once the 'Play' button is click, the game grid will appear with the player positioned bottom-centre and aliens in formation at the top. They will begin to descend, with randomly selected aliens shooting at randomly generated intervals. If the player is shot by an alien laser, the player icon flashes for a couple of seconds. If one of the aliens is shot, an explosion animation is run and the alien is removed from the grid. At the bottom of the screen is a section displaying the current level, the amount of aliens left in the wave and the number of player lives remaining.

![screenshot 2019-03-08 at 11 06 30](https://user-images.githubusercontent.com/43914382/54025474-8db52380-4192-11e9-8c54-64f727be04d7.png)


3. Once the player has wiped out a wave of aliens, a screen is displayed for a couple of seconds which shows what level the player is progressing to. Once this screen disappears, the game will display again with the player repositioned to bottom-centre and a fresh wave of aliens will begin to descend.

![screenshot 2019-01-13 at 21 57 49](https://user-images.githubusercontent.com/43914382/51091150-502dae80-177e-11e9-8beb-f1205d1a39e8.png)

4. The player attempts to wipe out as many aliens as possible with the waves get progressively more difficult. The higher the level, the faster the aliens move, the more frequently they shoot, and the more points the player gets for each alien shot. The games ends when the player runs out of lives or when the aliens reach the bottom of the screen. The manner in which the game ends and the level which the player reaches effects the comments that are displayed on the end screen. At this point the player has the option to play again by pressing the 'Play again' button.

![screenshot 2019-01-13 at 22 52 29](https://user-images.githubusercontent.com/43914382/51091734-67709a00-1786-11e9-9260-6ce474dbc492.png)


## Process

The starting point for this game was to create a twenty by twenty grid which was created by cycling through a loop to create an individual div on each iteration. The aliens were created in separate arrays for each row, with the starting index passed into the function as an argument. The aliens and the player were created by applying classes to the divs within the grid. When either is moved, their class is removed from the cell of their current position and applied to the cell they are moving to.

The next step was to generate the alien movement on a setInterval function. Once an alien reached the edge of the grid, they all needed to shift down a level before starting to move in the opposite direction. I set the defualt alien movement direction to 'right' and the changeDirection variable was set to 'false'. If an alien reached the side of the grid, the changeDirection variable would be set to 'true', instigating a loop which would move the alien down a level before setting the direction to the opposite of what it was. The changeDirection variable would revert back to 'false' and the aliens would start to move across the grid again.

After this, I made a function called at a setInterval which generated a random number between 0 and 1. If this number was less than 0.5, a randomly selected alien would fire a laser. The laser was simply a class being attached to a div which would descend the grid on a rapid set interval. The player rocket acted on the same principal, but was actived when the player pressed the space bar.

Since there were multiple setInterval functions happening at the same time, I created a game loop which would run multiple functions at once, such as generating the movement of the aliens, checking whether they had reached the edge of the grid and checking whether the win or lose conditions had been met. The higher the difficulty level, the faster the game loop would run, thus causing the aliens to move more quickly and to shoot more frequently.

The player's movement and shoot functions were controlled with an event listener on the left key, right key and spacebar. The laser and rocket positions were pushed into arrays and collision detection functions were set up to continuously check whether any projectile occupied the same div as the player or alien. If the player was struck, a life would be lost and the player icon would blink for a few seconds. If an alien was struck, the alien would be removed from the array, it's class would be removed from the grid and a sprite sheet explosion would be activated with an accompanying sound effect.

I created two functions which would check if the player had won or lost. If all the aliens on the level were destroyed, the win condition would be met so the grid would be cleared of all classes and all arrays would be emptied. After a level screen had appeared for a couple of seconds, a new wave of aliens would be generated and the player icon would be set to the starting position. The game loop set interval function speed would be increased, causing the aliens to move faster and shoot more frequently. If the player lost all of their lives or if the aliens reached the bottom of the grid, the end screen would appear with a personalised comment and along with a 'play again' button. The comments on the end screen and the accompanying audio vary depending on what level the player reached and the manner in which the game ended.


### Challenges

This game involves quite a lot of different things going on at the same time. It was a challenge to make sure the gaming mechanics were being being timed correctly, as it was possible for collisions to be missed if the the lasers were travelling faster than the collision checks were being run. 

### Wins

One of the biggest wins of the game was integrating lots of the smaller functions into a gameloop, which ensured that the different parts of the game were happening in sync with each other.

```
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
```

## Future features

If I had more time, I would like to implement a local storage device so the players could compete against their friends and their own top score. I would also like to create my aliens using Classes. This would enable me to style the rows of aliens differently and give some of them a higher point value than others.

I would also like to add a mothership alien which would appear at the top of the screen at randomly generate intervals.
