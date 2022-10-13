import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {ListGroup} from "react-bootstrap";


const TypeBar = observer(() => {
    const {type} = useContext(Context);

    return (
        <ListGroup>
            {type.types.map(typeItem => {
                return <ListGroup.Item
                    style={{cursor: "pointer"}}
                    active={typeItem.id === type.selectedType.id}
                    onClick={() => type.setSelectedType(typeItem)}
                    key={typeItem.id}
                    action variant='dark'
                >
                    {typeItem.name}
                </ListGroup.Item>
            })}
        </ListGroup>
    );
});

export default TypeBar;