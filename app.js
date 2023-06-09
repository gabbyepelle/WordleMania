import { WORDS} from "./words.js";


const row1 = document.querySelector('.row-1').querySelectorAll('.square');
const row2 = document.querySelector('.row-2').querySelectorAll('.square');
const row3 = document.querySelector('.row-3').querySelectorAll('.square');
const row4 = document.querySelector('.row-4').querySelectorAll('.square');
const row5 = document.querySelector('.row-5').querySelectorAll('.square');
const row6 = document.querySelector('.row-6').querySelectorAll('.square');
const reset = document.querySelector('#reset');
const squares = document.querySelectorAll('.square');


    
let answer = WORDS[Math.floor(Math.random()* WORDS.length-1)] ;
console.log(answer)   

const correctWord = document.querySelector('#correctWord');
correctWord.classList.toggle('hidden');


const board = {
    1: [...row1],
    2: [...row2],
    3: [...row3],
    4: [...row4],
    5: [...row5],
    6: [...row6]
}
//console.log(board[1])

let guess = "";
let chance = 1;
const keys = document.querySelectorAll('.key');
const enter = document.querySelector('#enter');
const del = document.querySelector('#delete');
const sleep = (time) => {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

const checkGuess = async function(){
    if(guess.length < 5){
        alert("Too Short!")
    }else{
        for(let i=0; i<=4; i++){
            await sleep(450)
            if(guess[i]===answer[i]){
                board[chance][i].classList.toggle('green')
                keys.forEach(key=>{
                    if(key.dataset.key === guess[i]){
                        key.classList.toggle("right")
                    }
                })

            }else if(answer.includes(guess[i])){
                board[chance][i].classList.toggle('yellow')
                keys.forEach(key=>{
                    if(key.dataset.key === guess[i]){
                        key.classList.toggle("almost")
                    }
                })
            }else{
                board[chance][i].classList.add('gray')
                keys.forEach(key=>{
                    if(key.dataset.key === guess[i]){
                        key.classList.toggle("wrong")
                    }
                })
            }   
        }
        if(guess===answer){
            gameOver()
        }else{
            chance+=1
            guess = ""
    
        }
        if(chance > 6){
            gameOver()
        }
    
    }
}

const deleteLetter = function(){
    for(let i=4; i>=0; i--){
        if(board[chance][i].textContent.trim()!==""){
            board[chance][i].textContent = ""
            break
        }
    }
}


keys.forEach((key)=>{
    key.addEventListener('click', ()=>{
        //console.log(key.dataset.key)
        guess+=key.dataset.key
        console.log(guess)
        for(let i=0; i<5; i++){
            if(board[chance][i].textContent.trim()===""){
                board[chance][i].textContent = key.dataset.key
                break
            }
        }

        })
    })

del.addEventListener('click', deleteLetter)

const gameOver = function(){
    //disable all buttons
    //if word is wrong show correct word
    if(guess !== answer){
        correctWord.textContent = `The word is ${answer}`;
    }
    else{
        correctWord.textContent = "Superb!"
    }
        correctWord.classList.toggle('hidden')
        keys.forEach((key)=>{
            key.disabled = true;
        })
        enter.disabled = true;
        del.disabled = true;
        
        reset.classList.toggle('hidden');
}



reset.addEventListener('click', ()=>{
    keys.forEach((key)=>{
        key.classList.toggle('wrong')
        key.classList.toggle('almost')
        key.classList.toggle('right')
        key.disabled = false;
    })
    enter.disabled = false;
    del.disabled = false;
    guess = ""
    chance = 1;
    let answer = WORDS[Math.floor(Math.random()* WORDS.length-1)] ;
    correctWord.textContent = `The word is ${answer}`;
    correctWord.classList.toggle('hidden')
    reset.classList.toggle('hidden');
    //remove all green, yellow, and grey classes from squares
    for (let square of squares){
        square.textContent = "";
        square.classList.remove('green')
        square.classList.remove('yellow')
        square.classList.remove('gray')
    }


})
enter.addEventListener('click', checkGuess)




//enabling keyboard input
const alphabet = "abcdefghijklmnopqrstuvwxyz"
document.addEventListener('keyup', (e)=>{
    if (alphabet.includes(e.key) ||alphabet.toUpperCase().includes(e.key)){
        guess+=e.key
        for(let i=0; i<5; i++){
            if(board[chance][i].textContent.trim()===""){
                board[chance][i].textContent = e.key;
                break
            }
        }
    }else if(e.key === "Enter"){
        checkGuess()
    }else if(e.key === "Backspace"){
        deleteLetter()
    }
})

//TODO
//add CSS animations for winner
//change add/remove to toggle