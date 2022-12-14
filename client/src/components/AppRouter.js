import React, {useContext} from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import {authRoutes, publicRoutes} from "../routes";
import {SHOP_ROUTE} from "../utils/consts";
import Shop from "../pages/Shop/Shop";
import {Context} from "../index";

const AppRouter = () => {
    const {user} = useContext(Context);

    console.log(user);
    return (
        <Routes>
            {user.isAuth && authRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact/>
            })}
            {publicRoutes.map(({path, Component}) => {
                return <Route key={path} path={path} element={<Component/>} exact/>
            })}
            <Route path='*' element={<Shop/>}/>
        </Routes>
    );
};

export default AppRouter;