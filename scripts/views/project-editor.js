import { LocalStorage } from "../modules/localStorage.js";
import { Project } from "../modules/Project.js";
import { TaskStatus } from "../modules/TaskStatus.js";
import { ProjectStatus } from "../modules/ProjectStatus.js";
import { Task } from "../modules/Task.js";

const localStorage = new LocalStorage();
LocalStorage.registerSavableClass(Project, Task);

const values = {
    title: document.getElementById('project_name'),
    description: document.getElementById('project_description'),
    startDate: document.getElementById('project_initial_date'),
    endDate: document.getElementById('project_end_date'),
    status: document.getElementById('project_status'),
    budget: document.getElementById('project_budget')
};

const button = document.getElementById('save');

document.addEventListener('DOMContentLoaded', function () {
    loadInputsData();

    const isEditing = window.location.search.includes('id');
    const project = getProjectFromURL() || createNewProject();

    renderProjectData(project);
    setupSaveButton(project, isEditing);
});

function loadInputsData() {
    const statusSelect = document.getElementById('project_status');
    Object.values(ProjectStatus).forEach(status => {
        const option = document.createElement('option');
        option.value = status.value;
        option.textContent = status.value;
        statusSelect.appendChild(option);
    });
}

function getProjectFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    return projectId ? localStorage.getItemById(projectId, Project) : null;
}

function createNewProject() {
    const today = new Date();
    return new Project(null, null, null, ProjectStatus.PLANNED, [], today, new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), [], 0);
}

function renderProjectData(project) {
    Object.entries(values).forEach(([key, value]) => {
        if (key === 'status') {
            value.value = project.status.value;
        } else if (key === 'startDate' || key === 'endDate') {
            value.value = project[key].toISOString().split('T')[0];
        } else {
            value.value = project.toJSON()[key];
        }
    });
}

function setupSaveButton(project, isEditing) {
    button.textContent = isEditing ? 'Actualizar' : 'Guardar';

    button.addEventListener("click", function() {
        try {
            saveProject(project);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    });
}

function saveProject(project) {
    Object.entries(values).forEach(([key, value]) => {
        if (!isValueValid(value.value)) {
            console.error(`Invalid value for ${key}: ${value.value}`);
            return;
        }

        if (key === 'status') {
            project[key] = ProjectStatus[value.value];
        } else if (key === 'startDate' || key === 'endDate') {
            project[key] = new Date(value.value);
        } else {
            project[key] = value.value;
        }
    });

    localStorage.addItem(project);
}

function isValueValid(value) {
    return value !== null && value !== undefined && value !== '';
}