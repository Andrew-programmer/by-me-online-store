import {$authHost, $host} from "./index";
import {TYPE_URL} from "../urls";

export const createType = async (type) => {
    const {data} = await $authHost.post(TYPE_URL, type);
    return data;
}

export const fetchTypes = async () => {
    const {data} = await $host.get(TYPE_URL);
    return data;
}
