import {$authHost, $host} from "./index";
import {RATING_URL} from "../urls";

export const fetchRatings = async () => {
    const {data} = await $host.get(RATING_URL);
    return data.rating;
}

export const setRating = async (rate, deviceId) => {
    const {data} = await $authHost.post(RATING_URL, {rate}, {
        params: {
            deviceId
        }
    })
    return data.rating;
}

export const updateRating = async (rate, deviceId) => {
    const {data} = await $authHost.put(RATING_URL, {rate}, {
        params: {
            deviceId
        }
    })
    return data.rating;
}
