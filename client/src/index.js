import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/UserStore";
import TypesStore from "./store/TypesStore";
import BrandsStore from "./store/BrandsStore";
import DeviceStore from "./store/DeviceStore";
import BasketDeviceStore from "./store/BasketDeviceStore";
import RatingStore from "./store/RatingStore";

export const Context = createContext(null);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        type: new TypesStore(),
        brand: new BrandsStore(),
        device: new DeviceStore(),
        basketDevices: new BasketDeviceStore(),
        ratings: new RatingStore()
    }}>
        <App />
    </Context.Provider>
);
