const form = document.getElementById('add-form');
const container = document.getElementById('todo-container');

let todos = JSON.parse(localStorage.getItem('myTodos')) || [];
console.log(todos);

function saveTodo(todos) {
    try {
        localStorage.setItem('myTodos', JSON.stringify(todos));
    } catch (error) {
       console.log("Error loading local storage", error);
        
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addTodo();
    form.reset();
});

function addTodo() {
    const todoName = document.getElementById('todo-name').value;
    const todoDesc = document.getElementById('todo-desc').value;
    const id = Date.now().toString();
    
    const todo = {
        todo_id: id,
        todo_name: todoName,
        todo_desc: todoDesc || ""
    };
    
    todos.push(todo);
    saveTodo(todos);
    displayTodo();
}

function displayTodo() {
        container.innerHTML = '<h3 class="text-2xl text-center bg-gray-200 text-gray-900 w-full rounded-t-lg py-2">Todos</h3>';
        todos.forEach(element => {
            const truncatedDesc = String(element.todo_desc).length > 50 ? String(element.todo_desc).slice(0, 50) + '...' : String(element.todo_desc);
            
            const todoEle = document.createElement('div');
            todoEle.className = "bg-gray-800 text-gray-200 w-[600px] h-[90px] flex flex-row items-center space-x-2 p-2 rounded-md hover:shadow-md hover:shadow-black hover:cursor-pointer transition duration-300 group mt-4";
            todoEle.setAttribute('data-id', element.todo_id);
            
            todoEle.innerHTML = `
                <div class="flex flex-col gap-2 text-gray-200 flex-grow">
                    <div class="text-lg font-semibold">${element.todo_name}</div>
                    <div class="text-md">${truncatedDesc}</div>
                </div>
                <div class="ml-auto">
                    <button class="delete-btn bg-red-600 w-20 h-8 px-3 py-1 text-white rounded-sm hover:bg-red-800 hover:cursor-pointer transition duration-100 mr-2 opacity-0 group-hover:opacity-100">Delete</button>
                    <button class="edit-btn bg-blue-700 px-3 py-1 text-white rounded-sm opacity-0 group-hover:opacity-100 hover:bg-blue-800 mr-2 hover:cursor-pointer transition duration-100">Edit</button>
                </div>
            `;
            
            container.appendChild(todoEle);
    });
    
}

container.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const todoId = e.target.closest('[data-id]').getAttribute('data-id');
        todos = todos.filter(todo => todo.todo_id !== todoId);
        saveTodo(todos);
        displayTodo();
    }
    else if(e.target.classList.contains("edit-btn")){
        const todoId = e.target.closest('[data-id]').getAttribute('data-id')
        const todo = todos.find(todo => todo.todo_id === todoId);
        if(todo){
            document.getElementById('todo-name').value = todo.todo_name;
            document.getElementById('todo-desc').value = todo.todo_desc;

            todos = todos.filter(todo => todo.todo_id !== todoId);
            saveTodo(todos);
            displayTodo();
        }

    }
});


displayTodo();