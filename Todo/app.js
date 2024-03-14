const storageKey = 'todoApp'
const todoApp = JSON.parse(localStorage.getItem(storageKey))
var dataString = localStorage.getItem(storageKey);
var todoList;
if(dataString){
    todoList = JSON.parse(dataString);
} else{
    todoList = [];
}

window.addEventListener('load', function(){
    todoList.forEach(element => {
        renderItem(element.textInfo, element.completeInfo)
    });
})
function renderItem(text, bool){
    todoItem = document.createElement('li');
    todoItemTxt = document.createElement('p');
    todoItemBtn = document.createElement('button');
    todoItemIcon = document.createElement('i');
    todoItem.setAttribute('class', 'li');
    todoItemTxt.setAttribute('class', 'item-txt');
    todoItemBtn.setAttribute('id', 'close');
    todoItemIcon.setAttribute('class', 'fas fa-times');
    
    $(todoItemTxt).append(text);
    $('#list').append(todoItem)
    $(todoItem).append(todoItemTxt);
    $(todoItem).append(todoItemBtn);
    $(todoItemBtn).append(todoItemIcon);
    
    if(bool){
        todoItemTxt.classList.add('completed');
    }

    completeItem(todoItemTxt, text)
    deleteItem(todoItemBtn, todoItem, todoItemTxt)
    clearText($('#text'))
}
 //! ----------- prevent reload page
$('#form').submit(function () {
    submitText;
    return false;
})
function submitText() {
    if($('#text').val() === ''){
        alert('Input your todo')
    } else{
        createItem()
    }
}
function createItem(){
    var text = $('#text').val();
    setData(text)
    renderItem(text)
}
function setData(text){
    var infoItem = {
        completeInfo: false,
        textInfo: text
    }
    todoList.push(infoItem);
    localStorage.setItem(storageKey, JSON.stringify(todoList));
}
//! --------- clear text when input todo
function clearText(event) {
    event.val('')
}
function completeItem(todoItemTxt, text){
    todoItemTxt.addEventListener('click', function(e){
        todoItemTxt.classList.toggle('completed')
        checkData(text, e.target)
    })
}
function checkData(text, item){     // check todo completed
    if(item.classList.contains('completed')){
        todoList.forEach(element => {
            if(element.textInfo === text){
                element.completeInfo = true;
                localStorage.setItem(storageKey, JSON.stringify(todoList))
            }
        });
    }else{
        todoList.forEach(element => {
            if(element.textInfo === text){
                element.completeInfo = false;
                localStorage.setItem(storageKey, JSON.stringify(todoList))
            }
        });
    }
}
function deleteItem(todoItemBtn, todoItem, todoItemTxt){
    todoItemBtn.onclick = function(){
        $(todoItem).hide('fast', function(){
            $(todoItem).remove()
        })
        for(var i=0; i<todoList.length; i++){
            if(todoList[i].textInfo === ($(todoItemTxt).html())){
                todoList.splice(i,1);
                localStorage.setItem(storageKey, JSON.stringify(todoList))
            }
        }
    }
}






