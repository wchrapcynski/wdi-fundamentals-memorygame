var score = 0;
var cards = [
  {
    rank: "queen",
    suit: "hearts",
    cardImage: "images/queen-of-hearts.png"
  },
  {
    rank: "queen",
    suit: "diamond",
    cardImage: "images/queen-of-diamonds.png"
  },
  {
    rank: "king",
    suit: "hearts",
    cardImage: "images/king-of-hearts.png"
  },
  {
    rank: "king",
    suit: "diamond",
    cardImage: "images/king-of-diamonds.png"
  },
];
var cardsInPlay = [];
var notification = document.getElementById('notification');
var board = document.getElementById('game-board');

function checkForMatch() {
  if(cardsInPlay[0] === cardsInPlay[1]) {
    notification.innerText = "You found a match!"
    score += 1;
    var scoreDisplay = document.getElementById('score');
    scoreDisplay.innerText = score;
  } else {
    notification.innerText = "Sorry. Try again."
  }
}

function flipCard() {
  if(cardsInPlay.length < 2) {
    cardId = this.getAttribute('data-id');
    console.log("User flipped " + cards[cardId].rank);
    console.log(cards[cardId].cardImage)
    console.log(cards[cardId].suit)
    cardsInPlay.push(cards[cardId].rank);
    this.setAttribute('src', cards[cardId].cardImage);
    this.removeEventListener('click', flipCard);
  }
  if(cardsInPlay.length === 2) {
    checkForMatch();
  }
}

function createBoard() {
  for (var i = 0; i < cards.length; i++) {
    var cardElement = document.createElement('img');
    cardElement.setAttribute('src','images/back.png');
    cardElement.setAttribute('data-id', i);
    cardElement.addEventListener('click', flipCard);
    board.appendChild(cardElement);
  }
}

cards = shuffle(cards);
createBoard();

var resetButton = document.getElementsByTagName('button')[0];
resetButton.addEventListener('click', reset);

function reset() {
  if(cardsInPlay.length >= 2) {
    board.innerHTML = "";
    notification.innerText = "Pick two cards."
    while(cardsInPlay.length > 0) {
      cardsInPlay.pop();
    }
    cards = shuffle(cards);
    createBoard();
    } else if (cardsInPlay.length === 1) {
    notification.innerText = "You need to pick another card.";
    } else {
    notification.innerText = "The game is already reset. Pick two cards.";
  }
}

function shuffle(array) {
    var counter = array.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
    return array;
}
