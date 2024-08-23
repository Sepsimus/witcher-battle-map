/**
 * Описание сущности Эффекта
 * @param {string} name название Эффекта
 * @param {number} duration продолжительность Эффекта
 * @returns
 */

export class Effect{
    constructor(name, duration){
        this._name = name;
        this._duration = duration;
    }

    getName(){
        return this._name
    }

    getDuration(){
        return this._duration
    }

    count(){
        this._duration -= 1;
    }

}

export class BleedingEffect extends Effect{ // эффект кровотечения наносит урон каждый ход
    constructor(name = 'Кровотечение', duration, damage){
        super(name, duration);
        this._damage = damage
    }
    
    getDamage(){
        return this._damage;
    }
}