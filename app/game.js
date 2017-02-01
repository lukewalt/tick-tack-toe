
$('.play').click(checkForWin)
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
    //let the next marker be an o
    currentPlayer = oImage;
    //set the player div to O
    $(".playerMarker").html("<h1>It is O's turn</h1>")
  } else {
    //let the next marker be an x
    currentPlayer = xImage;
    //set the player div to X
    $(".playerMarker").html("<h1>It is X's turn</h1>")
  }
}

//will have to have a feed from firebase as input
function checkForWin() {

  var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  var winingIndex = -1;

  // if (winingIndex !== -1) {
  //   // announce winner
  // } else if (moves === 9 ) {
  //   // announce tie
  // } else {
  //   // switch player
  // }

    for (var i = 0; i < winCombinations.length; i++) {
      let matchesFound = 0;
      for (var j = 0; j < winCombinations[i].length; j++) {
        console.log(matchesFound);
        if ($.inArray(winCombinations[i][j], player1) !== -1) {

          matchesFound += 1;
          // console.log(winCombinations[i][j]);
        }
      }
      if (matchesFound === 3) {
        console.log('declare winner');
        break
      }
    }

    // console.log();
    // if (player1 === possibleWin) {
    //
    // } else {
    //
    // }

