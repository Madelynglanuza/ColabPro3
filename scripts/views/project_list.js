import {Project} from '../modules/project.js';
import {ProjectStatus} from '../modules/projectStatus.js';
import {LocalStorage} from '../modules/localStorage.js';
import {TaskStatus} from "../modules/TaskStatus.js";
import {Task} from "../modules/Task.js";


const localStorage = new LocalStorage();

const project1 = new Project(1, 'Project 1', 'Description 1', ProjectStatus.PLANNED, [], new Date(2024, 9, 16), new Date(2024, 9, 25));

project1.addTask(new Task(1, 'Task 1', 'Description 1', TaskStatus.COMPLETED, [], new Date(), new Date()));
project1.addTask(new Task(2, 'Task 2', 'Description 2', TaskStatus.COMPLETED, [], new Date(), new Date()));
project1.addTask(new Task(3, 'Task 3', 'Description 3', TaskStatus.PLANNED, [], new Date(), new Date()));
project1.addTask(new Task(4, 'Task 4', 'Description 4', TaskStatus.COMPLETED, [], new Date(), new Date()));

localStorage.addItem(project1);

document.addEventListener('DOMContentLoaded', function () {
    const projects = localStorage.getAllItems(Project);

    renderProjects(projects);
});

document.getElementById("search_bar").addEventListener("keyup", function () {
    const searchValue = this.value.toLowerCase();
    const projects = localStorage.getAllItems(Project);

    if (!searchValue.length) {
        renderProjects(projects);
        return;
    }

    let filteredProjects = Object.values(projects)
        .filter(project => project.title.toLowerCase().includes(searchValue));

    const result = {}

    filteredProjects.forEach(project => {
        result[project.id] = project;
    });

    renderProjects(result);
});

function renderProjects(projects) {
    const projectList = document.querySelector('[data-field="project-list"]');
    projectList.innerHTML = '';
    Object.values(projects).forEach(project => {
        const template = document.getElementById('project-template').content;
        const clone = document.importNode(template, true);
        clone.querySelector('[data-field="title"]').textContent = project.title;
        clone.querySelector('[data-field="description"]').textContent = project.description;
        clone.querySelector('[data-field="members"]').textContent = project.members.length;

        clone.querySelector('[data-field="status_icon"]').classList.add(project.status.className);
        clone.querySelector('[data-field="status"]').textContent = project.status.value;

        clone.querySelector('[data-field="deadline"]').textContent = project.endDate.toDateString();
        clone.querySelector('[data-field="progress-container"]').title = "Progreso: " + project.getProgress() + '%';
        clone.querySelector('[data-field="progress"]').style.width = project.getProgress() + '%';

        //details-btn
        const detailsBtn = clone.querySelector('[data-field="details-btn"]');
        detailsBtn.addEventListener('click', function () {
            window.location.href = `project.html?id=${project.id}`;
        });

        //chat-btn
        const chatBtn = clone.querySelector('[data-field="chat-btn"]');
        chatBtn.addEventListener('click', function () {
            window.location.href = `chat.html?id=${project.id}`;
        });

        //delete-btn
        const deleteBtn = clone.querySelector('[data-field="delete-btn"]');
        deleteBtn.addEventListener('click', function () {
            project.tasks.forEach(task => {
                localStorage.removeItemById(task.id, Task);
            });
            localStorage.removeItemById(project.id, Project);

            renderProjects(localStorage.getAllItems(Project));
        });

        projectList.appendChild(clone);
    });
}