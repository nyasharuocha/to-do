document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const voiceCommandBtn = document.getElementById('voice-command-btn');
    const listeningPopup = document.getElementById('listening-popup');

    // Function to add a task
    function addTask(taskName) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span class="task-name">${taskName}</span>
            <div class="task-actions">
                <input type="checkbox" class="complete-checkbox">
                <span class="edit-icon">&#9998;</span>
                <span class="delete-icon">&#128465;</span>
            </div>
        `;
        taskList.appendChild(taskItem);
        taskInput.value = '';

        // Edit task name
        taskItem.querySelector('.task-name').addEventListener('dblclick', function() {
            const newTaskName = prompt('Edit task name:', this.textContent);
            if (newTaskName) {
                this.textContent = newTaskName;
            }
        });

        // Mark task as completed
        taskItem.querySelector('.complete-checkbox').addEventListener('change', function() {
            taskItem.classList.toggle('completed');
        });

        // Delete task
        taskItem.querySelector('.delete-icon').addEventListener('click', function() {
            taskItem.remove();
        });
    }

    // Add task on button click
    addTaskBtn.addEventListener('click', () => {
        if (taskInput.value) {
            addTask(taskInput.value);
        }
    });

    // Voice command functionality
    voiceCommandBtn.addEventListener('click', () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'en-US';

        // Show "Listening..." pop-up
        listeningPopup.style.display = 'block';

        recognition.start();

        recognition.onresult = (event) => {
            // Hide "Listening..." pop-up
            listeningPopup.style.display = 'none';

            const voiceInput = event.results[0][0].transcript;
            addTask(voiceInput);
        };

        recognition.onerror = (event) => {
            // Hide "Listening..." pop-up on error
            listeningPopup.style.display = 'none';
            console.error(event.error);
        };

        recognition.onend = () => {
            // Hide "Listening..." pop-up when recognition ends
            listeningPopup.style.display = 'none';
        };
    });
});
