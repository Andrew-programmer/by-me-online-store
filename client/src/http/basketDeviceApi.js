import {$authHost} from "./index";
import {BASKET_DEVICE} from "../urls";

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

export const removeBasketDevice = async (deviceId) => {
    const {data} = await $authHost.delete(BASKET_DEVICE,  {
        params: {
            id: deviceId
        }
    })

    return data;
}

export const deleteAllUsersBasketDevices = async () => {
    const {data} = await $authHost.delete(BASKET_DEVICE + deleteAll);

    return data;
}
