import {$authHost, $host} from "./index";
import {DEVICE_URL, TYPE_URL} from "../urls";

export const createDevice = async (device) => {
    const {data} = await $authHost.post(DEVICE_URL, device);
    return data;
}

export const fetchDevices = async (typeId = null, brandId = null, page = null, limit = null) => {
    debugger
    const {data} = await $host.get(DEVICE_URL, {
        params: {
            typeId, brandId, page, limit
        }
    });
    return data;
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get(DEVICE_URL + '/' + id);
    return data;
}
