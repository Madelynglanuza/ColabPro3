import {LocalStorage} from "../modules/localStorage.js";
import {Project} from "../modules/Project.js";
import {Task} from "../modules/Task.js";
import {Member} from "../modules/Member.js";
import {ProjectMember} from "../modules/ProjectMember.js";
import {TaskStatus} from "../modules/TaskStatus.js";

const localStorage = new LocalStorage();
LocalStorage.registerSavableClass(Project, Task, Member, ProjectMember);

const dropdown = document.getElementById('memberDropdown');
const searchInput = document.getElementById('task_assigned_to');

const values = {
    project_name: {
        tag: document.getElementById('project_name'),
        validation: (value, project, task) => true
    },
    title: {
        tag: document.getElementById('task_name'),
        validation: (value, project, task) => true
    },
    description: {
        tag: document.getElementById('task_description'),
        validation: (value, project, task) => true
    },
    startDate: {
        tag: document.getElementById('task_initial_date'),
        validation: (value, project, task) => true
    },
    endDate: {
        tag: document.getElementById('task_end_date'),
        validation: (value, project, task) => true
    },
    status: {
        tag: document.getElementById('task_status'),
        validation: (value, project, task) => true
    },
    assignedTo: {
        tag: document.getElementById('task_assigned_to'),
        validation: (value, project, task) => true
    }
}

const button = document.getElementById('save');

let project = null;
let task = null;
let isNew = false;
let assignedTo = null;

document.addEventListener('DOMContentLoaded', function () {
    project = getProjectFromURL();
    task = getTaskFromUrl();


    if (!project) {
        alert('No se encontró el proyecto');
        window.location.href = 'project_list.html';
        return;
    }

    if (!task || typeof task === 'string') {
        const newTask = new Task();

        if (task) {
            newTask.id = task;
        }

        isNew = true;

        task = newTask;
    }
    loadInputData();
    renderDefaultData(project);
    setupSaveButton();
    setupDropDown();
});

function getProjectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('project_id');
    return projectId ? localStorage.getItemById(projectId, Project) : null;
}

function getTaskFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const taskId = urlParams.get('task_id');
    return taskId ? localStorage.getItemById(taskId, Task) || taskId : null;
}

function renderDefaultData(project) {
    Object.entries(values).forEach(([key, value]) => {
        if (key === 'project_name') {
            value.tag.textContent = `Proyecto #${project.id}`;
        } else if (key === 'startDate' || key === 'endDate') {
            value.tag.value = isNew ? new Date().toISOString().split('T')[0] : task.toJSON()[key].split('T')[0];
        } else if (key === 'status') {
            console.log(task[key].value);
            value.tag.value = isNew ? TaskStatus.PLANNED.value : task[key].value;
        } else if (key === 'assignedTo') {
            value.tag.value = task.assignedTo?.member?.name || '';
        } else {
            value.tag.value = task.toJSON()[key] || "";
        }
    });

    if (!isNew) {
        const assignedTo = task.assignedTo;
        values.assignedTo.tag.textContent = assignedTo?.name || '';
    }
}

function loadInputData() {
    const statusSelect = document.getElementById('task_status');
    Object.values(TaskStatus).forEach(status => {
        const option = document.createElement('option');
        option.value = status.value;
        option.textContent = status.display_name;
        statusSelect.appendChild(option);
    });

    const membersSelect = document.getElementById('task_assigned_to');
    project.members.forEach(member => {
        const option = document.createElement('option');
        option.value = member.id;
        option.textContent = member?.member.name;
        membersSelect.appendChild(option);
    });
}


function setupSaveButton() {
    if (isNew) {
        button.textContent = 'Crear tarea';
    } else {
        button.textContent = 'Actualizar tarea';
    }

    button.addEventListener('click', function () {
        try {
            saveProject();
        } catch (exception) {
            console.error('Error al guardar la tarea:', exception);
        }
    });
}

function saveProject() {
    Object.entries(values).forEach(([key, value]) => {
        if (!value.validation(value.tag.value, project)) {
            throw new Error(`Valor invalido para ${key}`);
        }

        if (key === 'status') {
            task[key] = TaskStatus[value.tag.value.toUpperCase()];
        } else if (key === 'startDate' || key === 'endDate') {
            task[key] = new Date(value.tag.value);
        } else {
            task[key] = value.tag.value;
        }
    });

    if (assignedTo) {
        console.log("Asignado a:", assignedTo);
        task.assignedTo = assignedTo;
    } else {
        task.assignedTo = project.members[0];
    }

    project.setTask(task);


    localStorage.addItem(task);
    localStorage.addItem(project);
    window.location.href = `project.html?id=${project.id}`;
}

function setupDropDown() {
    searchInput.addEventListener('focus', () => {
        dropdown.style.display = 'block';
        dropdown.style.height = '100px';
        updateDropdown();
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredMembers = project.members.filter(projectMember => projectMember.member.name.toLowerCase().includes(query));
        updateDropdown(filteredMembers);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.task_assigned_to--controller')) {
            dropdown.style.display = 'none';
        }
    });
}

function updateDropdown(members) {
    members = members || project.members;

    dropdown.innerHTML = '';

    members.forEach(member => {
        const option = document.createElement('div');
        option.value = member.id;
        option.textContent = member?.member?.name;
        option.classList.add('dropdown-list--item')
        dropdown.appendChild(option);


        option.addEventListener('click', () => {
            assignedTo = member;
            searchInput.value = member.member.name;
            dropdown.style.display = 'none';
        });
    });
}