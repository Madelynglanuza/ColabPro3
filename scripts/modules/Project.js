import { ProjectStatus } from './ProjectStatus.js';
import {Savable} from "./Savable.js";
import {TaskStatus} from "./TaskStatus.js";

export class Project extends Savable {

    constructor(id, title, description, status, members, startDate, endDate, tasks, budget) {
        /**
         * @param {number} id
         * @param {string} title
         * @param {string} description
         * @param {ProjectStatus} status
         * @param {string} responsible
         * @param {Date} startDate
         * @param {Date} endDate
         * @param {Task} task
         * @param {number}
         * @returns {Project}
         * @constructor
         */

        super( id);
        this.title = title || '';
        this.description = description || '';
        this.status = status || ProjectStatus.PLANNED;
        this.members = members || [];
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.tasks = tasks || [];
        this.budget = budget || 0;
    }

    addTask(task) {
        task.project_id = this.id;
        this.tasks.push(task);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }

    getTasks() {
        return this.tasks;
    }

    getProgress() {
        const totalTasks = this.tasks.length;
        const completedTasks = this.tasks.filter(task => task.status === TaskStatus.COMPLETED).length;
        return totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            members: this.members,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            tasks: this.tasks,
            budget: this.budget
        };
    }

    static fromJSON(json) {
        return new Project(
            json.id,
            json.title,
            json.description,
            json.status,
            json.members,
            new Date(json.startDate),
            new Date(json.endDate),
            json.tasks,
            json.budget
        );
    }

    isEqual(project) {
        return project instanceof Project && project.id === this.id;
    }

    clone() {
        return new Project(
            null,
            this.title,
            this.description,
            this.status,
            this.members,
            this.startDate,
            this.endDate,
            this.tasks.map(task => task.clone()),
            this.budget
        );
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    toReference() {
        let result =  super.toReference()
        result['key'] = 'Project';
        return result;
    }
}