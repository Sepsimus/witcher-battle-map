/**
 * Описание сущности Оружия, наследуется от Предмета
 * @param {string} type показывает какой тип урона наносит Оружие: Режущий(Р), Колющий(К), Дробящий(Д), Стихийный(С) 
 * @param {number} accuracy точность Оружия, модификатор прибавляется к проверке на попадание
 * @param {string} rare редкость Оружия: Повсеместное(П), Обычное(О), Редкое(Р), Уникальное(У)
 * @param {number} damage число кубов Оружия в системе d6
 * @param {number} damageMod модификатор урона Оружия, прибавляется к урону
 * @param {number} reliability надежность Оружия, число повреждений которое оружие может выдержать до поломки
 * @param {number} grip хват оружия, определяет сколько рук занято 
 * @param {number=} distance дистанция атаки Оружия
 * @param {*} effect массив эффектов которые может наложить Оружие
 * @param {number} percentForEffect массив процентов успешного наложения эффектов
 * @param {string} stealth скрытность Оружия: Маленькое(М), Небольшое (Н), Крупное(К), Не спрятать (Н/С)
 * @param {number} strengthening число Усилений Оружия
 * @returns
 */

import throwD6Dice from "../../utils/throwD6Dice";
import Item from "./Item";

class Weapon extends Item{
    constructor(name, weigth, cost, type, accuracy, rare, damage, damageMod, reliability, grip, distance, effects, percentForEffects, stealth, strengthening){
        super(name, weigth, cost);
        this._type = type;
        this._accuracy = accuracy;
        this._rare = rare;
        this._damage = damage;
        this._damageMod = damageMod;
        this._reliability = reliability;
        this._grip = grip;
        this._distance = distance;
        this._effects = effects;
        this._percentForEffects = percentForEffects;
        this._stealth = stealth;
        this._strengthening = strengthening;
    }

    getDamage(){ // Возвращает урон в системе 3d6+2 где 3 число кубиков(this._damage), а 2 модификатор урона(this._damageMod)
        return throwD6Dice(this._damage) + this._damageMod;
    }

    getEffect(){ // проходит по массиву эффектов и возвращает сработавшие эффекты 
        let applyEffects = [];
        this._effects.forEach((effect, index) => {
            if(Math.floor(Math.random() * 100 + 1) <= this._percentForEffect[index])
                applyEffects.push(effect);
        })
        return applyEffects;
    }
}

export default Weapon;