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
    }
});


function renderProjectDetails(project) {
    console.log(project);

    document.querySelector('[data-field="title"]').textContent = project.title;
    document.querySelector('[data-field="description"]').textContent = project.description;
    document.querySelector('[data-field="id"]').textContent = project.id;
    document.querySelector('[data-field="status"]').textContent = project.status.value;
    document.querySelector('[data-field="start-date"]').textContent = project.startDate.toDateString();
    document.querySelector('[data-field="end-date"]').textContent = project.endDate.toDateString();
    document.querySelector('[data-field="progress"]').style.setProperty("--value", getTasksProgress(project));

    document.querySelector('[data-field="tasks"]').textContent = `${completedTasks(project)} de ${project.tasks.length} Tareas completadas`;


    document.querySelector('[data-field="days"]').textContent = `Dias restantes: ${remainingDays(project)}`;

}

function getTasksProgress(project) {
    const totalTasks = project.tasks.length;

    if (totalTasks <= 0) {
        return 0;
    }


    const completed = completedTasks(project);

    return (completed * 100) / totalTasks;
}

function completedTasks(project) {
    return project.tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
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