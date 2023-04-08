//asks the user for the deck size to be played
let deckSize = 0;
do {
  deckSize = prompt("Insira a quantidade de cartas que deseja jogar, entre 4 e 14 (Números pares apenas)");
} while (deckSize < 4 || deckSize > 14 || deckSize % 2 != 0);
//Fischer-Yates random sorting algorithm
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
//creates an array with all the possible faces
const deckStack = ["parrot-bob", "parrot-explody", "parrot-fiesta", "parrot-metal", "parrot-captain", "parrot-triplet", "parrot-unicorn"];
shuffle(deckStack);
//deckStack array spliced to form a new array with desired deck size
const deckPlayed = deckStack.splice(0, deckSize / 2);
//display all selected cards on screen
for (let i = 0; i < deckPlayed.length; i++) {
  const element = document.getElementsByClassName(deckPlayed[i]);
  for (let i = 0; i < element.length; i++) {
    element[i].classList.add("card-played");
  }
}
//shuffles all cards currently displayed
const gameContainer = document.querySelector(".game-container");
const children = [...gameContainer.children];
shuffle(children);
for (const child of children) {
  gameContainer.appendChild(child);
}
//when called will flip a card
function cardDisplay(element) {
  element.childNodes[1].classList.add("card-front-flip");
  element.childNodes[3].classList.add("card-back-flip");
}
let cardRevealed = false;
let lastElement = null;
let lastElementClass = null;
function cardSelector(element, elementClass) {
  //will reveal a card if no other is flipped
  if (cardRevealed === false) {
    cardDisplay(element);
    cardRevealed = true;
    lastElement = element;
    lastElementClass = elementClass;
    //reveals another card if its the same face
  } else if (cardRevealed === true && elementClass === lastElementClass && element !== lastElement) {
    cardDisplay(element);
    cardRevealed = false;
    //flips both cards back if they are the wrong pair
  } else if (cardRevealed === true && elementClass !== lastElementClass && element !== lastElement) {
    cardDisplay(element);
    cardRevealed = false;
    lastElementClass = null;
    //disables click event
    document.addEventListener("click", handler, true);
    function handler(e) {
      e.stopPropagation();
      e.preventDefault();
    }
    //flips all cards back and restores click event, 1 sec delay
    function cardHide() {
      element.childNodes[1].classList.remove("card-front-flip");
      element.childNodes[3].classList.remove("card-back-flip");
      lastElement.childNodes[1].classList.remove("card-front-flip");
      lastElement.childNodes[3].classList.remove("card-back-flip");
      document.removeEventListener("click", handler, true);
    }
    setTimeout(cardHide, 1000);
  } else {
    null;
  }
}
