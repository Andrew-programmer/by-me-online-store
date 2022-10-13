import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import DeviceItem from "../DeviceItem/DeviceItem";
import style from './DeviceList.module.css'

const DeviceList = observer(() => {
    const {device} = useContext(Context);

    return (
        <section className={style.deviceList}>
            {device.devices.map(deviceItem => {
                return <DeviceItem
                    key={deviceItem.id}
                    device={deviceItem}
                />
            })}
        </section>

    );
});

export default DeviceList;
