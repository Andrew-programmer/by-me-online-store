import {makeAutoObservable} from "mobx";

export default class RatingStore {
    constructor() {
        this._ratings = [];
        makeAutoObservable(this)
    }

    static #calculateAverage(arr){
        let total = 0;
        for(let item of arr){
            total += item.rate;
        }

        return total / arr.length;
    }

    setRatings(ratings){
        this._ratings = ratings;
    }

    getAverage(deviceId){
        debugger
        let rating = this._ratings.filter(rating => rating.deviceId === deviceId);
        if(rating.length === 0){
            return 0;
        }

        return RatingStore.#calculateAverage(rating);
    }

    getByUser(userId, deviceId){
        const rating = this._ratings.filter(rating => {
            return rating.userId === userId && rating.deviceId === deviceId;
        })

        return rating.length === 0 ? 0 : rating[0].rate;
    }

    check(userId, deviceId){
        const rating = this._ratings.filter(rating => {
            return rating.userId === userId && rating.deviceId === deviceId;
        })

        return rating.length === 0;
    }

}
