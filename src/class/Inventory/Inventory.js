import Item from "../Item/Item";

/**
 * Описание сущности Инвентаря
 * @param {number} portableWeight показывает максимально допустимый вес Инвентаря 
 * @returns
 */
class Inventory{
    constructor(portableWeight){
        this._portableWeight = portableWeight;
        this._currentWeight = 0;
        this._container = Array();
    }

    addItem(item){
        if(!(item instanceof Item)) {
            throw new Error("Вы добавляете не предмет(item не наследуется от Item)");
        }
        if(this._currentWeight + item.getWeight() > this._portableWeight){
            throw new Error("Вы не можете нести этот предмет по причине перегрузки");    
        }
        this._currentWeight += item.getWeight();
        this._container.push(item);
    }

    removeItem(item){
        this._currentWeight -= item.getWeight();
        const indexOfItem = this._container.indexOf(item);
        this._container.splice(indexOfItem, 1);
    }

    getItem(item){
        const indexOfItem = this._container.indexOf(item);
        return this._container[indexOfItem];
    }
}

export default Inventory;