import {makeAutoObservable} from "mobx";

export default class DeviceStore {
    constructor() {
        this._devices = []
        this._page = 1
        this._totalCount = 0
        this._limit = 5
        makeAutoObservable(this)
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    getDeviceByID(id){
        return this.devices.filter(device => device.id === id)[0];
    }

    get devices() {
        return this._devices;
    }
    get totalCount() {
        return this._totalCount;
    }
    get page() {
        return this._page;
    }
    get limit() {
        return this._limit;
    }

}
