import {$authHost, $host} from "./index";
import {BRAND_URL, TYPE_URL} from "../urls";

export const createBrand = async (brand) => {
    const {data} = await $authHost.post(BRAND_URL, brand);
    return data;
}

export const fetchBrands = async () => {
    const {data} = await $host.get(BRAND_URL);
    return data;
}
