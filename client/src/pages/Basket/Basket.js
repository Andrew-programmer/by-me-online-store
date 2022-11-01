import React, {useContext, useEffect, useState} from 'react';
import styles from './Basket.module.css';
import BasketMainBody from "../../components/BasketMainBody/BasketMainBody";
import {Context} from "../../index";
import {fetchBasketDevices} from "../../http/basketDeviceApi";

const Basket = () => {
    const {basketDevices} = useContext(Context);

    useEffect(() => {
        fetchBasketDevices().then((data) => {
            basketDevices.setDevices(data);
        })
    }, [])

    return (
        <div className={styles.Main}>
            <h1>Your products</h1>
            <BasketMainBody/>
        </div>
    );
};

export default Basket;
