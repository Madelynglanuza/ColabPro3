import { Savable } from "./Savable.js";

export class LocalStorage {
    static savable_classes = {};

    static registerSavableClass(...savableClasses) {
        for (const savableClass of savableClasses) {
            if (!(savableClass.prototype instanceof Savable)) {
                throw new Error('Class must inherit from Savable');
            }
            LocalStorage.savable_classes[savableClass.name] = savableClass;
        }
    }

    constructor() {
        this.storage = window.localStorage;
    }

    addItem(item) {
        const key = `${item.constructor.name.toLowerCase()}_storage`;

        let items = this.getAllItems(item.constructor);
        Object.values(items).forEach(item => this.replaceToReference(item));

        item = this.replaceToReference(item);
        items[item.id] = item;
        this.storage.setItem(key, JSON.stringify(items));
    }

    removeItemById(id, itemClass) {
        const key = `${itemClass.name.toLowerCase()}_storage`;
        const items = this.getAllItems(itemClass);
        if (items[id]) {
            delete items[id];
            this.storage.setItem(key, JSON.stringify(items));
        }
    }

    getAllItems(itemClass) {
        const key = `${itemClass.name.toLowerCase()}_storage`;
        const items = JSON.parse(this.storage.getItem(key)) || {};
        const deserializedItems = {};

        for (const id in items) {
            if (items.hasOwnProperty(id)) {
                try {
                    let item = itemClass.fromJSON(items[id]);
                    this.replaceReferences(item);
                    deserializedItems[id] = item;
                } catch (error) {
                    console.error(`Error deserializing item with id ${id}:`, error);
                }
            }
        }
        return deserializedItems;
    }

    replaceReferences(item) {
        const replaceReference = (element) => {
            if (element && element.id && element.key && element.reference) {
                const itemClass = LocalStorage.savable_classes[element.key];
                return this.getItemById(element.id, itemClass) || null;
            }
            return element;
        };

        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (Array.isArray(item[key])) {
                    item[key] = item[key].map(replaceReference).filter(Boolean);
                } else {
                    item[key] = replaceReference(item[key]);
                    if (item[key] === null) {
                        delete item[key];
                    }
                }
            }
        }
        return item;
    }

    replaceToReference(item) {
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (item[key] instanceof Savable) {
                    item[key] = item[key].toReference();
                } else if (Array.isArray(item[key])) {
                    item[key] = item[key].map(element => {
                        if (element instanceof Savable) {
                            this.addItem(element);
                            return element.toReference();
                        }
                        return element;
                    });
                }
            }
        }
        return item;
    }

    getItemById(id, itemClass) {
        const items = this.getAllItems(itemClass);
        return items[id] || null;
    }
}