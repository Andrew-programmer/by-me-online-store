import {makeAutoObservable} from "mobx";

export default class BasketDeviceStore {
    constructor() {
        this._basketDevices = [];
        this._totalPrice = 0;
        makeAutoObservable(this);
    }

    setDevices(devices){
        this._basketDevices = devices;
    }

    removeBasketDevice(id){
        this._basketDevices = this._basketDevices.filter(device => device.id !== id);
    }

    addCount(id){
        this._basketDevices = this._basketDevices.map(basketDevice => {
            if(id === basketDevice.id){
                basketDevice.count = ++basketDevice.count;
            }

            return basketDevice;
        })
    }

    removeCount(id){
        this._basketDevices = this._basketDevices.map(basketDevice => {
            if(id === basketDevice.id){
                basketDevice.count = --basketDevice.count;
            }

            return basketDevice;
        })
    }

    get basketDevicesIDs(){
        return this._basketDevices;
    }

    setTotalPrice(price) {
        this._totalPrice = price;
    }

    getTotalPrice() {
        return this._totalPrice;
    }
}
