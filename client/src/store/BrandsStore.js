import {makeAutoObservable} from "mobx";

export default class BrandsStore {
    constructor() {
        this._brands = []
        this._selectedBrand = {};
        makeAutoObservable(this)
    }

    setBrands(brands) {
        this._brands= brands;
    }

    addBrand(brand) {
        this._brands = {...this._brands, brand};
    }

    getOneBrand(id){
        debugger
        for (let brand in this._brands) {
            if(this._brands[brand].id === id) {
                return this._brands[brand];
            }
        }
    }

    setSelectedBrand(brand){
        this._selectedBrand = brand;
    }

    get selectedBrand() {
        return this._selectedBrand;
    }

    get brands() {
        return this._brands;
    }
}