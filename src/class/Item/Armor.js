import Item from "./Item";
/**
 * Описание сущности Брони, наследуется от Предмета
 * @param {number} toughness показывает прочность Брони 
 * @param {string} rare редкость Брони: Повсеместное(П), Обычное(О), Редкое(Р), Уникальное(У)
 * @param {number} strengthening число Усилений Брони
 * @param {number} stiffness скованность Брони, вычитается из Ловкости(Лвк) и Реакции(Реа)
 * @param {string} type на какую часть тела Броня: Голова(Г), Туловище(Т), Правая Рука(Пр), Левая Рука(Лр), Правая Нога(Пн), Левая Нога(Лн)
 * @returns
 */
class Armor extends Item{
    constructor(name, weight, cost, toughness, rare, strengthening, stiffness, type){
        super(name, weight, cost);
        this._toughness = toughness;
        this._rare = rare;
        this._strengthening = strengthening;
        this._stiffness = stiffness;
        this._type = type;
    }

    getToughness(){
        return this._toughness;
    }

    getStiffness(){
        return this._stiffness;
    }
}

export  default Armor;