import { ProjectStatus } from './ProjectStatus.js';
import {Savable} from "./Savable.js";

export class Project extends Savable {

    constructor(id, title, description, status, members, startDate, endDate, tasks_ids) {
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

        super('projects');
        this.id = id || Math.floor(Math.random() * 1000); // int
        this.title = title || '';
        this.description = description || '';
        this.status = status || ProjectStatus.PLANNED;
        this.members = members || [];
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.tasks_ids = tasks_ids || [];
    }

    addTaskId(taskId) {
        this.tasks.push(taskId);
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter(t => t !== taskId);
    }

    getTasksIds() {
        return this.tasks;
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
            tasks_ids: this.tasks_ids
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
            json.tasks_ids
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
            this.tasks_ids
        );
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }
}