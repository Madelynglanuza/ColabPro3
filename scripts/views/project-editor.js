import {LocalStorage} from "../modules/localStorage.js";
import {Project} from "../modules/Project.js";
import {ProjectStatus} from "../modules/ProjectStatus.js";
import {Task} from "../modules/Task.js";
import {Member} from "../modules/Member.js";
import {ProjectMember} from "../modules/ProjectMember.js";
import {ProjectRole} from "../modules/ProjectRole.js";

const localStorage = new LocalStorage();
LocalStorage.registerSavableClass(Project, Task, Member, ProjectMember);

const values = {
    title: {
        tag: document.getElementById('project_name'),
        validation: (value, project) => true
    },
    description: {
        tag: document.getElementById('project_description'),
        validation: (value, project) => true
    },
    startDate: {
        tag: document.getElementById('project_initial_date'),
        validation: (value, project) => true
    },
    endDate: {
        tag: document.getElementById('project_end_date'),
        validation: (value, project) => true
    },
    status: {
        tag: document.getElementById('project_status'),
        validation: (value, project) => true
    },
    budget: {
        tag: document.getElementById('project_budget'),
        validation: (value, project) => {
            try {
                parseFloat(value) >= 0
            } catch (error) {
                return false;
            }
        }
    }
}

const button = document.getElementById('save');

const memberDropdownItemTemplate = document.getElementById('memberDropdownItem').content;
const searchInput = document.getElementById('search_member');
const dropdown = document.getElementById('memberDropdown');
const projectMemberTemplate = document.getElementById('project-member').content;
const createMemberItem = document.getElementById('createMemberItem').content;

let allMembers = localStorage.getAllItems(Member);

let project = null;

document.addEventListener('DOMContentLoaded', function () {
    loadInputsData();

    const isEditing = window.location.search.includes('id');

    loadProjectData();
    renderProjectData(project);
    setupSaveButton(project, isEditing);
    setupDropdown(project);
});

function loadProjectData() {
    project = getProjectFromURL();
    if (!project) {
        project = createNewProject();
    }
}

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
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const today = new Date();
    return new Project(parseInt(projectId), null, null, ProjectStatus.PLANNED, [], today, new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1), {}, 0);
}

function renderProjectData(project) {
    Object.entries(values).forEach(([key, value]) => {

        if (key === 'status') {
            value.tag.value = project.status.value;
        } else if (key === 'startDate' || key === 'endDate') {
            value.tag.value = project[key].toISOString().split('T')[0];
        } else {
            value.tag.value = project.toJSON()[key];
        }
    });

    renderMembers(project);
}

function setupSaveButton(project, isEditing) {
    button.textContent = isEditing ? 'Actualizar' : 'Guardar';

    button.addEventListener("click", function () {
        try {
            saveProject(project);
        } catch (error) {
            console.error('Error saving project:', error);
        }
    });
}

function saveProject(project_to_save) {
    try {
        Object.entries(values).forEach(([key, value]) => {
            if (!isValueValid(value.tag.value)) {
                throw new Error(`Valor invalido para ${key}`);
            }


            if (key === 'status') {
                project_to_save[key] = ProjectStatus[value.tag.value];
            } else if (key === 'startDate' || key === 'endDate') {
                project_to_save[key] = new Date(value.tag.value);
            } else if (key === 'budget') {
                project_to_save[key] = parseFloat(value.tag.value);
            } else {
                project_to_save[key] = value.tag.value;
            }
        });

        localStorage.addItem(project_to_save);

        window.location.href = `project.html?id=${project_to_save.id}`;
    } catch (exception) {
        console.error('Error al guardar el proyecto:', exception);
    }
}

function isValueValid(value) {
    return value !== null && value !== undefined && value !== '';
}

function renderMembers(project) {
    let members_container = document.getElementById('project-members');
    members_container.innerHTML = '';
    project.members.forEach(projectMember => {
        const member = projectMember.member;
        const clone = document.importNode(projectMemberTemplate, true);

        clone.querySelector('[data-field="member-name"]').textContent = member.name;
        let memberSelect = clone.querySelector('[data-field="member-role"]');

        Object.values(ProjectRole).forEach(role => {
            const option = document.createElement('option');
            option.value = role.value.toUpperCase();
            option.textContent = role.display_name;
            memberSelect.appendChild(option);
        });

        memberSelect.value = projectMember.role.value.toUpperCase() || ProjectRole.CLIENT.value;

        memberSelect.addEventListener('change', () => {
            if (!memberSelect.value || memberSelect.value === '') {
                projectMember.role = ProjectRole.CLIENT;
                return;
            }

            projectMember.role = ProjectRole[memberSelect.value];
        });

        const removeButton = clone.querySelector('[data-field="remove-member"]');
        removeButton.addEventListener('click', () => {
            project.members = project.members.filter(member => member.id !== projectMember.id);
            renderProjectData(project);
        });
        members_container.appendChild(clone);
    });
}

function setupDropdown(project) {
    searchInput.addEventListener('focus', () => {
        dropdown.style.display = 'block';
        updateDropdown(project);
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredMembers = Object.values(allMembers).filter(member => member.name.toLowerCase().includes(query));
        updateDropdown(project, filteredMembers);
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.project-members--controller')) {
            dropdown.style.display = 'none';
        }
    });
}

function updateDropdown(project, members) {
    members = members || allMembers;

    dropdown.innerHTML = '';

    Object.values(members).forEach(member => {

        const clone = document.importNode(memberDropdownItemTemplate, true);
        clone.querySelector('[data-field="member-name"]').textContent = member.name;

        let projectMembers = project.members.filter(projectMember => projectMember.member.id === member.id);
        let button = clone.querySelector('[data-field="addButton"]');
        let addContainer = clone.querySelector('[data-field="added"]');

        if (projectMembers.length > 0) {
            button.style.display = 'none';
        } else {
            addContainer.style.display = 'none';

            button.addEventListener('click', () => {
                project.members.push(new ProjectMember(null, project, member, null));
                renderMembers(project);
            });
        }

        dropdown.appendChild(clone);
    });

    const createMemberClone = document.importNode(createMemberItem, true);

    createMemberClone.querySelector('[data-field="createMember"]').addEventListener('click', () => {
        dropdown.style.display = 'none';
        let newUserName = prompt('Ingrese el nombre del nuevo miembro')
        const member = new Member(null, newUserName);
        localStorage.addItem(member);
        allMembers = localStorage.getAllItems(Member);
        updateDropdown(project);
    });

    dropdown.appendChild(createMemberClone);
}

function setupCreateMember() {
}