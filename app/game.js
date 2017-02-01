// game starts with player X


const xImage = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/black-ink-grunge-stamps-textures-icons-alphanumeric/068726-black-ink-grunge-stamp-textures-icon-alphanumeric-x-solid.png"
const oImage ="http://www.drodd.com/images14/o25.png"
const emptySquare = "http://1.bp.blogspot.com/-jJUO43k6ReU/T7ivfcr4fgI/AAAAAAAAQqU/8YdJwPwT4OE/s1600/transparent.png"

//on click of square,
  //setup click events
  $("td").click(changeSquare) //calls function to change image
  //listen for changes
  //if a square isn't empty, don't allow change

//changes image to the player's image
//switches turn to other player
function changeSquare(evt) {
  //resets the image of the clicked on square to new value
   let clickedSquare = evt.target
  //if the square is empty
   if(clickedSquare.src === emptySquare) {
    //assign it a new image
    clickedSquare.src = xImage
   }
}
//checks for game win
