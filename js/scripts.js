document.addEventListener('DOMContentLoaded', function() {
    fetchTasks();

    document.getElementById('task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let taskInput = document.getElementById('task');
        let task = taskInput.value.trim();

        if (task) {
            addTask(task);
            taskInput.value = '';
        }
    });

    document.getElementById('edit-task-form').addEventListener('submit', function(e) {
        e.preventDefault();
        let taskId = this.dataset.id;
        let newTask = document.getElementById('edit-task').value.trim();

        if (newTask) {
            editTask(taskId, newTask);
        }
    });
});

function fetchTasks() {
    fetch('php/fetch_tasks.php')
        .then(response => response.json())
        .then(tasks => {
            let taskList = document.getElementById('task-list');
            taskList.innerHTML = '';
            tasks.forEach(task => {
                let li = document.createElement('li');
                li.textContent = task.task;

                let editButton = document.createElement('button');
                editButton.textContent = 'Editar';
                editButton.classList.add('edit-btn');
                editButton.addEventListener('click', () => openEditModal(task.id, task.task));

                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.classList.add('delete-btn');
                deleteButton.addEventListener('click', () => toggleTask(task.id));

                li.appendChild(editButton);
                li.appendChild(deleteButton);

                if (task.status === 'completed') {
                    li.classList.add('completed');
                }

                taskList.appendChild(li);
            });
        });
}

function addTask(task) {
    fetch('php/add_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ task })
    }).then(() => fetchTasks());
}

function editTask(id, task) {
    fetch('php/edit_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, task })
    }).then(() => {
        closeEditModal();
        fetchTasks();
    });
}

function toggleTask(id) {
    fetch('php/delete_task.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }).then(() => fetchTasks());
}

function openEditModal(id, task) {
    let editModal = document.getElementById('edit-modal');
    let editTaskInput = document.getElementById('edit-task');

    editTaskInput.value = task;
    document.getElementById('edit-task-form').dataset.id = id;
    
    editModal.style.display = 'block';
}

function closeEditModal() {
    let editModal = document.getElementById('edit-modal');
    editModal.style.display = 'none';
}

document.querySelector('.close').onclick = function() {
    closeEditModal();
};

window.onclick = function(event) {
    let editModal = document.getElementById('edit-modal');
    if (event.target == editModal) {
        closeEditModal();
    }
};
