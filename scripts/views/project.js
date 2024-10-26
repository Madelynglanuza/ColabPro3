import { LocalStorage} from "../modules/localStorage.js";
import {Project} from "../modules/Project.js";
import {TaskStatus} from "../modules/TaskStatus.js";

const localStorage = new LocalStorage();


document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    if (projectId) {
        const project = localStorage.getItemById(projectId, Project);
        renderProjectDetails(project);
        renderTasks(project);
    }
});


function renderProjectDetails(project) {
    console.log(project);

    document.querySelector('[data-field="title"]').textContent = project.title;
    document.querySelector('[data-field="description"]').textContent = project.description;
    document.querySelector('[data-field="id"]').textContent = project.id;
    document.querySelector('[data-field="status"]').textContent = project.status.value;
    document.querySelector('[data-field="start-date"]').textContent = project.startDate.toISOString().split('T')[0];
    document.querySelector('[data-field="end-date"]').textContent = project.endDate.toISOString().split('T')[0];
    document.querySelector('[data-field="progress"]').style.setProperty("--value", project.getProgress());

    document.querySelector('[data-field="tasks"]').textContent = `${project.completedTasks()} de ${Object.keys(project.tasks).length} Tareas completadas`;
    document.querySelector('[data-field="tasks-container"]').style.setProperty("--value", project.getProgress());



    document.querySelector('[data-field="days"]').textContent = `Dias restantes: ${remainingDays(project)} de ${getDaysDifference(project.startDate, project.endDate)}`;
    document.querySelector('[data-field="days-container"]').style.setProperty("--value", getRemainingDaysProgress(project));

    document.querySelector('[data-field="edit_btn"]').addEventListener('click', function () {
        window.location.href = `project-editor.html?id=${project.id}`;
    });

    document.querySelector('[data-field="delete"]').addEventListener('click', function () {
        localStorage.removeItemById(project.id, Project);
        window.location.href = 'project_list.html';
    });

    document.querySelector('[data-field="new_task"]').addEventListener('click', function () {
        window.location.href = `task-editor.html?project_id=${project.id}`;
    });

}


function remainingDays(project) {
    const today = new Date();
    return getDaysDifference(today, project.endDate);
}

function getDaysDifference(date1, date2) {
    console.log(date1.toDateString())
    const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // Milisegundos en un día
    const differenceInMilliseconds = Math.abs(date2 - date1); // Diferencia en milisegundos
    const result = Math.ceil(differenceInMilliseconds / oneDayInMilliseconds);

    if (result < 0) {
        return 0;
    }

    return result;
}

function getRemainingDaysProgress(project) {
    const totalDays = getDaysDifference(project.startDate, project.endDate);
    const remaining = remainingDays(project);

    return 100 - ((remaining * 100) / totalDays);
}

function renderTasks(project) {
    const taskTemplate = document.getElementById('task-template');
    const taskContainer = document.getElementById('tasks');
    taskContainer.innerHTML = '';
    console.log(project);

    Object.values(project.tasks).forEach(task => {
        console.log(task);
        console.log(task.assignedTo);
        const clone = document.importNode(taskTemplate.content, true);
        clone.querySelector('[data-field="title"]').textContent = task.title;
        clone.querySelector('[data-field="task-id"]').textContent = task.id;
        clone.querySelector('[data-field="description"]').textContent = task.description;
        clone.querySelector('[data-field="start-date"]').textContent = task.startDate.split('T')[0];
        clone.querySelector('[data-field="end-date"]').textContent = task.endDate.split('T')[0];
        clone.querySelector('[data-field="status"]').textContent = task.status.display_name;
        clone.querySelector('[data-field="assigned-to"]').textContent = project.members.filter(member => member.id === task.assignedTo.id)[0].member?.name || '';

        clone.querySelector('[data-field="edit-btn"]').addEventListener('click', function () {
            window.location.href = `task-editor.html?project_id=${project.id}&task_id=${task.id}`;
        });
        clone.querySelector('[data-field="delete-btn"]').addEventListener('click', function () {
            project.removeTask(task.id);
            localStorage.addItem(project);
            project = localStorage.getItemById(project.id, Project);
            renderTasks(project);
        });
        taskContainer.appendChild(clone);
    });
}