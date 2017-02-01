
// WELCOME
$('document').ready(()=>{
  console.log("Welcome to Tick Tack Toe");
})

var player1 = [ 0, 3, 5, 6 ];

//will have to have a feed from firebase as input
function checkForWin(o) {

  var winCombinations = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
                           [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
  var winingIndex = -1;

  if (winingIndex !== -1) {
    return player1
  }

  $.each(winCombinations, (index, possibleWin) =>{
    $.forEach()
    if (player1 = possibleWin) {
      console.log(player1);
    } else {
    }
  })

}


$('.play').click(checkForWin)
