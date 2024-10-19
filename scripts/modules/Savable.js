export class Savable {
    constructor(id) {
        this.id = id || Math.floor(Math.random() * 1000);
        if (new.target === Savable) {
            throw new Error('Class must implement constructor');
        }
    }

    toJSON() {
        throw new Error('El metodo toJSON debe ser implementado');
    }

    static fromJSON(json) {
        throw new Error('El metodo fromJSON debe ser implementado');
    }

    isEqual(object) {
        throw new Error('El metodo isEqual debe ser implementado');
    }

    clone() {
        return this.constructor.fromJSON(this.toJSON());
    }

    toString() {
        return JSON.stringify(this.toJSON());
    }

    toReference() {
        return {
            id: this.id,
            reference: true
        };
    }

    getKey() {
        return this.key;
    }
}