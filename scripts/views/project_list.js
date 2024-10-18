import {Project} from '../modules/project.js';
import {LocalStorage} from '../modules/localStorage.js';

const localStorage = new LocalStorage();

document.addEventListener('DOMContentLoaded', function () {
    const projects = localStorage.getAllItems(Project);

    renderProjects(projects);
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

        //status

        clone.querySelector('[data-field="status_icon"]').classList.add(project.status.className);
        clone.querySelector('[data-field="status"]').textContent = project.status.value;

        clone.querySelector('[data-field="deadline"]').textContent = project.endDate.toDateString();

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
            localStorage.removeItemByInstance(project);
            renderProjects(localStorage.getAllItems(Project));
        });

        projectList.appendChild(clone);
    });
}