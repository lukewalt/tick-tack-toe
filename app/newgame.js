// images for game pieces

const xImage = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/black-ink-grunge-stamps-textures-icons-alphanumeric/068726-black-ink-grunge-stamp-textures-icon-alphanumeric-x-solid.png"
const oImage ="http://www.drodd.com/images14/o25.png"
const emptySquare = "http://1.bp.blogspot.com/-jJUO43k6ReU/T7ivfcr4fgI/AAAAAAAAQqU/8YdJwPwT4OE/s1600/transparent.png"
//local reference for firebase data
let whoseTurn;
let gameover;
var plays;
//hide the playagain button


// $(".playAgain").hide()



//on pageload, reset firebase array
firebase.database().ref("moves").set(["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"]);
//current player is x
firebase.database()
  .ref("currentPlayer").set("x");
//moves = zero
firebase.database()
  .ref("plays").set(0)

//game is not over
firebase.database()
.ref("gameover").set(false)


// //listen for change in the player on firebase on game start
// firebase.database()
//   .ref("currentPlayer")
//   .once("value")
//   .then(snap => snap.val())
//   .then((value)=>{
//     whoseTurn = value;
//     console.log("whoseTurn", whoseTurn)
//     //run, change image
//   })
//   //listens for set of gameover value at start
//   firebase.database()
//   .ref("gameover")
//   .once("value")
//   .then(snap => snap.val())
//   .then((value)=>{
//     gameover = value;
//     console.log("gameover", gameover)
//   })

//listen for change in the player on firebase on game start
firebase.database()
  .ref("currentPlayer")
  .once("value")
  .then(snap => snap.val())
  .then((value)=>{
    whoseTurn = value;
    console.log("whoseTurn", whoseTurn)
    //run, change image
  })
  //listens for set of gameover value at start
  firebase.database()
  .ref("gameover")
  .once("value")
  .then(snap => snap.val())
  .then((value)=>{
    gameover = value;
    console.log("gameover", gameover)
  })



//listens for change in moves array
firebase.database()
  .ref("moves")
  .on("value", setCurrentArray)

  function setCurrentArray(snap) {
    if(snap) {
      let val = snap.val()
      currentArray = val;
      //updates board to current array value
      updateBoard(val)
      console.log("currentArray", currentArray)
      //calls the check for win function

      checkForWin(val)

    }
  }
//listens for change in player in
firebase.database()
  .ref("currentPlayer")
  .on("value", setWhoseTurn)

  function setWhoseTurn(snap) {
    if(snap) {
      let val = snap.val()
      whoseTurn = val;
      console.log("whoseTurn", whoseTurn)
    }
  }

//listens for change in gameover
firebase.database()
  .ref("gameover")
  .on("value", setGameOver)

  function setGameOver(snap) {
    if(snap) {
      let val = snap.val()
      gameover = val;
      console.log("gameover", gameover)
    }
  }
//listens for change in play count

firebase.database()
  .ref("plays")
  .on("value", setPlay)

function setPlay(snap){
    if(snap) {
      let val = snap.val()
      plays = val;
      console.log("plays", plays)

    }
  }



//event listeners on DOM
$("td").click(changeSquare) //calls function to change image

// $(".playAgain").click(playAgain)


function changeSquare(evt) {
  console.log("I've been clicked")
  //resets the image of the clicked on square to new value
   let clickedSquare = evt.target
   //captures data position of clicked target
   let squarePosition = parseInt(evt.target.closest('td').dataset.position);

   //if valid array, update firebase
   if(clickedSquare.src === emptySquare && gameover !== true) {
    //adds data position to array that stores the players choices
   firebase.database().ref("moves").update({ [squarePosition] : whoseTurn})
   //add play to count of plays
   let newPlayCount = (plays + 1)
   firebase.database().ref("plays").set(newPlayCount)

   //run the check for win function

  }
 }





