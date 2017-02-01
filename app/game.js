
$('.play').click()


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
   //captures data position of clicked target
   let squarePosition = parseInt(evt.target.closest('td').dataset.position);
   //adds data position to array that stores the players choices



  //if the square is empty and the game is still going allow changes
   if(clickedSquare.src === emptySquare && gameover !== true) {
    //assign it a new image
    //changes image to the player's image
    clickedSquare.src = currentPlayer

    writeArray(squarePosition)

    checkForWin(playerX)
    //switches turn to other player
    changePlayer();

   }
//checks for game win
}

let playerX = [];
let playerO = [];
//takes event target from squarechange
function writeArray(squarePosition){

  //checks who current player is
  if (currentPlayer === xImage) {
    //pushes target value to array
    playerX.push(squarePosition)
    firebase.database().ref("playerX").push(squarePosition)
      .then((e)=> {console.log(e)})
    console.log("playerX", playerX);
  } else {

    playerO.push(squarePosition)
    firebase.database().ref("playerO").push(squarePosition)
    .then((e)=> {console.log(e)})
    console.log("playerO", playerO);
  }
}

//change player
function changePlayer(squarePosition) {
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

// ------------------------ Check For Win ----------------------------
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
        if ($.inArray(winCombinations[i][j], playerX) !== -1) {

          matchesFound += 1;
          // console.log(winCombinations[i][j]);
        }
      }
      if (matchesFound === 3) {
        console.log('declare winner');
        announceGameEnd("win")
        firebase.database().ref("playerX").remove()
        firebase.database().ref("playerO").remove()
        break
      }
    }
}

    // console.log();
    // if (player1 === possibleWin) {
    //
    // } else {
    //
    // }
//as long as the game is still on, gameover = false
let gameover = false;

function announceGameEnd(message) {
  //set the gameover value to true
  gameover = true;
  //if the current player = x, x is winner, else o is winner
  let winner = (currentPlayer === xImage) ? "X" : "O"

  if (message === "win") {
    $(".playerMarker").html(`<h1>${winner} won!</h1>`)
  } else {
    $(".playerMarker").html(`<h1>It's a draw!</h1>`)
  }

}


function updateBoard(array, player) {
  //for each value in the array
 for(var i = 0; i < array.length; i++) {
      //assign the array's value at that position to a var
    let arrayValue = array[i];
    //display the correct image for the corresponding player
    let playerImage = player
    //write that image to the html img tag
    let imageSquare = `<img src=${playerImage} width="150" height="150">`
     //update that square with the player's image
    $(`td[data-position=${arrayValue}]`).html(imageSquare)
  }

}

updateBoard(playerX, currentPlayer)
