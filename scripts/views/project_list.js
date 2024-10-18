import {Project} from '../modules/project.js';
import {LocalStorage} from '../modules/localStorage.js';

document.addEventListener('DOMContentLoaded', function () {
    const projects = new LocalStorage().getAllItems(Project);
    renderProjects(projects);
});

function renderProjects(projects) {
    const projectList = document.querySelector('[data-field="project-list"]');
    projectList.innerHTML = '';
    projects.forEach(project => {
        console.log(project.title);
        const template = document.getElementById('project-template').content;
        const clone = document.importNode(template, true);
        console.log(clone);
        clone.querySelector('[data-field="title"]').textContent = project.title;
        clone.querySelector('[data-field="description"]').textContent = project.description;
        clone.querySelector('[data-field="members"]').textContent = project.members;
        clone.querySelector('[data-field="status"]').textContent = project.status;
        clone.querySelector('[data-field="deadline"]').textContent = project.deadline;
        projectList.appendChild(clone);
    });
}