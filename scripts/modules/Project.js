import { ProjectStatus } from './ProjectStatus.js';
import {Savable} from "./Savable.js";
import {TaskStatus} from "./TaskStatus.js";

export class Project extends Savable {

    constructor(id, title, description, status, members, startDate, endDate, tasks) {
        /**
         * @param {number} id
         * @param {string} title
         * @param {string} description
         * @param {ProjectStatus} status
         * @param {string} responsible
         * @param {Date} startDate
         * @param {Date} endDate
         * @param {number[]} tasks_ids
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
            json.tasks
        );
    }

    isEqual(project) {
        return this.id === project.id;
    }

    clone() {
        return new Project(
            Math.floor(Math.random() * 1000),
            this.title,
            this.description,
            this.status,
            this.members,
            this.startDate,
            this.endDate,
            this.tasks.map(task => task.clone())
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