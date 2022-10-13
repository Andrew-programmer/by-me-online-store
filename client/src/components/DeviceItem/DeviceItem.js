import React, {useContext} from 'react';
import {Button, ButtonGroup, Card, Image} from "react-bootstrap";
import star from '../../assets/star.png'
import {DEVICE_ROUTE} from "../../utils/consts";
import {AiFillDelete} from 'react-icons/ai'

import styles from './DeviceItem.module.css'
import {useNavigate} from "react-router-dom";
import {API_URL} from "../../urls";
import {Context} from "../../index";
import {removeBasketDevice} from "../../http/basketDeviceApi";

const DeviceItem = ({device, inBasket = false}) => {
    const {brand, basketDevices} = useContext(Context);

    const handleDeleteClick = async (deviceId) => {
        
        removeBasketDevice(deviceId).then((data) => {
                console.log(data);
            }
        )
    }

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
                            <Button variant={"dark"} sx={{
                                width: 10,
                                height: 10
                            }}>-</Button>
                            <span className={styles.count + ' bg-dark'}>{1}</span>
                            <Button variant={"dark"} bg={"black"}>+</Button>
                        </ButtonGroup>
                        <Button variant={"outline-danger"} onClick={() => handleDeleteClick(device.id)}
                                className={styles.deleteButton}><AiFillDelete/></Button>
                    </div>
                    : ''
            }
        </Card>
    );
};

export default DeviceItem;
