import React, {useContext, useEffect, useRef, useState} from 'react';
import styles from './BasketMainBody.module.css';
import DeviceItem from "../DeviceItem/DeviceItem";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {addCountBasketDevice, removeBasketDevice, removeCountBasketDevice} from "../../http/basketDeviceApi";


const BasketMainBody = observer(() => {
    const {device, basketDevices} = useContext(Context);

    useEffect(() => {
        basketDevices.setTotalPrice(getTotalPrice());
    }, [])

    function getTotalPrice() {
        let totalPrice = 0;
        basketDevices.basketDevicesIDs.map(basketDeviceItem => {
                const basketDevice = device.getDeviceByID(basketDeviceItem.deviceId);
                totalPrice += basketDevice.price * basketDeviceItem.count;
            }
        )

        return totalPrice;
    }

    const handleAddClick = async (event, id) => {
        event.stopPropagation();
        await addCountBasketDevice(id);
        basketDevices.addCount(id);

        basketDevices.setTotalPrice(getTotalPrice());
    }

    const handleRemoveClick = async (event, id, count) => {
        event.stopPropagation();
        const checkCountValue = (value) => {
            return value > 1;
        }

        if (checkCountValue(count)) {
            await removeCountBasketDevice(id);
            basketDevices.removeCount(id);
        }

        basketDevices.setTotalPrice(getTotalPrice());
    }

    const handleDeleteClick = async (event, id) => {
        event.stopPropagation();

        await removeBasketDevice(id);

        basketDevices.removeBasketDevice(id);

        basketDevices.setTotalPrice(getTotalPrice());
    }


    return (
        basketDevices.basketDevicesIDs.length !== 0 ?
            <>
                <h2>Total price: {basketDevices.getTotalPrice()}$</h2>
                <section className={styles.main}>
                    {
                        basketDevices.basketDevicesIDs.map(basketDeviceItem => {
                            const basketDevice = device.getDeviceByID(basketDeviceItem.deviceId);
                            return <DeviceItem
                                key={basketDeviceItem.id}
                                basketDevice={basketDeviceItem}
                                device={basketDevice}
                                handleAdd={handleAddClick}
                                handleRemove={handleRemoveClick}
                                handleDelete={handleDeleteClick}
                                inBasket={true}
                            />
                        })
                    }
                </section>
            </>
            : <h2>Empty</h2>

    );

});

export default BasketMainBody;
