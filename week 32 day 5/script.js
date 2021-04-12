function additem(){
    const todo = document.getElementById('todo__input').value;
    if(!todo) alert('Todo cannot be empty')
    else if(todo.length <= 2) alert('Invalid todo')
    else{
        const newChild = document.createElement("li")
        newChild.innerHTML = '<input type="checkbox" class="checkbox"/><span class="item__text">'+ todo +'</span>'
        document.getElementById('lists').appendChild(newChild)
        document.getElementById('todo__input').value = ""
    }
}