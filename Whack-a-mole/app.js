const holes = document.querySelectorAll('.hole');
var count = 0;
var score = 0;
var check = false;
var time = 30;

window.addEventListener('load', () => {
    $('.start-game').click(function (e) { 
        e.preventDefault();
        $('.intro').css('animation', 'hide-board 1s infinite');
        setTimeout(function(){
            $('.intro').addClass('hide');
            $('.play').removeClass('hide');
            playingGame();
            setTimeout(function(){
                endGame();
            }, (time+2.3)*1000)
        },1000)
    });
})

function playingGame(){
    if($('.intro').hasClass('hide')){
        $('.play').css("cursor","url('img/small-hammer.png'), auto")
    }
    $('.play').mousedown(function () { 
        $('.play').css("cursor","url('img/small-hammer-2.png'), auto")
    });
    $('.play').mouseup(function () { 
        $('.play').css("cursor","url('img/small-hammer.png'), auto")
    });
    
    printScore = (count) => {
        $('#play-score').text(count);
    }
    setInterval(function(){
        if(time > 0){
            time--;
            $('#count-down').text(time);
        }else{
            $('#time').text('Time Out !');
            $('#time').css('color', '#EA0B0B')
            $('#count-down').text('');
        }
    }, 1000)

    //! ------- random locate of the rat
    startGame()
    setInterval(function(){
        startGame()
    }, 2000)
    function startGame(){
        var rd = getRandom()
        setHole($('.hole'+rd)) 
        setClickRat()
        if(check===true){
            count++;
            check = false;
        }
        printScore(count)
        score = count;
        console.log('start')
    }
    function getRandom() {
        let random = Math.floor(Math.random()*10)
        if(random>0){
            return random ;
        }
        else{
            return random+1;
        }
    }
    function setHole(hole){
        $('.rat').appendTo(hole);
    }
    function setClickRat(){
        $('#rat').click(function (e) { 
            e.preventDefault();
            $('#rat-dead').css("opacity", "1");
            check = true;
        });
        $('#rat-dead').css("opacity", "0");
    }
    
}
function endGame(){
    $('#end-score').text(score);
    $('.play').addClass('hide');
    $('.end').removeClass('hide');
    $('.end').css('animation', 'show-board 1s infinite');
    setTimeout(function(){
        $('.end').css('animation', '');
        $('.end').css('top', '0');
    },1000)
    $('#again').click(function (e) { 
        e.preventDefault();
        location.reload()
    });
}


