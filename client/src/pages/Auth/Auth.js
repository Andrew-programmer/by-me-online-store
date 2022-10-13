import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import styles from './Auth.module.css'
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {login, registration} from "../../http/userApi";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Auth = observer(() => {
    const {user} = useContext(Context);
    const location = useLocation();
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const navigate = useNavigate();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const handleClick = async (email, password) => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);

            } else{
                data = await registration(email, password);
            }

            user.setUser(user);
            user.setIsAuth(true);
            navigate(SHOP_ROUTE);
        } catch (e) {
            alert(e.response.data.message);
        }

    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{height: window.innerHeight - 54}}
        >
            <Card style={{width: 600}} className={'p-5'}>
                <h2 className='m-auto'>{isLogin ? 'Login' : 'Registration'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        placeholder='Email...'
                        className='mt-3'
                        value={userEmail}
                        onChange={(event) => setUserEmail(event.target.value)}

                    />
                    <Form.Control
                        placeholder='Password...'
                        className='mt-3'
                        type='password'
                        value={userPassword}
                        onChange={(event) => setUserPassword(event.target.value)}
                    />
                    <Row className='d-flex flex-row justify-content-between mt-3 flex-nowrap m-0'>
                        {isLogin ?
                            <div style={{width: 200}}>
                                No account? <NavLink to={REGISTER_ROUTE} className='link'>Register!</NavLink>
                            </div>
                            :
                            <div style={{width: 200}}>
                                Have an account? <NavLink to={LOGIN_ROUTE} className='link'>Login!</NavLink>
                            </div>
                        }
                        <Button
                            variant='outline-dark'
                            style={{width: 100}}
                            onClick={() => handleClick(userEmail, userPassword)}
                        >
                            {isLogin ? 'Let me in': 'Register'}
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;