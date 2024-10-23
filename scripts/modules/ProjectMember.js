import {Savable} from "./Savable.js";

export class ProjectMember extends Savable {
    constructor(id, project, member, role) {
        super(id);
        this.project = null;
        this.member = member;
        this.role = role;
    }

    toJSON() {
        return {
            id: this.id,
            project: this.project,
            member: this.member,
            role: this.role
        };
    }

    static fromJSON(json) {
        return new ProjectMember(json.id, json.project, json.member, json.role);
    }

    isEqual(object) {
        return object instanceof ProjectMember && object.id === this.id;
    }

    clone() {
        return this.constructor.fromJSON(this.toJSON());
    }

    toReference() {
        const result = super.toReference();
        result['key'] = 'ProjectMember';
        return result;
    }
}