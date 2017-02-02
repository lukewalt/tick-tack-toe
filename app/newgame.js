// images for game pieces

const xImage = "http://cdn.mysitemyway.com/etc-mysitemyway/icons/legacy-previews/icons-256/black-ink-grunge-stamps-textures-icons-alphanumeric/068726-black-ink-grunge-stamp-textures-icon-alphanumeric-x-solid.png"
const oImage ="http://www.drodd.com/images14/o25.png"
const emptySquare = "http://1.bp.blogspot.com/-jJUO43k6ReU/T7ivfcr4fgI/AAAAAAAAQqU/8YdJwPwT4OE/s1600/transparent.png"

let whoseTurn;
let gameover;



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
      updateBoard(val)
      console.log("currentArray", currentArray)
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





$("td").click(changeSquare) //calls function to change image

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
   //add play to board visually

   //run the check for win function
  }
 }


 function checkForWin() {
   //if win, call the announce win function, clear the board
   //else, change the player
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

 //write the array to the screen
