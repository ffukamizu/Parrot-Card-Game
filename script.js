//asks the user for the deck size to be played
let deckSize = 0;
do {
  deckSize = prompt("Insira a quantidade de cartas que deseja jogar, entre 4 e 14 (Números pares apenas)");
} while (deckSize < 4 || deckSize > 14 || deckSize % 2 != 0);
//creates an array with all the possible faces
const deckStack = ["parrot-bob", "parrot-explody", "parrot-fiesta", "parrot-metal", "parrot-captain", "parrot-triplet", "parrot-unicorn"];
//Fisher-Yates random sorting algorithm
for (let i = deckStack.length - 1; i > 0; i--) {
  let j = Math.floor(Math.random() * (i + 1));
  let k = deckStack[i];
  deckStack[i] = deckStack[j];
  deckStack[j] = k;
}
//array with the desired deck size
const deckPlayed = deckStack.splice(0, deckSize / 2);
//display all selected cards
for (let i = 0; i < deckPlayed.length; i++) {
  let element = document.getElementsByClassName(deckPlayed[i]);
  for (let i = 0; i < element.length; i++) {
    element[i].classList.add("card-played");
  }
}
//Fischer-Yates shuffle function
function shuffle(array) {
  let i = array.length, k, j;
  while (0 !== i) {
    j = Math.floor(Math.random() * i);
    i -= 1;
    k = array[i];
    array[i] = array[j];
    array[j] = k;
  }
  return array;
}
//shuffles children back to the parent <div> randomized
const container = document.querySelector(".game-container");
const children = [...container.children];
shuffle(children);
for (const child of children) {
  container.appendChild(child);
}
