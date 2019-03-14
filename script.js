const cards = document.querySelectorAll('.memory-card');
let overlays = Array.from(document.getElementsByClassName('overlay-text'));
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timer = document.getElementById('time');
let ticker = document.getElementById('flips');
let matchedCards = [];
let totalClicks = 0;
let totalTime = 0;

cards.forEach(card => card.addEventListener('click', flipCard));
overlays.forEach(overlay => {
	overlay.addEventListener('click', () => {
		overlay.classList.remove('visible');
		startNewGame();
		});
});

function flipCard () {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.add('flip');
	totalClicks++;
	ticker.innerText = totalClicks;
	console.log(totalClicks);

	if (!hasFlippedCard) {
		hasFlippedCard = true;
		firstCard = this;

		return;
	}

	hasFlippedCard = false;
	secondCard = this;

	checkForMatch()
	
}

function checkForMatch() {
	let isMatch = firstCard.dataset.framework === secondCard.dataset.framework 
		
	isMatch ? hideCards() : unflipCards()
}

function hideCards() {
	firstCard.removeEventListener('click',flipCard);
	secondCard.removeEventListener('click',flipCard); 

	matchedCards++;
    matchedCards++;
    lockBoard = true;
	setTimeout(() => {
		firstCard.classList.add('hide');
		secondCard.classList.add('hide');

		resetBoard();
	}, 500);

	if (matchedCards === 32) victory();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		resetBoard();
	}, 850);
}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null];
}

function victory() {
	document.getElementById('victory-text').classList.add('visible');
}
function startTimer() {
	setInterval (function() {
	timer.innerHTML = totalTime++;
	}, 1000);
}

function startNewGame() {
	matchedCards = [];
	totalClicks = 0;
	ticker.innerText = totalClicks;
	totalTime = 0;
	cards.forEach(card => card.classList.remove('hide'));
	cards.forEach(card => card.classList.remove('flip'));
	cards.forEach(card => card.addEventListener('click', flipCard));
	startTimer();
}
(function shuffle() {
	cards.forEach(card => {
		let randomPos = Math.floor(Math.random()*32);
		card.style.order = randomPos;
	})
})();
