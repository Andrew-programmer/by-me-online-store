import {$authHost} from "./index";
import {ADD_COUNT_BASKET_DEVICE, BASKET_DEVICE, REMOVE_COUNT_BASKET_DEVICE} from "../urls";

const deleteAll = '/all';

export const fetchBasketDevices = async () => {
    const {data} = await $authHost.get(BASKET_DEVICE);
    return data.basketDevices;
}

export const createBasketDevice = async (deviceId) => {
    const {data} = await $authHost.post(BASKET_DEVICE, null, {
        params: {
            deviceId
        }
    });

    return data;
}

export const removeBasketDevice = async (id) => {
    const {data} = await $authHost.delete(BASKET_DEVICE,  {
        params: {
            id
        }
    })

    return data;
}

export const addCountBasketDevice = async (id) => {
    const {data} = await $authHost.put(BASKET_DEVICE + ADD_COUNT_BASKET_DEVICE, null, {
        params: {
            id
        }
    })

    return data;
}

export const removeCountBasketDevice = async (id) => {
    const {data} = await $authHost.put(BASKET_DEVICE + REMOVE_COUNT_BASKET_DEVICE, null, {
        params: {
            id
        }
    })

    return data;
}

export const deleteAllUsersBasketDevices = async () => {
    const {data} = await $authHost.delete(BASKET_DEVICE + deleteAll);

    return data;
}
