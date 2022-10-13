import {makeAutoObservable} from "mobx";

export default class BasketDeviceStore {
    constructor() {
        this._basketDevices = [];
        makeAutoObservable(this);
    }

    setDevices(devices){
        this._basketDevices = devices;
    }

    deleteBasketDevice(deviceId){
        this._basketDevices = this._basketDevices.filter(device => device.deviceId !== deviceId);
    }

    get basketDevicesIDs(){
        return this._basketDevices;
    }
}
