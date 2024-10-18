import {Savable} from "./Savable.js";

export class LocalStorage {
    constructor() {
        this.storage = window.localStorage;
    }

    addItem(item) {
        const key = `${item.constructor.name.toLowerCase()}_storage`;
        const items = this.getAllItems(item.constructor);
        items[item.id] = item.toJSON(); // Serialize the item
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
            deserializedItems[id] = itemClass.fromJSON(items[id]);
        }
        return deserializedItems;
    }

    getItemById(id, itemClass) {
        const key = `${itemClass.name.toLowerCase()}_storage`;
        const items = this.getAllItems(itemClass);
        return items[id] || null;
    }
}