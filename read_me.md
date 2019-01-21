# General Assembly Project 1 : Simple front-end game

### Timeframe
7 days

### Technologies Used
* JavaScript (ES6)
* HTML5 + HTML5 Audio
* CSS
* GitHub

### Installation

1. Clone or download the repo
1. Open the `index.html` in your browser of choice

### My Game - Space Invaders

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

2. Once the 'Play' button is click, the game grid will appear with the player positioned bottom-centre and aliens in formation at the top. They will begin to descend, with a randomly selected alien shooting at a randomly generated interval. If the player is shot by an alien laser, the player icon flashes for a couple of seconds. If one of the aliens is shot, an explosion animation is run and the alien is removed from the grid. At the bottom of the screen is a section displaying the current level, the amount of aliens left in the wave and the number of player lives remaining.

![screenshot 2019-01-13 at 21 48 07](https://user-images.githubusercontent.com/43914382/51091046-faa4d200-177c-11e9-971d-989153c6abd0.png)

CHANGE THIS FOR PIC WITH EXPLOSION, LASER AND ROCKET IN

3. Once the player has wiped out a wave of aliens, a screen is displayed for a couple of seconds which shows what level the player is progressing to. Once this screen disappears, the game will display again with the player repositioned to bottom-centre and a fresh wave of aliens will begin to descend.

![screenshot 2019-01-13 at 21 57 49](https://user-images.githubusercontent.com/43914382/51091150-502dae80-177e-11e9-8beb-f1205d1a39e8.png)

4. The player attempts to wipe out as many aliens as possible with the waves get progressively more difficult. The higher the level, the faster the aliens move, the more frequently they shoot, and the more points the player gets for each alien shot. The games ends when the player runs out of lives or when the aliens reach the bottom of the screen. The manner in which the game ends and the level which the player reaches effects the comments that are displayed on the end screen. At this point the player has the option to play again by pressing the 'Play again' button.

![screenshot 2019-01-13 at 22 52 29](https://user-images.githubusercontent.com/43914382/51091734-67709a00-1786-11e9-9260-6ce474dbc492.png)


## Process

The starting point for this game was to create a twenty by twenty grid. This was created through a for loop which created an individual div on each iteration. The aliens were created in separate arrays for each row, with the starting index passed into the function as an argument. The aliens and the player were created by applying classes to the elements within the grid. When either is moved, their class is removed from the cell of their current position and applied to the cell they are moving to.

 which the aliens would begin to descend, with the player placed on the second-to-last line from the bottom of the grid

The next step was to generate the aliens and to have them move to the side of the grid until they hit the boundary. Once an alien reached the edge of the grid, they all needed to shift down a level before starting to move to the opposite edge. To do this, I created a setInterval which caused  the aliens default direction was set to 'right' and changeDirection variable was set to 'false'. If an alien reached the side of the grid, the change direction would be set to 'true', instigating a loop which would move the alien down a level before setting the direction to the opposite of what it was. The changeDirection variable would revert back to 'false' and the aliens would start to move across the grid again.

The next step was to have the aliens shoot at a randomly generated interval. To do this I created a function, again called at a set interval, which generated a random number between 0 and 1. If this number was less than 0.5, a randomly selected alien would fire a laser.

Since there were multiple setInterval functions happening at the same time, I created a game loop which would run multiple functions at once, such as generating the movement of the aliens, checking whether they had reached the edge of the grid and checking whether the win or lose conditions had been met. The higher the difficulty level, the quicker the game loop would run, causing the aliens to move faster and to shoot more frequently

The players movement and shoot functions were controlled with an event listener on the left key, right key and spacebar. The laser and rocket positions were pushed into arrays and collision detection functions were set up to continuously check whether any projectile occupied the same div as the player or alien. If the player was struck, a life would be lost and the player icon would blink for a few seconds. If an alien was struck by a player rocket, the alien would be removed from the array and a sprite sheet explosion would be activated with an accompanying sound effect.

If a wave of aliens were wiped out the win condition was met, causing the level screen to pop up for a couple of seconds. The grid would be cleared of all classes, a new wave of aliens would be generated and the player icon would be repositioned in the starting position. The game loop speed would also be increased, causing the aliens to move faster and shoot more frequently. If the player lost all of their lives or if the aliens reached the bottom of the grid, the end screen would appear with a personalised comment and along with a 'play again' button. The comments on the end screen and the accompanying audio vary depending on what level the player reached and the manner in which the game ended.




## Process

The starting point for this game was creating the basic grid layout on which the submarine could move. This was created by a list of 'div's in the HTML. Each cell within the grid was an individual element. These cells are nestled within a container. The submarine, and fish were created by applying classes to the elements within the grid. When the submarine or fish is moved, their class is removed from the cell of their current position and applied to the new cell.

I created fish as objects which contain their points value, an array of their movement patterns, their age and the class which is being applied to the cell that they are in. The class relates to a css class with a corresponding background image of the fish type. When a fish is created it is added to an array of fish in play.

While the game is running, a function runs through the array of fish in play and moves each fish the corresponding amount within their movement patterns.

A function was also created which checks if a fish has been caught. This runs through the array of fish in play to check if its location is the same as that of the submarine. If it has been caught, it is removed from the array of fish in play and its corresponding points value to added to the player's score.

Once I had this mechanics working, I worked on adding a timer countdown which displayed as an air supply within the player's air tank. The height of the air supply element is a proportion of the amount of time left.

I then moved onto the task of allowing the position of the submarine to control the scrolling of the grid. This also required stoping the default behaviour of controls to prevent the user from scrolling through the grid to a position where the submarine was not visible.

As the game continued to develop I created a fish constructor function which created the fish objects and also contained the method which allowed the fish to move. I had initially also created a method which allowed the fish, when they were caught or swam off screen, to be removed from the fish in played array and remove their classes from the grid. However, I later changed this to a key within the fish object which specified whether the fish was active or not. During the game, a function now runs through the array of fish in play and removes any fish which have been set to no longer active.

The final significant element was creating a variable which specified whether the submarine was at the top of the surface when the air supply had reached zero. I created a modal with content which varied depending on whether the player had returned to the surface by the end of the game.

### Challenges

This game involves quite a lot of different things going on at the same time. It was a challenge to make sure the gaming mechanics were being being timed correctly. It was also important that I created code logic that could cope with expanding numbers of different fish characters in play at the same time.

There were several tricky tasks including the scrolling of the grid being controlled by the submarine and the animation of the fish.

### Wins

Creating cascading animations and sounds really helped the game come alive and gave me more creative control over the feel of the play. I invested a lot of time in the stying of the game, particularly the animations and air supply tank to give them a consistent and professional feel. I was particularly pleased with my 'Fish' constructor function which I then used to randomly generate different fish.

![Fish constructor function from app.js](https://user-images.githubusercontent.com/40343797/50378462-b7968980-062a-11e9-95b7-54e358bfb320.png)


When fish were created, they were added to an array of 'fishInPlay'. I was then able to call this function every 200 milliseconds to move every fish on the board.

```
function moveFish(){

  fishInPlay.forEach(fish => fish.move());

} // moves every fish 1 position in their respective movementPatternArrays
```

## Future features

If I had more time, I would like to try and make the game playable on a touchscreen device. I would need to make a control panel that would appear on a touch device to replace the keyboard inputs.

Different levels could be added to the game with different patterns of mine positioning and different fish spawning at different depths.

I would also like to improve the animations of the submarine (such as adding animated bubbles when it is moving) and improving the animations of the fish, particularly in allowing them to move diagonally.
