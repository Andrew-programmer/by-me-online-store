import React, {useContext, useState} from 'react';
import {Button, Col, Container, Dropdown, Form, Modal, Row} from "react-bootstrap";
import {Context} from "../../index";
import {useEffect} from "react";
import {fetchTypes} from "../../http/typeApi";
import {fetchBrands} from "../../http/brandApi";
import {observer} from "mobx-react-lite";
import {createDevice} from "../../http/deviceApi";

const CreateDevice = observer(({show, onHide}) => {
    const {type} = useContext(Context);
    const {brand} = useContext(Context);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState(null);
    const [info, setInfo] = useState([]);

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]);
    }
    const deleteInfo = (id) => {
        setInfo(info.filter(item => item.number !== id));
    }

    const changeInfo = (key, value, number) => {
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i));
    }

    const selectFile = (file) => {
        setFile(file);
    }

    const addDevice = () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', `${price}`);
        formData.append('img', file);
        formData.append('brandId', brand.selectedBrand.id);
        formData.append('typeId', type.selectedType.id);
        formData.append('info', JSON.stringify(info));

        createDevice(formData).then(data => onHide());
    }

    useEffect(() => {
        fetchTypes().then(data => {
            type.setTypes(data)
        })

        fetchBrands().then(data => {
            brand.setBrands(data);
        });
    }, [])

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add new device
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Container className='d-flex align-items-center justify-content-around'>
                        <Container style={{width: 200}} className='d-flex flex-column align-items-lg-center'>
                            <Dropdown className='m-2'>
                                <Dropdown.Toggle variant={"dark"}>{type.selectedType.name || 'Choose type'}</Dropdown.Toggle>
                                <Dropdown.Menu variant={"dark"}>
                                    {type.types.map(typeItem => {
                                        return <Dropdown.Item onClick={() => type.setSelectedType(typeItem)} key={typeItem.id}>{typeItem.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                            <Dropdown className='m-2'>
                                <Dropdown.Toggle variant={"dark"}>{brand.selectedBrand.name || 'Choose brand'}</Dropdown.Toggle>
                                <Dropdown.Menu variant={"dark"}>
                                    {brand.brands.map(brandItem => {
                                        return <Dropdown.Item onClick={() => brand.setSelectedBrand(brandItem)} key={brandItem.id}>{brandItem.name}</Dropdown.Item>
                                    })}
                                </Dropdown.Menu>
                            </Dropdown>
                        </Container>
                        <div className='vr'/>
                        <Container>
                            <Form.Control
                                placeholder={'Name...'}
                                className='mt-2'
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                            <Form.Control
                                type='number'
                                placeholder={'Price...'} className='mt-2'
                                value={price}
                                onChange={(event) => setPrice(+event.target.value)}
                            />
                            <Form.Control
                                type='file'
                                className='mt-2'
                                onChange={(event) => selectFile(event.target.files[0])}
                            />
                        </Container>
                    </Container>
                    <hr/>
                    <Container>
                        <Container className='d-flex flex-row justify-content-between'>
                            <h3 className='ms-0'>Stats</h3>
                            <Button
                                variant='outline-secondary'
                                style={{width: 30, height: 30, fontSize: 20}}
                                className='d-flex justify-content-center align-items-center'
                                onClick={addInfo}
                            >
                                +
                            </Button>
                        </Container>

                        <Container>
                            {
                                info.map(item => {
                                    debugger
                                    return <Row className='mt-3 d-flex justify-content-between' key={item.number}>
                                        <Col md={4} className='d-flex justify-content-center'>
                                            <Form.Control
                                                value={item.title}
                                                onChange={(event) => changeInfo('title', event.target.value, item.number)}
                                                placeholder={'Name...'}
                                            />
                                        </Col>
                                        <Col md={4} className='d-flex justify-content-center'>
                                            <Form.Control
                                                value={item.description}
                                                onChange={(event) => changeInfo('description', event.target.value, item.number)}
                                                placeholder={'Description...'}
                                            />
                                        </Col>
                                        <Col md={4} className='d-flex justify-content-center'>
                                            <Button variant={"outline-danger"}
                                                    onClick={() => deleteInfo(item.number)}>Delete</Button>
                                        </Col>
                                    </Row>
                                })
                            }
                        </Container>

                    </Container>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"outline-danger"} onClick={onHide}>Close</Button>
                <Button variant={"outline-secondary"} onClick={addDevice}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;
