/**
 * Описание сущности любого персонажа
 * @param {*} hitPoints максимальное здоровье Персонажа
 * @param {*} endurancePoints максимальная выносливость персонажа
 * @param {*} movementPointsPoints максимальный допуск передвижения персонажа
 * @param {*} stats объект характеристик персонажа, таких как база атаки, база защиты и т.д
 * @param {*} position стартовая позиция персонажа
 * @returns
 */

export class Entity{
    constructor(hitPoints, endurancePoints, movementPoints, stats, position){
        this._maxHitPoints = hitPoints;
        this._hitPoints = hitPoints; 
        this._endurancePoints = endurancePoints;
        this._maxEndurancePoints = endurancePoints;
        this._movementPoints = movementPoints;
        this._maxMovementPoints = movementPoints;
        this._stats = stats;
        this._position = position;
    }

    isAlive(){
        return this._hitPoints > 0
    }

    getDamage(damage){
        this._hitPoints -= damage;
    }

    dealDamage(target, weapon){
        let damage = weapon.getDamage();
        target.getDamage(damage);
    }
}