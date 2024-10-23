import { TaskStatus } from './TaskStatus.js';
import {Savable} from "./Savable.js";

export class Task extends Savable {
    constructor(id, title, description, status, responsible, startDate, endDate, project_id) {
        /**
         * @param {number} id
         * @param {string} title
         * @param {string} description
         * @param {TaskStatus} status
         * @param {string} responsible
         * @param {Date} startDate
         * @param {Date} endDate
         * @returns {Task}
         * @constructor
         */

        super(id);
        this.title = title || '';
        this.description = description || '';
        this.status = status || TaskStatus.PLANNED;
        this.responsible = responsible || '';
        this.startDate = startDate || new Date();
        this.endDate = endDate || new Date();
        this.project_id = project_id || '';
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            description: this.description,
            status: this.status,
            responsible: this.responsible,
            startDate: this.startDate.toISOString(),
            endDate: this.endDate.toISOString(),
            project_id: this.project_id
        };
    }

    static fromJSON(json) {
        return new Task(
            json.id,
            json.title,
            json.description,
            json.status,
            json.responsible,
            new Date(json.startDate),
            new Date(json.endDate),
            json.project_id
        );
    }

    isEqual(task) {
        return task instanceof Task && task.id === this.id;
    }

    clone() {
        return this.constructor.fromJSON(this.toJSON());
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    update({title, description, status, responsible, startDate, endDate}) {
        this.title = title || this.title;
        this.description = description || this.description;
        this.status = status || this.status;
        this.responsible = responsible || this.responsible;
        this.startDate = startDate || this.startDate;
        this.endDate = endDate || this.endDate;
    }

    toReference() {
        let result = super.toReference();
        result.key = 'Task';
        return result;
    }
}