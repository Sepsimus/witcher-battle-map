/**
 * Описание сущности Предмета
 * @param {string} name название Предмета
 * @param {number} weight вес Предмета
 * @param {number} cost цена Предмета
 * @returns
 */
class Item{
    constructor(name, weight, cost){
        this._name = name;
        this._weight = weight;
        this._cost = cost;
    }

    getName(){
        return this._name;
    }

    getWeight(){
        return this._weight;
    }

    getCost(){
        return this._cost;
    }
}

export default Item;