import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import './App.css';
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./index";
import {check} from "./http/userApi";
import {Container, Spinner} from "react-bootstrap";
import {fetchTypes} from "./http/typeApi";
import {fetchBrands} from "./http/brandApi";
import {fetchDevices} from "./http/deviceApi";
import {fetchBasketDevices} from "./http/basketDeviceApi";

const App = observer(() => {
    const {user, brand, type, device, basketDevices} = useContext(Context);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTypes().then(data => {
            type.setTypes(data)
        })

        fetchBrands().then(data => {
            brand.setBrands(data);
        });

        fetchDevices().then(data => {
            device.setDevices(data.rows);
        })

        fetchBasketDevices().then((data) => {
            basketDevices.setDevices(data);
        })

        check().then(data => {
            debugger
            user.setUser(true);
            user.setIsAuth(true);
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    if (loading) {
        return <Container style={{width: '100%', height: 700}} className='d-flex justify-content-center align-items-center'>
            <Spinner animation='border' style={{width: 50, height: 50}}/>
        </Container>
    }

    return (
        <BrowserRouter>
            <NavBar/>
            <AppRouter/>
        </BrowserRouter>
    );
});

export default App;
