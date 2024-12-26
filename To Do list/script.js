document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const deleteAllBtn = document.getElementById('deleteAllBtn');
    const deleteDoneBtn = document.getElementById('deleteDoneBtn');

    let tasks = [];

    // Function to render tasks based on filter
    function renderTasks(filter = 'all') {
        taskList.innerHTML = ''; // Clear the list
        tasks.forEach((task, index) => {
            if (filter === 'all' || (filter === 'done' && task.completed) || (filter === 'todo' && !task.completed)) {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item';
                listItem.innerHTML = `
                    <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                    <div>
                        <button class="complete-btn" data-index="${index}">${task.completed ? 'Undo' : 'Complete'}</button>
                        <button class="delete-btn" data-index="${index}">Delete</button>
                    </div>
                `;
                taskList.appendChild(listItem);
            }
        });

        // Add event listeners to new buttons
        document.querySelectorAll('.complete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                tasks[index].completed = !tasks[index].completed;
                renderTasks();
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                tasks.splice(index, 1);
                renderTasks();
            });
        });
    }

    // Event listener for adding tasks
    addTaskBtn.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = ''; // Clear input field after adding
            renderTasks(); // Re-render the task list
        } else {
            alert('Please enter a task.'); // Alert if input is empty
        }
    });

    // Event listener for deleting all tasks
    deleteAllBtn.addEventListener('click', () => {
        tasks = []; // Clear all tasks
        renderTasks(); // Re-render the task list
    });

    // Event listener for deleting done tasks
    deleteDoneBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed); // Keep only non-completed tasks
        renderTasks(); // Re-render the task list
    });

    // Initial render
    renderTasks();
});
