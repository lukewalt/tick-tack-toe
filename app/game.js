// game starts with player X


const xImage = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/black-ink-grunge-stamps-textures-icons-alphanumeric/068726-black-ink-grunge-stamp-textures-icon-alphanumeric-x-solid.png"
const oImage ="http://www.drodd.com/images14/o25.png"
const emptySquare = "http://1.bp.blogspot.com/-jJUO43k6ReU/T7ivfcr4fgI/AAAAAAAAQqU/8YdJwPwT4OE/s1600/transparent.png"

//the game starts with player x
let currentPlayer = xImage


//on click of square,
  //setup click events
  $("td").click(changeSquare) //calls function to change image





function changeSquare(evt) {
  //resets the image of the clicked on square to new value
   let clickedSquare = evt.target
     //if a square isn't empty, don't allow change
  //if the square is empty
   if(clickedSquare.src === emptySquare) {
    //assign it a new image
    //changes image to the player's image
    clickedSquare.src = currentPlayer
    //switches turn to other player
    changePlayer();
   }
//checks for game win
}


//change player
function changePlayer() {
  //if the current player is x, flip to o, otherwise, flip to x
  if (currentPlayer === xImage) {
    currentPlayer = oImage;
  } else {
    currentPlayer = xImage;
  }
}
