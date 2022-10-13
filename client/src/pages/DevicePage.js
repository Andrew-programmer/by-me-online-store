import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/bigStar.png'
import 'antd/dist/antd.css'
import {createBasketDevice} from "../http/basketDeviceApi";


import {useParams} from "react-router-dom";
import {fetchOneDevice} from "../http/deviceApi";
import {API_URL} from "../urls";
import StarRating from "../components/StarRating/StarRating";
import {Rate} from "antd";

const DevicePage = () => {
    const [device, setDevice] = useState({info: []});
    const {id} = useParams();

    const handleBasketClick = async () => {
        await createBasketDevice(id);
    }

    useEffect(() => {
        fetchOneDevice(id).then(data => {
            setDevice(data);
        })
    }, [])
    return (
        <Container className='mt-3'>
            <Row>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <Image src={API_URL + device.img} width={300} height={300}/>
                </Col>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <Row className='d-flex flex-column align-items-center align-content-center'>
                        <h2 style={{textAlign: "center"}}>{device.name}</h2>
                        <div
                            className='d-flex align-items-center justify-content-center'
                            style={{
                                background: `url(${bigStar}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: 310,
                                color: "white",
                                fontSize: 40
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4} className='d-flex justify-content-center align-items-center'>
                    <Card
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: '1px solid black'
                        }}
                    >
                        <h3>From: {device.price}$</h3>
                        <Rate allowHalf defaultValue={device.rating}/>
                        <Button variant={"outline-secondary"} onClick={handleBasketClick}>To basket</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex align-items-center justify-content-center'>
                <Container className='d-flex flex-column m-3 mt-5'
                           style={{width: 800}}>
                    <h1>Characteristics</h1>
                    {device.info.map((descriprionItem, index) => {
                        return <Row
                            key={descriprionItem.id}
                            style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}
                        >
                            {descriprionItem.title}: {descriprionItem.description}
                        </Row>
                    })}
                </Container>

            </Row>
        </Container>
    );
};

export default DevicePage
