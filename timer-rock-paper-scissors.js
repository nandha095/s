let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
};

updateScoreElement();
let isautoplaying = false;
let intervalid;
//const autoplay = ()=>{


//};
function autoplay(){
  if(!isautoplaying){
  intervalid = setInterval(()=>{
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isautoplaying = true
  } else {
    clearInterval(intervalid);
    isautoplaying = false;
  }
  
}
document.querySelector('.js-rock-button')
.addEventListener('click', ()=>{
  playGame('rock');
});

document.querySelector('.js-paper-button')
.addEventListener('click', ()=>{
  playGame('paper');
});

document.querySelector('.js-scissors-button')
.addEventListener('click', ()=>{
  playGame('scissors');
});

document.body.addEventListener('keydown',(event)=>{
  if (event.key === 'r'){
    playGame('rock');
  }else if(event.key === 'p'){
    playGame('paper');
  }else if(event.key === 's'){
    playGame('scissors');
  }
})

function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'rock') {
      result = 'you lose';
    } else if (computerMove === 'paper') {
      result = 'you win';
    } else if (computerMove === 'scissors') {
      result = 'tie';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'you win';
    } else if (computerMove === 'paper') {
      result = 'tie';
    } else if (computerMove === 'scissors') {
      result = 'you lose';
    }
  } else if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'tie';
    } else if (computerMove === 'paper') {
      result = 'you lose';
    } else if (computerMove === 'scissors') {
      result = 'you win';
    }
  }

  if (result === 'you win') {
    score.wins += 1;
  } else if (result === 'you lose') {
    score.loses += 1;
  } else if (result === 'tie') {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `
  You <img src="images/${playerMove}-emoji.png" class="move-icon" />
  <img src="images/${computerMove}-emoji.png" class="move-icon" /> Computer
`;

}

function updateScoreElement() {
  document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;
}

function resetScore() {
  score = { wins: 0, loses: 0, ties: 0 };
  localStorage.removeItem('score');
  updateScoreElement();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }

  return computerMove;
}