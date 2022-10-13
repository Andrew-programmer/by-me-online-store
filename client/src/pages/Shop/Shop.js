import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import TypeBar from "../../components/TypeBar";
import BrandBar from "../../components/BrandBar";
import {Context} from "../../index";

import styles from './Shop.module.css'
import {observer} from "mobx-react-lite";
import {fetchTypes} from "../../http/typeApi";
import {fetchBrands} from "../../http/brandApi";
import {fetchDevices} from "../../http/deviceApi";
import Pages from "../../components/Pages";
import DeviceList from "../../components/DeviceList/DeviceList";

const Shop = observer(() => {
    const {type, brand, device} = useContext(Context);

    useEffect(() => {
        fetchDevices(type.selectedType.id, brand.selectedBrand.id, device.page, device.limit).then(data => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
    }, [device.page, type.selectedType, brand.selectedBrand])

    return (
        <Container style={{maxWidth: "initial"}}>
            <Row className='mt-2'>
                <Col md={3}>
                    <TypeBar/>
                </Col>
                <Col md={9}>
                    <BrandBar/>
                    <DeviceList/>
                    <Pages/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;
