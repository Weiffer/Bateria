//Initial Data
let square = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: '',
}
let turn = '';

let warning = '';

let playing = false;

reset();
//Events
document.querySelector('.reset').addEventListener('click', reset); 

document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
});

//Functions


function itemClick(event){ 
    let item = event.target.getAttribute('data-item');
    if(playing && square[item] === ''){
        square[item] = turn;
        renderSquare();
        togglePlayer();
    }
}

function reset(){ //Iniciar/Resetar o jogo
    warning = '';
    playing = true;


    let random = Math.floor(Math.random() *2);
    if(random ===0){
        turn = 'x';
    }
    else{
        turn = 'o';
    }

    for (let i in square){
        square[i] = '';
    }
    
    renderSquare();
    renderInfo();
}

function renderSquare(){ //Mostrar o 'x' e 'o' na tela
    for(let i in square){
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
    }

    checkGame();
}
 function renderInfo(){ //Mostrar o turno e o resultado ne tela
    document.querySelector('.vez').innerHTML = turn;
    document.querySelector('.resultado').innerHTML = warning;
 }

 function togglePlayer(){ //Trocar de turno
    if (turn === 'x'){
        turn = 'o';
    } else {
        turn = 'x';
    }
    renderInfo();
 }

 function checkGame(){  //Conferir se houve vencedor e determinar quem
    if(checkWinnerFor('x')){
        warning = 'O "x" VENCEU';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" VENCEU"';
        playing = false;
    } else if (isFull()){
        warning = 'Empate'
        playing = false;
    }
};

function checkWinnerFor(turn){
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];
    for (let w in pos){
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option => square[option] === turn);
        if (hasWon){
            return true;
        }

    }
    return false;
}

function isFull(){
    for(let i in square){
        if(square[i] ===''){
            return false;
        }
    }
    return true;
}