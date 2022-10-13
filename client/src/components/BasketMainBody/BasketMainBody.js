import React, {useContext} from 'react';
import styles from './BasketMainBody.module.css';
import DeviceItem from "../DeviceItem/DeviceItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";


const BasketMainBody = observer(() => {
    const {device, basketDevices} = useContext(Context);


    return (
        <section className={styles.main}>
            {
                basketDevices.basketDevicesIDs.length !== 0 ? basketDevices.basketDevicesIDs.map(basketDeviceItem => {
                    const basketDevice = device.getDeviceByID(basketDeviceItem.deviceId);
                    return <DeviceItem
                        key={basketDeviceItem.id}
                        device={basketDevice}
                        inBasket={true}
                    />
                }) : <h2>Empty</h2>
            }
        </section>

    );

});

export default BasketMainBody;
