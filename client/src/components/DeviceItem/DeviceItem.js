import React, {useContext, useEffect} from 'react';
import {Button, ButtonGroup, Card, Image} from "react-bootstrap";
import star from '../../assets/star.png'
import {DEVICE_ROUTE} from "../../utils/consts";
import {AiFillDelete} from 'react-icons/ai'

import styles from './DeviceItem.module.css'
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../urls";
import {Context} from "../../index";
import {addCountBasketDevice, removeBasketDevice, removeCountBasketDevice} from "../../http/basketDeviceApi";
import {check} from "../../http/userApi";

const DeviceItem = ({device, inBasket = false, basketDevice, handleAdd, handleDelete, handleRemove}) => {
    const {brand} = useContext(Context);



    const navigate = useNavigate()
    return (
        <Card style={{maxWidth: 800, minHeight: 200, maxHeight: 250, cursor: 'pointer'}}
              onClick={() => navigate(`${DEVICE_ROUTE}/${device.id}`)} className={styles.deviceCard}>
            <Image src={API_URL + device.img} className={styles.deviceImg}/>
            <div className='text-black-50 d-flex justify-content-between'>
                <div>
                    {brand.getOneBrand(device.brandId).name}
                </div>
                <div className='d-flex align-items-center'>
                    <div>{device.rating}</div>
                    <Image width={18} height={18} src={star}/>
                </div>
            </div>
            <div>{device.name}</div>
            {
                inBasket ?
                    <div className={styles.countActions}>
                        <ButtonGroup aria-label={'Count actions'}>
                            <Button
                                variant={"dark"}
                                sx={{
                                    width: 10,
                                    height: 10
                                }}
                                onClick={(event) => handleRemove(event, basketDevice.id, basketDevice.count)}
                            >-</Button>
                            <span className={styles.count + ' bg-dark'}>{basketDevice.count}</span>
                            <Button variant={"dark"} bg={"black"}
                                    onClick={(event) => handleAdd(event, basketDevice.id)}>+</Button>
                        </ButtonGroup>
                        <Button variant={"outline-danger"}
                                onClick={(event) => handleDelete(event, basketDevice.id)}
                                className={styles.deleteButton}><AiFillDelete/></Button>
                    </div>
                    : ''
            }
        </Card>
    );
};

export default DeviceItem;
