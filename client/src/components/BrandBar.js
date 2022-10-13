import React, {useContext} from 'react';
import {Card, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const BrandBar = observer(() => {
    const {brand} = useContext(Context);

    return (
        <Row className='d-flex flex-row flex-wrap mt-3 ms-0'>
            {brand.brands.map(brandItem => {
                return <Card
                    style={{width: 100, cursor: "pointer"}}
                    key={brandItem.id}
                    className="p-3 me-1 d-flex align-items-center"
                    action variant='dark'
                    onClick={() => brand.setSelectedBrand(brandItem)}
                    border={brandItem.id === brand.selectedBrand.id ? 'dark': 'light'}
                >
                    {brandItem.name}
                </Card>
            })}
        </Row>
    );
});

export default BrandBar;