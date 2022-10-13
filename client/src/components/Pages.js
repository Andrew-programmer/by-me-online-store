import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {device} = useContext(Context);
    const pageCount = Math.ceil(device.totalCount / device.limit);
    const pages = [];
    debugger

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1);
    }

    return (
        <Pagination className='mt-5' >
            {pages.map(page => {
                return <Pagination.Item
                    active={device.page === page}
                    key={page}
                    onClick={() => device.setPage(page)}
                >
                    {page}</Pagination.Item>
            })}
        </Pagination>
    );
});

export default Pages;
