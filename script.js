document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to add a task
    function addTask(taskText, save = true) {
        // Create a new list item
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-btn');

        // Assign event to remove task when the button is clicked
        removeButton.onclick = () => {
            taskList.removeChild(listItem);
            let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks = storedTasks.filter(task => task !== taskText); // Filter out the task
            localStorage.setItem('tasks', JSON.stringify(storedTasks)); // Save updated array
        };

        // Append remove button to the list item
        listItem.appendChild(removeButton);

        // Append the list item to the task list
        taskList.appendChild(listItem);

        // Save the task to Local Storage if 'save' is true
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));

        }

        // Clear the task input field
        taskInput.value = "";
    }

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Add tasks without saving to avoid duplication
    }

    // Event listener for Add Task button
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }
        addTask(taskText); // Add task and save to Local Storage
    });

    // Event listener for pressing the 'Enter' key to add a task
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim(); // Get task input and trim it
            if (taskText === "") {
                alert("Please enter a task.");
                return;
            }
            addTask(taskText); // Add task and save to Local Storage
        }
    });
});