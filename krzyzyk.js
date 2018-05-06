var pola = [];
var yourTurn = false; // 0 stands for x, 1 stands for o
var xWins = 0;
var oWins = 0;
var endGame = 0;
var plansza = []; // 2 - x, 3 - o
var wygrany = "";
var moves = 0; // number of moves made during game
var lang = true; // false - pl

var langChange = document.querySelector('.lang-change');
langChange.addEventListener("click", function () { changeLanguage(); });
var restartBtn = document.getElementById('restart-game');
restartBtn.addEventListener("click", function() { restart(); });
var chooseCharacterBtn = document.querySelector('.o-border');
chooseCharacterBtn.addEventListener("click", function() { 
    
    if(moves == 0)
        yourTurn = true; 
    console.log("klik", moves, yourTurn);
});
                        
function setBoard() {
    //console.log(yourTurn);
    var html = "";
    
    for(var i = 0; i < 9; i++) {
        html += '<div id="p' + i + '" class="pole-gry"></div>';
        if((i +1) % 3 == 0)
            html += '<div style="clear: both"></div>';
    }
    document.getElementById('board').innerHTML = html;
    for(var i = 0; i < 9; i++) {
        pola[i] = "p" + i;
        pola[i] = document.getElementById('p' + i);
    }
    
    p0.addEventListener("click", function() { whichOne(0); });
    p1.addEventListener("click", function() { whichOne(1); });
    p2.addEventListener("click", function() { whichOne(2); });
    p3.addEventListener("click", function() { whichOne(3); });
    p4.addEventListener("click", function() { whichOne(4); });
    p5.addEventListener("click", function() { whichOne(5); });
    p6.addEventListener("click", function() { whichOne(6); });
    p7.addEventListener("click", function() { whichOne(7); });
    p8.addEventListener("click", function() { whichOne(8); });
    //console.log(html);
	for(var i = 0; i < 9; i++) {
		plansza[i] = i + 2; 
	}
}

window.onload = setBoard;

function changeLanguage() {
    lang = !lang;
    if(!lang){
        document.querySelector('.lang-change').innerHTML = '                <img src="flagauk.png" alt="flaga Wielkiej Brytani"><p>ENG</p>';
        document.querySelector('#restart-game').innerHTML = '<h1>restart</h1>';
        document.querySelector('#whos-turn').innerHTML = '<p>Start the game or choose player</p>';
    }
    else {
        document.querySelector('.lang-change').innerHTML = '                <img src="flagapl.jpg" alt="flaga polski"><p>PL</p>';
        document.querySelector('#restart-game').innerHTML = '<h1>zacznij od nowa</h1>';
        document.querySelector('#whos-turn').innerHTML = '<p>Rozpocznij grę lub wybierz gracza</p>';
    }
    restart();
}

function whichOne(nr) {
    if(moves < 8) {
        var turn = "";
        if(!lang){
            if(yourTurn)
                turn = '<p>Your turn: <strong>x</strong></p>';
            else turn = '<p>Your turn: <strong>o</strong></p>';
        }
        else {
            if(yourTurn)
                turn = '<p>Teraz ruch ma: <strong>x</strong></p>';
            else turn = '<p>Teraz ruch ma: <strong>o</strong></p>';
        }
        
        if(!yourTurn){
            document.getElementById('p' + nr).innerHTML = '<span class="tag-x">x</span>';
            document.getElementById('whos-turn').innerHTML = turn;
            document.querySelector('.o-border').style.borderBottom = "2px solid #14bdac";
            document.querySelector('.x-border').style.borderBottom = "1px solid #cbcbcb";
            plansza[nr] = 0;
            //yourTurn = 1;
        }
        else{
            document.getElementById('p' + nr).innerHTML = '<span class="tag-o"><i class="far fa-circle fa-xs"></i></span>';
            document.getElementById('whos-turn').innerHTML = turn;
            document.querySelector('.x-border').style.borderBottom = "2px solid #14bdac";
            document.querySelector('.o-border').style.borderBottom = "1px solid #cbcbcb";
            plansza[nr] = 1;
            //yourTurn = 0;
        }
            document.getElementById('p' + nr).style.pointerEvents = "none";
            //console.log(plansza[nr]);
        isWin();
        if(endGame){
            if(yourTurn) { 
                wygrany = '<i class="far fa-circle fa-xs"></i>'; 
            }
            else { 
                wygrany = "x"; 
            }
            
            if(!lang) {
                var html = "";
                html += '<h1 class="koniec">WINNER: </h1>';
                html += '<h1 id="wygrany">' + wygrany + '</h1>';
                document.getElementById('board').innerHTML = html;
                document.querySelector('#whos-turn').innerHTML = '<p>Game over<p>';
            }
            else {
                var html = "";
                html += '<h1 class="koniec">WYGRAŁY: </h1>';
                html += '<h1 id="wygrany">' + wygrany + '</h1>';
                document.getElementById('board').innerHTML = html;
                document.querySelector('#whos-turn').innerHTML = '<p>Koniec gry<p>';
            }

            if(wygrany == 'x') {
                document.getElementById('wygrany').style.color = "#555";
                xWins++;
            }
            else {
                document.getElementById('wygrany').style.color = "#faebd3";
                oWins++;
            }
            setScore();
        }
        console.log(moves);
        yourTurn = !yourTurn;
        moves++;
    }
    else {
        if(!lang) {
            document.getElementById('board').innerHTML = '<h1 class="remis">DRAW!</h1>';
            document.querySelector('#whos-turn').innerHTML = '<p>Game over<p>';
        }
        else {
            document.getElementById('board').innerHTML = '<h1 class="remis">REMIS!</h1>';
            document.querySelector('#whos-turn').innerHTML = '<p>Koniec gry<p>';
        }
        
    }
    
}

function isWin() {
    if( plansza[0] == plansza[1] && plansza[1] == plansza[2] || 
		plansza[3] == plansza[4] && plansza[4] == plansza[5] ||
		plansza[6] == plansza[7] && plansza[7] == plansza[8] ||
		plansza[0] == plansza[3] && plansza[3] == plansza[6] ||
		plansza[1] == plansza[4] && plansza[4] == plansza[7] ||
		plansza[2] == plansza[5] && plansza[5] == plansza[8] ||
		plansza[0] == plansza[4] && plansza[4] == plansza[8] ||
		plansza[2] == plansza[4] && plansza[4] == plansza[6] )
		{
			endGame = 1; 
		}
    //console.log(endGame, yourTurn);
    return endGame;
}

function setScore() {
    document.getElementById('o-wins').innerHTML = oWins;
    document.getElementById('x-wins').innerHTML = xWins;
}

function restart() {
    setBoard();
    document.querySelector('.o-border').style.borderBottom = "1px solid #cbcbcb";
    document.querySelector('.x-border').style.borderBottom = "1px solid #cbcbcb";
    if(!lang) {
        document.querySelector('#whos-turn').innerHTML = '<p>Start the game or choose player</p>';
    }
    else {
        document.querySelector('#whos-turn').innerHTML = '<p>Rozpocznij grę lub wybierz gracza</p>';
    }
    
    yourTurn = false;
	endGame = 0;
    moves = 0;
}

