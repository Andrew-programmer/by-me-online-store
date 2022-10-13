import React, {useContext} from 'react';
import {Context} from "../../index";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTER_ROUTE, SHOP_ROUTE} from "../../utils/consts";
import {BsFillBasket2Fill} from 'react-icons/bs'

import styles from './NavBar.module.css';
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        navigate(LOGIN_ROUTE);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink className={styles.logoLink} to={SHOP_ROUTE}>ByME</NavLink>
                {user.isAuth ?
                    <Nav className={"ml-auto " + styles.nav}>
                        <Button variant={"outline-light"} onClick={() => navigate(BASKET_ROUTE)} className={styles.navButton}><BsFillBasket2Fill/></Button>
                        <Button variant={"outline-light"} onClick={() => navigate(ADMIN_ROUTE)} className={styles.navButton}>Admin Panel</Button>
                        <Button variant={"outline-light"} onClick={logOut} className={styles.navButton}>Exit</Button>
                    </Nav>
                    :
                    <Nav className={"ml-auto " + styles.nav}>
                        <Button variant={"outline-light"} className={styles.navButton} onClick={() => navigate(REGISTER_ROUTE)}>Sign up</Button>
                    </Nav>
                }

            </Container>
        </Navbar>
    );
});

export default NavBar;
