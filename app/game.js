

const xImage = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/black-ink-grunge-stamps-textures-icons-alphanumeric/068726-black-ink-grunge-stamp-textures-icon-alphanumeric-x-solid.png"
const oImage ="http://www.drodd.com/images14/o25.png"
const emptySquare = "http://1.bp.blogspot.com/-jJUO43k6ReU/T7ivfcr4fgI/AAAAAAAAQqU/8YdJwPwT4OE/s1600/transparent.png"

let playerX = [];
let playerO = [];
let count = 0;



$('.play').click()
//the game starts with player x
  //written on firebase
firebase.database().ref("currentPlayer").set("x")
  //written locally for image
let currentPlayer = xImage;
  //written locally for array
let currentArray = playerX;

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

    if(currentPlayer === xImage) {
      firebase.database().ref("playerX").push(squarePosition)
      .then((e)=> {console.log(e)})
    console.log("playerX", playerX);
  } else {
    firebase.database().ref("playerO").push(squarePosition)
    .then((e)=> {
      console.log(e)
    })
    console.log("playerO", playerO);

  }



    //assign it a new image
    //changes image to the player's image
    // clickedSquare.src = currentPlayer

    // writeArray(squarePosition)

    // checkForWin(currentPlayer, currentArray)
    //switches turn to other player
    count += 1
    console.log('count', count);

   }
//checks for game win
}


//takes event target from squarechange
function writeArray(squarePosition){

  //checks who current player is
  if (currentPlayer === xImage) {
    //pushes target value to array
    playerX.push(squarePosition)
    // firebase.database().ref("playerX").push(squarePosition)
    //   .then((e)=> {console.log(e)})
    // console.log("playerX", playerX);

  } else {

    playerO.push(squarePosition)
    // firebase.database().ref("playerO").push(squarePosition)
    // .then((e)=> {
    //   console.log(e)
    // })
    // console.log("playerO", playerO);

  }
checkForWin()
}

//change player
function changePlayer() {
  //if the current player is x, flip to o, otherwise, flip to x
  debugger

  if (currentPlayer === xImage) {
    //let the next marker be an o
    currentPlayer = oImage;
    currentArray = playerO;
    //set the player div to O
    $(".playerMarker").html("<h1>It is O's turn</h1>")
    // firebase.database().ref("currentPlayer").set("o")
  } else {
    //let the next marker be an x
    currentPlayer = xImage;
    currentArray = playerX;
    //set the player div to X
    $(".playerMarker").html("<h1>It is X's turn</h1>")
    // firebase.database().ref("currentPlayer").set("x")
  }


}

function changeFirebasePlayer() {
  if (currentPlayer === xImage){
    firebase.database().ref("currentPlayer").set("o")
  } else {
    firebase.database().ref("currentPlayer").set("x")
  }
}




// ------------------------ Check For Win ----------------------------
//will have to have a feed from firebase as input
function checkForWin() {

  var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  var winingIndex = -1;

    for (var i = 0; i < winCombinations.length; i++) {
      let matchesFound = 0;
      for (var j = 0; j < winCombinations[i].length; j++) {

        // console.log(matchesFound);
        if ($.inArray(winCombinations[i][j], currentArray) !== -1) {


          matchesFound += 1;
          // console.log(winCombinations[i][j]);
        }
      }
      if (matchesFound === 3) {
        console.log('declare winner');

        clearFirebaseValues()

        winingIndex = matchesFound

        break
      }

    }

    if (winingIndex !== -1) {
        announceGameEnd("win")
    } else if (count === 8) {
        announceGameEnd()
    } else {
        changeFirebasePlayer();
    }
}


function clearFirebaseValues() {
  firebase.database().ref("playerX").remove()
  firebase.database().ref("playerO").remove()
  firebase.database().ref("currentPlayer").remove()
}

    // console.log();
    // if (playerX === possibleWin) {
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
    $(".playerMarker h1").html(`${winner} won!`)
    console.log("got here");
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



//when player X moves
function onXPlayerMove(snap) {
  debugger
  //if there is a new square
  if(snap){
    //let that square value equal the data-position attribute
    let whichSquare = snap.val();
    writeArray(whichSquare)
    //write that image to the html img tag
    let imageSquare = `<img src=${xImage} width="150" height="150">`
     //update that square with the player's image
    $(`td[data-position=${whichSquare}]`).html(imageSquare)
  }

}

//when player O moves,
function onOPlayerMove(snap) {
  debugger
  //if there is a new square
  if(snap){
    //let that square value equal the data-position attribute
    let whichSquare = snap.val();
    writeArray(whichSquare)
    //write that image to the html img tag
    let imageSquare = `<img src=${oImage} width="150" height="150">`
     //update that square with the player's image
    $(`td[data-position=${whichSquare}]`).html(imageSquare)
  }

}


//listen for change in the array on firebase for playerX moves
firebase.database()
  .ref("playerX")
  .on("child_added", onXPlayerMove)

//listen for change in the array on firebase for playerO moves
firebase.database()
  .ref("playerO")
  .on("child_added", onOPlayerMove)
// //list for change in the value of the firebase for currentPlayer
firebase.database()
  .ref("currentPlayer")
  .on("value", changePlayer)





updateBoard(playerX, currentPlayer)
