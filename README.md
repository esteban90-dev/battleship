# Battleship

This is the [Battleship project](https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript/lessons/battleship) from 
[The Odin Project's](https://www.theodinproject.com/) [Javascript Course](https://www.theodinproject.com/paths/full-stack-ruby-on-rails/courses/javascript).

The purpose of this project was to gain experience using the [Jest](https://jestjs.io/) testing framework.

## Object Design

1. The ship factory object exists to create ships that track ship damage and report whether or not the ship has been sunk.  
2. The board object, which contains ship objects, exists to keep track of ship positions and report if all ships on the board have been sunk. There are two board objects - the computer board and the human board. 
3. The computer player object takes a board object and makes an attack that is sent to the human board object.  The computer player's attack() method can either be intelligent, where it chooses attack coordinates close to an existing attack, or not, where it randomly chooses attack coordinates.  
4. The display object keeps is responsible for updating the UI and forwarding UI events to the game controller. 
5. The game controller object takes a display object, a computer player, and a human board object.  The game controller manages initial ship placement, keeps track of whose turn it is, and announced a winner at the end of the game.  The game controller object permitted the separation of presentation (display object) from the data (computer player, board objects). 

## Testing Approach

1. The ship factory, board objects, and computer player objects have unit tests that were all written in a test driven development (TDD) manner.  
2. The game controller and display objects, due to their complexity, were tested manually by playing the game.  Manual tests verified the appearance of the UI, that the game could be played on easy or hard mode, that various ship configurations could be placed on the board, and that both types of winner (human or computer) were announced at the end of the game.  

Ship placement is done via drag and drop, so the game is best played on a computer with a mouse.  

See it live [here.](https://esteban90-dev.github.io/battleship/)