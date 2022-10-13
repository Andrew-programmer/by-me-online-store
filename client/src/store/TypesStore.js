import {makeAutoObservable} from "mobx";

export default class TypesStore {
    constructor() {
        this._types = []
        this._selectedType = {};
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types;
    }

    addType(type) {
        this._types = {...this._types, type};
    }

    getOneType(id){
        return this._types.filter(type => type.id === id);
    }

    setSelectedType(type) {
        this._selectedType = type;
    }

    get selectedType() {
        return this._selectedType;
    }

    get types() {
        return this._types;
    }
}