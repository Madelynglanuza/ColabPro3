import {Savable} from "./Savable.js";

const savable_classes = [];

export class LocalStorage {
    static savable_classes = {};

    static registerSavableClass(savableClass) {
        if (!(savableClass.prototype instanceof Savable)) {
            throw new Error('Class must inherit from Savable');
        }
        LocalStorage.savable_classes[savableClass.name] = savableClass;
    }

    constructor() {
        this.storage = window.localStorage;
    }

    addItem(item) {
        const key = `${item.constructor.name.toLowerCase()}_storage`;
        const items = this.getAllItems(item.constructor);
        this.replaceToReference(item);
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
        // Deserialize the items
        const deserializedItems = {};
        for (const id in items) {
            let item = itemClass.fromJSON(items[id]);
            this.replaceReferences(item);
            deserializedItems[id] = item;
        }
        return deserializedItems;
    }

    replaceReferences(item) {
        for (const key in item) {
            if (item[key] && item[key].id && item[key].key && item[key].reference) {
                const itemClass = LocalStorage.savable_classes[item[key].key];
                item[key] = this.getItemById(item[key].id, itemClass);
            } else if (Array.isArray(item[key])) {
                item[key].forEach((element, index) => {
                    if (element && element.id && element.key && element.reference) {
                        const itemClass = LocalStorage.savable_classes[element.key];
                        item[key][index] = this.getItemById(element.id, itemClass);
                    }
                });
            }
        }
        return item;
    }

    replaceToReference(item) {
        for (const key in item) {
            if (item[key] instanceof Savable) {
                item[key] = item[key].toReference();
            } else if (Array.isArray(item[key])) {

                item[key].forEach((element, index) => {
                    if (element instanceof Savable) {
                        this.addItem(element);
                        item[key][index] = element.toReference();
                    }
                });
            }
        }

        return item;
    }

    getItemById(id, itemClass) {
        const key = `${itemClass.name.toLowerCase()}_storage`;
        const items = this.getAllItems(itemClass);
        return items[id] || null;
    }
}