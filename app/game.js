
// WELCOME
$('document').ready(()=>{
  console.log("Welcome to Tick Tack Toe");
})

var player1 = [2, 5, 8];



$('.play').click(checkForWin)




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


}
