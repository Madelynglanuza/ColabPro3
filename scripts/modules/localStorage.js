import {Savable} from "./Savable.js";

export class LocalStorage {
    setItem(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    getItem(key) {
        return JSON.parse(window.localStorage.getItem(key) || '[]');
    }

    getByObjectType(objectType) {
        if (!objectType || !(Savable.isPrototypeOf(objectType))) {
            throw new Error('Invalid object type');
        }
        return this.getAllItems(objectType.prototype.key).map(object => objectType.fromJSON(object));
    }
    getAllItems(key) {
        return Object.keys(window.localStorage)
            .filter(k => k.includes(key))
            .map(k => JSON.parse(window.localStorage.getItem(k)));
    }
    getItemByFilter(key, filter) {
        return this.getItem(key).filter(filter);
    }
    removeItem(key)  {
        window.localStorage.removeItem(key);
    }
    clear() {
        window.localStorage.clear();
    }

    removeByFilter(key, filter) {
        const items = this.getItem(key);
        const filteredItems = items.filter(filter);
        this.setItem(key, filteredItems);
    }
}