import {Savable} from "./Savable.js";

export class Member extends Savable {

    constructor(id, name, email, imageBase64) {
        /**
         * @param {number} id
         * @param {string} name
         * @param {string} email
         * @returns {Member}
         * @constructor
         */

        super(id);
        this.name = name || '';
        this.email = email || '';
        this.imageBase64 = imageBase64 || '';
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            imageBase64: this.imageBase64,
        };
    }

    static fromJSON(json) {
        return new Member(json.id, json.name, json.email, json.imageBase64);
    }

    isEqual(object) {
        return object instanceof Member && object.id === this.id;
    }

    clone() {
        return this.constructor.fromJSON(this.toJSON());
    }

    toString() {
        return super.toString();
    }

    toReference() {
        const result = super.toReference();
        result['key'] = 'Member';
        return result;
    }
}