// ------------------------ Check For Win ----------------------------

// firebase.database().ref("moves").on('value', checkForWin)

function checkForWin(snap) {
  let a = snap
  console.log("check for win", a);
  var wc = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],[1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  console.log("wc", wc)


  for(var i = 0; i < wc.length; i++) {
    console.log("wc[i]", wc[i])
    console.log("wc[i][0]", wc[i][0])

    console.log("values", a[wc[i][0]], a[wc[i][1]], a[wc[i][2]])
    if(a[wc[i][0]] !== "Z") {
      if ((a[wc[i][0]] === a[wc[i][1]]) && (a[wc[i][1]] === a[wc[i][2]])) {
        console.log("you win!!!")
        announceGameEnd("win")
        return
      }
    }
  }

  console.log("plays", plays);
  if (plays === 8) {
    console.log("tie");
    announceGameEnd();
    return
  }

  if(a !== ["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"]){
     changePlayers();
  }


  }












 //on the change player function
function updateBoard(array) {
  console.log("array", array)
  //for each value in the array
  for(var i = 0; i < array.length; i++) {
      //assign the array's value at that position to a var
    let arrayValue = array[i];
    let whichSquare = i;
    //if that value is an x
    if(arrayValue === "x") {
    //write the x image to the html img tag
      let imageSquare = `<img src=${xImage} width="150" height="150">`
     //update that square with the player's x image
      $(`td[data-position=${whichSquare}]`).html(imageSquare)
    //if that player is an oimage
    } else if(arrayValue === "o") {
      //write that  oimage to the html img tag
      let imageSquare = `<img src=${oImage} width="150" height="150">`
     //update that square with the player's  o image
      $(`td[data-position=${whichSquare}]`).html(imageSquare)
    }
    else {
      //write that   clear image to the html img tag
      let imageSquare = `<img src=${emptySquare} width="150" height="150">`
     //update that square with the player's  o image
      $(`td[data-position=${whichSquare}]`).html(imageSquare)
    }
  }

}

function changePlayers() {
   if (whoseTurn === "x") {
    //if it's x, change to o
    firebase.database().ref("currentPlayer").set("o");
    //change the play marker
    $(".playerMarker").html("<h1>It is O's turn</h1>")
   } else {
    //else if it's o, change to x
    firebase.database().ref("currentPlayer").set("x");
    //change the play marker
    $(".playerMarker").html("<h1>It is X's turn</h1>")
   }
}


function changeBanner() {
  if (whoseTurn === "x") {
    //if it's x, change to o
    //change the play marker
    $(".playerMarker").html("<h1>It is O's turn</h1>")
   } else {
    //else if it's o, change to x
    //change the play marker
    $(".playerMarker").html("<h1>It is X's turn</h1>")
   }
}

function announceGameEnd(message) {
  //set the gameover value to true

  firebase.database().ref("gameover").set(true)
  //if the current player = x, x is winner, else o is winner
  let winner = (whoseTurn === "x") ? "X" : "O"
  let announcement = `<h1>${winner} won!</h1>`
  if (message === "win") {
    //announce winner
    $(".playerMarker h1").html(announcement)
    //show play again button
    $(".playAgain").show()
    console.log("got here");
  } else {
    console.log(plays, 'tie');
    $(".playerMarker").html("<h1>It's a draw!</h1>")
  }

}


// function playAgain() {
//   //resets firebase

//   // reset firebase array
//   firebase.database().ref("moves").set(["Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z", "Z"]);
//   //current player is x
//   firebase.database()
//     .ref("currentPlayer").set("x");
//   //moves = zero
//   firebase.database()
//     .ref("plays").set(0)

//   //game is not over
//   firebase.database()
//     .ref("gameover").set(false)

//     $(".playAgain").hide()

//   //make sure current first player is x,
//   if(whoseTurn !== "x") {
//     changePlayers()
//   }

// }
