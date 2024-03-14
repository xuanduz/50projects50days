const size = document.querySelector('#size');
const color = document.querySelector('#color');
const clear = document.querySelector('#clear');
const eraser = document.querySelector('#eraser');
const checkbox = document.querySelector('#checkbox');
const canvas = document.querySelector('Canvas');
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 600;
var painting = false;
var checkEraser = false;
var colorLine, sizeLine;

$('#form').submit(function () {
    submitSize;
    return false;
})
function submitSize(){
    sizeLine = $('#size').val();
}

clear.addEventListener('click', clearCanvas)
function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

window.addEventListener('load', function(){
    //--------------- check Eraser
    eraser.addEventListener('click',function(){
        if(eraser.classList.contains('checked')){
            eraser.classList.remove('checked');
            $('.canvas').removeClass('cursor-eraser');
        }
        else{
            eraser.classList.add('checked')
            $('.canvas').addClass('cursor-eraser')
        }
    })
    function startPosition(){
        painting = true;
    }
    function finishPosition(e){
        painting = false;
        ctx.beginPath();
    }
    function drawing(e){
        var colorTemp = 'black';
        if(!painting)   return;
        ctx.lineCap = 'round';
        if(eraser.classList.contains('checked')){
            ctx.strokeStyle = 'white';
            
            
        }else{
            
            color.addEventListener('input', function(){
                colorTemp = color.value;
                colorLine = colorTemp;
            }, false)
            ctx.strokeStyle = colorLine;
        }
        ctx.lineWidth = sizeLine;
        ctx.lineTo(e.offsetX, e.offsetY)
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY)
    }
    canvas.addEventListener('mousedown', startPosition)
    canvas.addEventListener('mouseup', finishPosition)
    canvas.addEventListener('mousemove', drawing)
})

