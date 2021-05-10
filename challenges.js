



/************************************
 * Coding challenge  1 - we go to the next player when the player rolls 6 twice. Then he also looses all his current points*/
// html main js file link commented, this provided! 







let scores, roundScore, activePlayer, gamePlaying;

init(); 

let lastDice

document.querySelector('.btn-roll').addEventListener('click',function(){

    if(gamePlaying){ // it is set up to 'true' by default
        //1. random number 
        let dice = Math.floor((Math.random() * 6)) + 1;  //gives us random number between 0 and 5, that is why we add 1

        //2. display the result 
        let diceDOM = document.querySelector('.dice');
        diceDOM.style.display= 'block';
        diceDOM.src= 'dice-' + dice + '.png';

        //3. Update the round score but only when the dice does not roll 1(then we loose all the points in the round)
        if(dice === 6 && lastDice === 6){
         //player looses score and next player activated
         scores[activePlayer]= 0;
         document.querySelector ('#score-' + activePlayer ).textContent = '0';
         nextPlayer();
        }
        if(dice !==1){
            //add the round score
        roundScore +=  dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }else {
            //NEXT PLAYER
            nextPlayer();
        }
        lastDice = dice;
    
    }
        
});


document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
        //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //Update the UI(interface) with the current score added to the global score
    document.querySelector ('#score-' + activePlayer ).textContent = scores[activePlayer];

    //check if the player won the game 
        if(scores[activePlayer] >=10){
            document.querySelector('#name-' + activePlayer).textContent='Winner!';
            document.querySelector('.dice').style.display ='none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else{
            nextPlayer();
        }
  }
});


document.querySelector('.btn-new').addEventListener('click', init); //callback function init();

function init() {
                    //reseting the game parameters
    scores= [0,0];
    activePlayer= 0;
    roundScore= 0;

    document.querySelector('.dice').style.display= 'none';
    document.getElementById('score-0').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-1').textContent='0';
    document.getElementById('name-0').textContent='Player 1';
    document.getElementById('name-1').textContent='Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    gamePlaying = true;
       
};


function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //ternary operator
    roundScore = 0;
    //reset the value in the interface
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    //assign active class in css to style active player
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    //hide the dice when the player hits 1
    document.querySelector('.dice').style.display="none";
            
}
